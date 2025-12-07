# RUNSTR Events - Technical Implementation

## Overview

RUNSTR Events uses the NIP-52 calendar event standard for interoperability with other Nostr clients like Satlantis. Virtual races are created as Kind 31923 time-based calendar events, with RSVPs handled via Kind 31925, and leaderboards built from Kind 1301 workout data published by the RUNSTR mobile app.

## Nostr Event Kinds

| Kind | Purpose | Standard |
|------|---------|----------|
| 31923 | Virtual race/event | NIP-52 Calendar Event |
| 31925 | Registration (RSVP) | NIP-52 Calendar RSVP |
| 1301 | Workout data | RUNSTR Custom |

## Kind 31923 - Virtual Race Event

```javascript
{
  "kind": 31923,
  "content": "Join our monthly 5K challenge! Run anytime during the event window.",
  "tags": [
    // NIP-52 Standard Tags (Required)
    ["d", "runstr-5k-dec-2024"],           // Unique identifier
    ["title", "RUNSTR December 5K"],        // Event name
    ["start", "1733756400"],                // Unix timestamp (seconds)
    ["end", "1733842800"],                  // 24-hour window
    ["start_tzid", "America/New_York"],     // Timezone
    ["location", "Virtual - Run anywhere"],

    // NIP-52 Optional Tags
    ["summary", "Monthly virtual 5K with sat rewards"],
    ["image", "https://runstr.club/images/event.png"],
    ["t", "running"],
    ["t", "5k"],
    ["t", "runstr"],

    // RUNSTR Custom Tags
    ["distance", "5k"],                     // 5k, 10k, half, marathon
    ["distance_meters", "5000"],            // Precise distance for matching
    ["entry_fee", "1000"],                  // Sats (0 for free)
    ["lightning", "organizer@getalby.com"], // Payment address
    ["max_participants", "100"],

    // Participants (p-tags with roles)
    ["p", "<organizer-pubkey>", "", "organizer"],
    ["p", "<participant-pubkey>", "", "participant"],
    ["p", "<participant-pubkey>", "", "participant"]
  ]
}
```

### Key Design Decisions

1. **p-tags as source of truth**: Participants are stored directly in the event as p-tags. This makes leaderboard queries simple - just read the p-tags and query Kind 1301 from those pubkeys.

2. **24-hour event window**: Virtual races have a start and end time (typically 24 hours) during which participants can complete their run.

3. **Distance verification via splits**: The `distance_meters` tag enables precise matching with workout data.

## Kind 31925 - RSVP (Registration)

```javascript
{
  "kind": 31925,
  "content": "",
  "tags": [
    // NIP-52 Standard RSVP Tags
    ["a", "31923:<organizer-pubkey>:<d-tag>"],  // Reference to event
    ["d", "<unique-rsvp-id>"],                   // Unique RSVP identifier
    ["status", "accepted"],                      // accepted, tentative, declined
    ["p", "<organizer-pubkey>"],                 // Event organizer

    // RUNSTR Custom Tags
    ["contact", "user@primal.net"],              // NIP-05 or email (used for payment verification)
    ["amount", "1000"]                           // Sats paid
  ]
}
```

### Contact as Payment Identifier

The `contact` tag serves dual purposes:
1. **Communication**: Organizers can DM (via NIP-05) or email participants
2. **Payment verification**: Users include their contact in Lightning payment memos, allowing organizers to search wallet history

This eliminates the need for random reference codes - the contact IS the reference.

### RSVP Status Values

| Status | Meaning |
|--------|---------|
| `accepted` | User wants to participate |
| `tentative` | User is considering |
| `declined` | User cannot participate |

## Kind 1301 - Workout Data

Published by the RUNSTR mobile app. Critical fields for leaderboard calculation:

```javascript
{
  "kind": 1301,
  "content": "Morning 5K run!",
  "tags": [
    ["d", "workout_2025-01-15_083000"],
    ["exercise", "running"],
    ["distance", "5.2", "km"],
    ["duration", "00:28:15"],

    // Split data (CRITICAL for verification)
    ["split", "1", "00:05:38"],    // Time at 1km
    ["split", "2", "00:11:22"],    // Time at 2km
    ["split", "3", "00:17:05"],    // Time at 3km
    ["split", "4", "00:22:41"],    // Time at 4km
    ["split", "5", "00:28:15"],    // Time at 5km (race finish time)

    ["source", "RUNSTR"],
    ["client", "RUNSTR", "0.2.6"]
  ]
}
```

### Split Verification

Split count is used to verify race completion:

| Distance | Required Splits |
|----------|-----------------|
| 5K | ≥ 5 splits |
| 10K | ≥ 10 splits |
| Half Marathon | ≥ 21 splits |
| Marathon | ≥ 42 splits |

