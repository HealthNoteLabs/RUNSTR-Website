import { Relay } from "nostr-tools/relay";
import { finalizeEvent, getPublicKey } from "nostr-tools/pure";
import { encrypt, decrypt } from "nostr-tools/nip04";
import { hexToBytes } from "nostr-tools/utils";

// NWC connection string — receive-only wallet (can only create invoices)
const NWC_URI =
  "nostr+walletconnect://84d21db9573f73353050dc7db9b0577bb56bf3d2120b35a1c794acda47bb4673?relay=wss%3A%2F%2Frelay.getalby.com%2Fv1&secret=f1fc9524102e8b00b8266fa5568c6b92a87d0ff0d8da0f54a395d485353f0378&lud16=hustle%40getalby.com";

const REQUEST_TIMEOUT = 30_000;

interface ParsedNWC {
  walletPubkey: string;
  relayUrl: string;
  secret: string;
}

function parseNWCUri(uri: string): ParsedNWC {
  const url = new URL(uri.replace("nostr+walletconnect://", "https://placeholder/"));
  const walletPubkey = uri.split("://")[1].split("?")[0];
  const relayUrl = url.searchParams.get("relay") || "";
  const secret = url.searchParams.get("secret") || "";
  return { walletPubkey, relayUrl, secret };
}

const parsed = parseNWCUri(NWC_URI);

let relayInstance: Relay | null = null;

async function getRelay(): Promise<Relay> {
  if (relayInstance && relayInstance.connected) {
    return relayInstance;
  }
  relayInstance = await Relay.connect(parsed.relayUrl);
  return relayInstance;
}

async function sendNWCRequest(
  method: string,
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const relay = await getRelay();
  const secretKey = hexToBytes(parsed.secret);
  const pubkey = getPublicKey(secretKey);

  const content = JSON.stringify({ method, params });
  const encrypted = await encrypt(parsed.secret, parsed.walletPubkey, content);

  const requestEvent = finalizeEvent(
    {
      kind: 23194,
      created_at: Math.floor(Date.now() / 1000),
      tags: [["p", parsed.walletPubkey]],
      content: encrypted,
    },
    secretKey,
  );

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      sub.close();
      reject(new Error("NWC request timed out"));
    }, REQUEST_TIMEOUT);

    const sub = relay.subscribe(
      [
        {
          kinds: [23195],
          authors: [parsed.walletPubkey],
          "#p": [pubkey],
          since: Math.floor(Date.now() / 1000) - 10,
        },
      ],
      {
        onevent(event) {
          (async () => {
            try {
              const decrypted = await decrypt(
                parsed.secret,
                parsed.walletPubkey,
                event.content,
              );
              const response = JSON.parse(decrypted);

              if (response.result_type === method) {
                clearTimeout(timeout);
                sub.close();
                if (response.error) {
                  reject(
                    new Error(response.error.message || "NWC request failed"),
                  );
                } else {
                  resolve(response.result);
                }
              }
            } catch {
              // Ignore events we can't decrypt (not for us)
            }
          })();
        },
        oneose() {
          // End of stored events — keep listening for new ones
        },
      },
    );

    relay.publish(requestEvent);
  });
}

export interface Invoice {
  bolt11: string;
  paymentHash: string;
  expiresAt: number;
}

export async function createInvoice(
  amountSats: number,
  description: string,
): Promise<Invoice> {
  const result = await sendNWCRequest("make_invoice", {
    amount: amountSats * 1000, // NWC uses millisats
    description,
  });

  return {
    bolt11: result.invoice as string,
    paymentHash: result.payment_hash as string,
    expiresAt: result.expires_at as number,
  };
}

export interface PaymentStatus {
  isPaid: boolean;
  settledAt: number | null;
}

export async function checkInvoice(
  paymentHash: string,
): Promise<PaymentStatus> {
  const result = await sendNWCRequest("lookup_invoice", {
    payment_hash: paymentHash,
  });

  const settled = (result.settled_at as number | undefined) ?? null;

  return {
    isPaid: settled !== null && settled > 0,
    settledAt: settled,
  };
}

export function disconnectRelay(): void {
  if (relayInstance) {
    relayInstance.close();
    relayInstance = null;
  }
}
