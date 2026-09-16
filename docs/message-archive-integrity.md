# Operational message integrity in n8n

Use **Chat → Search Messages** to read the Evolution database without making a WhatsApp request. Enter a bare phone number, a full `@s.whatsapp.net` PN JID, or an `@lid` JID. Evolution API 5.1 matches both the primary and alternate address of the canonical message.

The node output is:

```json
{
  "success": true,
  "data": {
    "messages": {
      "total": 1,
      "pages": 1,
      "currentPage": 1,
      "records": []
    }
  }
}
```

Each `records[]` item contains:

| Field | Meaning |
|---|---|
| `id` | Evolution database row ID. Do not use it as the WhatsApp identity. |
| `waMessageId` | Stable WhatsApp message ID. It may be null only for ambiguous legacy duplicates. |
| `key` | Original compatible Baileys key, including `id`, `remoteJid`, `remoteJidAlt`, `fromMe`, and optional `participant`. |
| `remoteJid` | First observed chat address. |
| `remoteJidAlt` | Alternate PN or LID address for the same message. |
| `pushName` | Sender display name when WhatsApp supplied one. |
| `messageType` | Normalized message-content type. |
| `message` | Baileys message payload, such as `conversation`, `imageMessage`, or `documentMessage`. |
| `messageTimestamp` | WhatsApp Unix timestamp in seconds. |
| `instanceId` | Evolution instance database ID. |
| `source` | Source device classification derived from the WhatsApp message ID. |
| `contextInfo` | Reply, mention, forwarding, and related Baileys context when present. |
| `status` | Highest non-regressing Baileys acknowledgement observed. |
| `archiveOrigin` | `LOCAL_OUTBOUND`, `WHATSAPP_EVENT`, `HISTORY_SYNC`, or `LEGACY`. |
| `archiveState` | Monotonic evidence state described below. |
| `serverAcceptedAt` | First server-acceptance observation, or null. |
| `deliveredAt` | First recipient-delivery observation, or null. |
| `readAt` | First read/played observation, or null. |
| `MessageUpdate[]` | Distinct acknowledgement observations, each currently containing `status`. |

## Safe decision rule

Treat an outgoing message as delivered only when one of these is true:

- `archiveState` is `DELIVERED`, `READ`, or `PLAYED`;
- a `MessageUpdate[].status` is `DELIVERY_ACK`, `READ`, or `PLAYED`.

Do not treat `PENDING`, `PROVISIONAL`, `SERVER_ACK`, or `SERVER_ACCEPTED` as delivery. `PROVISIONAL` means only that Evolution stored the immediate local send result. `SERVER_ACCEPTED` means WhatsApp accepted it server-side, not that the recipient device received it.

```js
const record = $json.data.messages.records[0];
const deliveredStates = new Set(['DELIVERED', 'READ', 'PLAYED']);
const deliveredStatuses = new Set(['DELIVERY_ACK', 'READ', 'PLAYED']);
const delivered = deliveredStates.has(record.archiveState) ||
  (record.MessageUpdate ?? []).some((update) => deliveredStatuses.has(update.status));
```

`FAILED` is terminal unless a later delivery/read acknowledgement proves recovery. `AUTHORITATIVE` means WhatsApp supplied the message or history event; it is authoritative existence evidence for an incoming message but is not, by itself, recipient-delivery evidence for an outgoing message.

The encrypted **WhatsApp Archive** resource is a separate audit store. Use Chat → Search Messages for operational decisions and the archive resource for immutable event history, revisions, integrity verification, export, or purge.

## PN and LID identity safety

A PN JID such as `12142238715@s.whatsapp.net` and a LID such as `230687726690306@lid` can address the same WhatsApp person. A group membership does not create a new person identity, and the digits before `@lid` are not a telephone number.

Evolution API 5.1 therefore returns `GROUP_PARTICIPANTS_UPDATE.data.participantsData[]` with explicit mapping state:

| Field | Meaning |
|---|---|
| `jid` | Original participant JID from the WhatsApp event. |
| `phoneNumber` | Full verified PN JID, or `null` when no PN mapping is available. |
| `phoneNumberDigits` | Digits derived from a verified PN only, or `null`. |
| `lid` | Full LID JID when known. |
| `canonicalJid` | Best available stable JID: PN, then LID, then the original JID. |
| `identifierType` | Namespace of the original event JID: `phone-number`, `lid`, or `unknown`. |
| `identityResolved` | `true` only when a verified PN mapping is present. |
| `participantDigits` | Local part of `jid`; compatibility data, not proof of a telephone number. |

When a workflow must contact a telephone identity, require `identityResolved === true` and use `phoneNumber`. Never strip `@lid` and treat the remaining digits as a phone number.