This prevents gaming the system with short runs.

## Registration Flow

```
1. User visits race page
         ↓
2. User clicks "Register"
         ↓
3. System fetches user's NIP-05 from their profile (Kind 0)
         ↓
4. Contact field pre-filled with NIP-05 (user can override with email)
         ↓
5. For paid events:
   - Lightning address + QR shown
   - User instructed to include their contact in payment memo
   - Example: "Include 'runner@primal.net' in payment memo"
         ↓
6. User clicks "I've Paid" → Kind 31925 RSVP published
         ↓
7. Organizer sees pending RSVP with contact info
         ↓
8. Organizer searches wallet for payments with that contact in memo
         ↓
9. Organizer clicks "Approve" → p-tag added to Kind 31923
         ↓
10. User now appears in participant list
         ↓
11. User's Kind 1301 workouts count toward leaderboard
```

## Leaderboard Calculation

```javascript
async function buildLeaderboard(race) {
  // 1. Get participant pubkeys from p-tags
  const participants = race.tags
    .filter(t => t[0] === 'p' && t[3] === 'participant')
    .map(t => t[1]);

  // 2. Query Kind 1301 workouts in time window
  const filter = {
    kinds: [1301],
    authors: participants,
    since: race.startTimestamp,
    until: race.endTimestamp
  };

  const workouts = await pool.querySync(RELAYS, filter);

  // 3. Filter by split count
  const requiredSplits = { '5k': 5, '10k': 10, 'half': 21, 'marathon': 42 };
  const eligible = workouts.filter(w => {
    const splits = w.tags.filter(t => t[0] === 'split');
    return splits.length >= requiredSplits[race.distance];
  });

  // 4. Extract race time from target split
  const entries = eligible.map(w => {
    const targetSplit = w.tags.find(t =>
      t[0] === 'split' && t[1] === requiredSplits[race.distance].toString()
    );
    return {
      pubkey: w.pubkey,
      time: parseDuration(targetSplit[2])  // "00:28:15" → 1695 seconds
    };
  });

  // 5. Best time per user, sort ascending
  return dedupeAndSort(entries);
}
```

## Payment Flow

### Free Events
- User enters contact, clicks "Complete Registration"
- RSVP published immediately
- Organizer can approve right away

### Paid Events
1. User sees organizer's Lightning address + QR code
2. User sees their contact (e.g., `runner@primal.net`) prominently displayed
3. User instructed: "Include this in your payment memo"
4. User pays externally (any Lightning wallet) with contact in memo
5. User clicks "I've Paid" → RSVP published with contact
6. Organizer sees pending RSVP in dashboard
7. Organizer searches wallet for payments containing the contact
8. Organizer clicks "Approve" → p-tag added to event

### Verification UX

**User Side:**
```
┌────────────────────────────────────────┐
│     Include in Payment Memo            │
│     ┌────────────────────────────┐     │
│     │  runner@primal.net         │     │
│     └────────────────────────────┘     │
│     [Copy Memo]                        │
│                                        │
│     Send 1,000 sats to:                │
│     organizer@getalby.com              │
└────────────────────────────────────────┘
```

**Organizer Side:**
```
┌────────────────────────────────────────┐
│  runner@primal.net                     │
│  December 5K • 1,000 sats              │
│  Search wallet for: runner@primal.net  │
│  [copy] [Approve]                      │
└────────────────────────────────────────┘
```

Note: This is a trust-based system. No automated payment verification.

## Relay Configuration

```javascript
const RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://relay.primal.net'
];
```

## Interoperability

By using NIP-52 standard:
- Events appear in Satlantis and other calendar clients
- Standard RSVP flow works across clients
- p-tags follow Nostr conventions
- Hashtags (#runstr, #running) enable discovery

## Files

| File | Purpose |
|------|---------|
| `pages/create-race.html` | Create Kind 31923 events |
| `pages/races.html` | List and filter events |
| `pages/race.html` | Event details, RSVP, leaderboard |
| `pages/my-races.html` | Organizer dashboard, approve RSVPs |

## Query Patterns

### Find RUNSTR Events
```javascript
{ kinds: [31923], '#t': ['runstr'], limit: 100 }
```

### Find Event by ID
```javascript
{ kinds: [31923], '#d': [eventId] }
```

### Find RSVPs for Event
```javascript
{ kinds: [31925], '#a': [`31923:${organizerPubkey}:${eventId}`] }
```

### Find User's RSVPs
```javascript
{ kinds: [31925], authors: [userPubkey] }
```

### Find Workouts for Leaderboard
```javascript
{ kinds: [1301], authors: participantPubkeys, since: start, until: end }
```
