# RUNSTR Brainstorm Document

This document captures ideas and future directions for integrating RUNSTR.Club (website) with the RUNSTR mobile app, charity race support, and virtual race participation.

---

## 1. RUNSTR App ↔ Website Integration

### The Connection Point: kind 1301 Events

The RUNSTR mobile app and website share the same Nostr data layer. The key connection point is **kind 1301 workout events**, which the app publishes when users complete and save runs.

- **Same identity across platforms** - User logs in with same Nostr keys on app and website
- **No duplicate accounts** - One Nostr identity, portable across all clients
- **Decentralized data** - Workouts stored on Nostr relays, not RUNSTR servers
- **Real workout data** - Includes splits, pace, distance, heart rate, GPS

### Virtual Race Participation Flow

1. User registers for race on **RUNSTR.Club** (website)
2. User downloads **RUNSTR app** (if not already installed)
3. User completes run with phone, Apple Watch, or Garmin watch
4. Workout syncs to RUNSTR app via HealthKit or Garmin Connect
5. User publishes **kind 1301 event** to Nostr (tagging the race)
6. Website queries kind 1301 events for race participants
7. Leaderboard displays results (post-race for MVP, live in future)

### Replacing Traditional Timing (Bibs/Fobs)

Traditional races use bibs with RFID chips or timing fobs to track participants. RUNSTR can replace this with cryptographic workout proofs:

- **kind 1301 includes:** split times, total distance, pace, elevation
- **GPS data** can verify route completion (did they run the course?)
- **Cryptographic signature** proves who ran (signed by user's Nostr key)
- **Device verification** shows what tracked the run (Apple Watch, Garmin, phone GPS)
- **Works for both** in-person and virtual participants

**The app essentially becomes the timing chip** - no physical hardware needed for virtual events.

---

## 2. Charity Race Integration

### The Opportunity

Most running events are organized to raise money for charity. RUNSTR can make this seamless by:
- Pre-verified charity Lightning addresses (no scams)
- Transparent split between organizer and charity
- Instant settlement (charity gets funds immediately)
- Zero platform fees (more money to charity)

### Verified Charities (10 Total)

| # | Charity | Lightning Address | Focus |
|---|---------|-------------------|-------|
| 1 | OpenSats | `opensats@vlt.ge` | Open-source Bitcoin/Nostr |
| 2 | Human Rights Foundation | `hrf@btcpay.hrf.org` | Global human rights |
| 3 | Bitcoin Beach | `growbitcoinbeach@geyser.fund` | El Salvador |
| 4 | Bitcoin Bay | `bitcoinbayfoundation@geyser.fund` | Bay Area, USA |
| 5 | Bitcoin Ekasi | `bitcoinekasi@geyser.fund` | South Africa |
| 6 | Bitcoin Isla | `btcisla@geyser.fund` | Philippines |
| 7 | Bitcoin Valley | `bitcoinvalleycirculareconomy@geyser.fund` | Guatemala |
| 8 | Bitcoin District | `bitcoindc@geyser.fund` | Washington DC |
| 9 | Bitcoin Yucatan | `bitcoinyucatancommunity@geyser.fund` | Mexico |
| 10 | Bitcoin Veterans | `operationbitcoin@geyser.fund` | US Veterans |

### Split Payment Model

Rather than 100% to charity (which has verification challenges), we propose a **split model**:

- Organizer sets percentage (e.g., **70% charity, 30% organizer**)
- Entry fee displayed as total: "1000 sats - 70% to OpenSats"
- At checkout, attendee pays both portions
- **Verification:** Organizer sees their 30% arrive → knows charity got their 70%

**Why this works:**
1. **Payment verification** - Organizer confirms their portion arrived
2. **Incentive alignment** - Organizers earn money while supporting charity
3. **Transparency** - Percentages shown upfront to attendees
4. **Trust** - Charity addresses are verified, not organizer-controlled
5. **Auditability** - Both payments have Lightning preimages as proof

### Payment UX Options (To Explore)

#### Option 1: Two QR Codes (Simplest)
Display both Lightning addresses simultaneously. User pays each separately.

```
┌─────────────────────────────────────┐
│  Pay 700 sats to OpenSats           │
│  [QR CODE]                          │
│  opensats@vlt.ge                    │
├─────────────────────────────────────┤
│  Pay 300 sats to Organizer          │
│  [QR CODE]                          │
│  organizer@getalby.com              │
└─────────────────────────────────────┘
```

**Pros:** Simple, non-custodial, clear where money goes
**Cons:** UX friction (two payments required)

#### Option 2: Sequential Flow
Guided two-step payment process.

```
Step 1 of 2: Pay charity portion
[Pay 700 sats to OpenSats] [QR]
↓
Step 2 of 2: Pay organizer portion
[Pay 300 sats to Organizer] [QR]
```

**Pros:** Guided, clear progression
**Cons:** Still two payments

#### Option 3: Single Address with Backend Split (NWC)
User pays one address. Backend uses NWC to split and forward.

```
Pay 1000 sats total
[QR CODE]
→ 700 sats auto-forwarded to charity
→ 300 sats auto-forwarded to organizer
```

**Pros:** Best UX (one payment)
**Cons:** Requires custody/trust, backend complexity

#### Option 4: Lightning Prism
Use Lightning Prism technology for automatic splits at protocol level.

**Pros:** One payment, non-custodial, automatic distribution
**Cons:** Requires Prism infrastructure, less common

### Recommendation

**Start with Option 1 (Two QR codes)** for MVP simplicity. It's fully non-custodial and clearly shows where money goes. Explore Prism for future versions.

### Event Types

| Type | Payment Split | Use Case |
|------|---------------|----------|
| **Standard Race** | 100% to organizer | Traditional paid race |
| **Charity Race** | X% charity, Y% organizer | Fundraiser with incentive |
| **Pure Charity** | 100% to charity | Volunteer-organized events |

---

## 3. Virtual Race Features

### How Virtual Races Work

Unlike traditional races with a fixed start time, virtual races allow participants to complete the distance **anytime within a window**.

**Example: Virtual Turkey Trot 5K**
- Race window: November 27-29, 2025
- Participants run anytime during those 3 days
- Submit workout via RUNSTR app
- Results aggregated after window closes

### Kind 1301 Data Available

The RUNSTR app publishes rich workout data that can power virtual race features:

- **Total distance** - Did they complete the required distance?
- **Total time / pace** - For leaderboard rankings
- **Split times** - Per km/mile performance breakdown
- **Heart rate data** - If available from device
- **GPS route** - Optional, for route verification
- **Device used** - Apple Watch, Garmin, phone GPS
- **Elevation gain** - For trail/mountain events

### Hybrid In-Person + Virtual

Same race can support both participation modes:

| Mode | How It Works |
|------|--------------|
| **In-Person** | Show up race day, traditional timing, on-site experience |
| **Virtual** | Run anytime in window, submit via app, participate from anywhere |

**Leaderboard options:**
- Combined leaderboard (all participants together)
- Separate categories (in-person vs virtual)
- Both displayed

### Anti-Cheat Considerations (Future)

For competitive virtual races, consider:
- **Pace consistency analysis** - Suspicious if pace varies wildly
- **GPS route verification** - Did they run the actual course?
- **Elevation matching** - Does elevation data match the route?
- **Device verification** - Was it actually run, not driven?
- **Social proof** - Other Nostr users can vouch/verify

---

## 4. Future Roadmap

### Phase 1: Current MVP
- Race registration with Lightning payments
- Basic event management for organizers
- Manual leaderboards (organizer enters results)
- Simple charity race support (two QR codes)

### Phase 2: App Integration
- Link registrations to Nostr pubkey
- Query kind 1301 events for race participants
- Auto-populate results from published workouts
- Virtual race participation support
- Race tagging in kind 1301 events

### Phase 3: Enhanced Features
- Live leaderboards during events (real-time kind 1301 queries)
- GPS route verification
- Anti-cheat analysis (pace, elevation, route)
- Finisher certificates (new Nostr event kind?)
- Pace group filtering

### Phase 4: Advanced
- NWC integration for automatic split payments
- Lightning Prism support
- Zapvertising for race promotion
- Team-based charity competitions
- Season-long charity fundraising totals
- Run club leaderboards
- Integration with timing systems (for hybrid events)

---

## 5. Open Questions

### Technical
- [ ] Should kind 1301 include a race ID tag for easy querying?
- [ ] How to handle timezone differences for virtual race windows?
- [ ] What's the best way to verify GPS routes without heavy computation?

### Product
- [ ] Should virtual participants pay the same as in-person?
- [ ] How to handle refunds for cancelled races (Lightning is push-only)?
- [ ] Should we show charity fundraising totals publicly?

### Charity
- [ ] How to onboard new charities to the verified list?
- [ ] Should organizers be able to add their own charities (with verification)?
- [ ] Tax receipt considerations for charity donations?

---

## 6. Key Differentiators

### vs. Traditional Platforms (Eventbrite, RunSignUp)

| Feature | Traditional | RUNSTR |
|---------|-------------|--------|
| Platform fees | 3-7% | **0%** |
| Payment settlement | Days/weeks | **Instant** |
| Data ownership | Platform owns | **User owns (Nostr)** |
| Payment methods | Credit card | **Lightning (global)** |
| Virtual race support | Basic | **Native with app** |
| Timing integration | External hardware | **Built into app** |

### The RUNSTR Advantage

1. **Zero fees** - Organizers keep 100% (or split with charity)
2. **Instant settlement** - Lightning payments, no waiting
3. **Global access** - Anyone with Lightning can participate
4. **Data ownership** - All data on Nostr, portable
5. **Integrated timing** - App replaces bibs/fobs for virtual events
6. **Charity-native** - Built-in support for fundraising races

---

*This is a living document. Update as ideas evolve.*
