# Outbound automation safety in n8n

Use **Evolution API → Instances → Set Behavior → Automation Safety & Pacing** to save a per-instance policy. Once enabled, the API applies it automatically to normal message operations and Baileys `sendMessage`; individual message nodes do not duplicate the settings.

| n8n field                 | API field                                                       | Purpose                                                                                                                     |
| ------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Enabled                   | `enabled`                                                       | Master policy switch.                                                                                                       |
| Typing Indicator          | `typing.enabled`                                                | Bounded presence interval based on visible text length.                                                                     |
| Typing Minimum/Maximum    | `typing.minMs`, `typing.maxMs`                                  | Duration bounds from 0 to 20 seconds.                                                                                       |
| Characters Per Second     | `typing.charactersPerSecond`                                    | Length-to-duration conversion; message text is never changed.                                                               |
| Bounded Jitter            | `typing.jitterPercent`                                          | Up to 25% variation to spread traffic bursts.                                                                               |
| Instance/Recipient Limits | `rateLimit.*`                                                   | Persistent rolling minute and 24-hour limits, including the instance-wide daily cap.                                        |
| New/Dormant Outreach      | `outreach.*`                                                    | Limits unique direct contacts with no recent inbound message; active inbound contacts, groups, and broadcasts are excluded. |
| Maximum Concurrent Sends  | `rateLimit.maxConcurrentSends`                                  | Per-process in-flight ceiling.                                                                                              |
| Quiet Hours               | `quietHours.*`                                                  | Rejects sends inside an IANA-time-zone window.                                                                              |
| Suppressed Recipients     | `suppression.recipients`                                        | JIDs or numbers that may not receive automated sends.                                                                       |
| Recipient Allowlist       | `suppression.allowlistEnabled`, `suppression.allowedRecipients` | Optional opt-in mode that permits sends only to listed JIDs or numbers.                                                     |
| Duplicate Protection      | `duplicate.enabled`                                             | Blocks duplicate or sufficiently similar text for the same recipient.                                                       |
| Duplicate Window          | `duplicate.windowSeconds`                                       | Checks every successful message to the recipient inside this rolling time window; it is not limited to the last N messages. |
| Similarity Threshold      | `duplicate.similarityThresholdPercent`                          | `100` blocks exact text only. Lower percentages also block approximate near-duplicates; `85` is a practical starting point. |
| Failure Pause             | `failurePause.*`                                                | Temporarily opens a circuit after consecutive failures.                                                                     |
| Audit Retention           | `audit.retentionDays`                                           | Retention of persistent decision and delivery rows.                                                                         |

Use **Instances → Get Outbound Safety Audit** to retrieve up to 500 newest rows. Optional filters are recipient and status (`PENDING`, `SENT`, `FAILED`, or `BLOCKED`).

```json
{
	"success": true,
	"data": [
		{
			"id": "cm...",
			"instanceId": "cm...",
			"recipient": "15551234567@s.whatsapp.net",
			"messageHash": "4a9e...",
			"messageFingerprint": "1f82a94050c8ee31",
			"messageType": "text",
			"status": "BLOCKED",
			"reason": "duplicate_message",
			"recipientCategory": "ENGAGED",
			"delayMs": null,
			"requestedAt": "2026-09-14T12:00:00.000Z",
			"sentAt": null
		}
	]
}
```

`outreach.enabled` defaults to true under an enabled master policy, `outreach.newOrDormantRecipientsPerDay` defaults to 50, and `outreach.dormantAfterDays` defaults to 180. Anyone who sends an inbound message inside that relationship window is `ENGAGED` and does not consume the unique-recipient quota. A target with no inbound history is `NEW`; one with older inbound history is `DORMANT`. Outbound-only activity does not establish engagement.

Similarity is calculated from a non-reversible 64-bit character-trigram fingerprint after normalizing Unicode, letter case, and whitespace. It is approximate rather than a literal edit-distance percentage. The original message text and links are never modified. Rows created before the supporting database migration remain eligible for exact matching; near-duplicate matching applies to sends recorded after upgrade.

For **Messages → Send Text**, transient cooldown decisions can be stored in Evolution API's durable internal queue instead of failing the n8n execution. The node output deliberately distinguishes request acceptance from delivery:

- `requestAccepted: true` means Evolution accepted the API request;
- `messageWasSent: true` and `deliveryStatus: "SENT"` confirm immediate delivery;
- `queued: true`, `messageWasSent: false`, `success: false`, `deliveryStatus: "PENDING"`, and `final: false` mean the message has not been sent yet.

Workflows that depend on actual delivery must branch on `messageWasSent` or `deliveryStatus`, never HTTP success alone. A queued result also contains its queue ID, position, reason, and estimated send time.

Evolution resolves the current template and re-runs every safety rule immediately before delivery. If intervening direct or override-template sends consume capacity, it reschedules the item only when the new wait remains within the configured queue horizon; otherwise the queue item becomes `FAILED`.

Use **Messages → Get Outbound Queue** to return:

- complete pending, processing, and failed counts;
- the next estimated send time;
- the estimated time at which the queue will be empty; and
- individual entries with recipient, reason, attempts, request time, schedule, and last error.

Use **Messages → Clear Outbound Queue** to remove all not-yet-sent entries immediately. A message already handed to WhatsApp cannot be recalled; the response reports whether an entry was processing when the clear request arrived.

The queue is used for concurrency, failure-circuit, instance/recipient minute and daily limits, outreach-recipient limits, and minimum intervals. Permanent policy decisions still fail: `recipient_suppressed`, `recipient_not_allowed`, `quiet_hours`, and `duplicate_message`. Other message types retain their existing HTTP 429 behavior.

Evolution API rejects enqueue when recent sent work plus queued work reaches any configured instance, recipient, or outreach capacity, or when the new schedule is beyond the configured queue horizon.

See the [complete Evolution API policy reference](https://github.com/Neup123/evolution-api/blob/main/docs/outbound-automation-safety.md) for defaults, bounds, processing order, and response details.
