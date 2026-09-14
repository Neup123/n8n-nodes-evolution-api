# Outbound automation safety in n8n

Use **Evolution API → Instances → Set Behavior → Automation Safety & Pacing** to save a per-instance policy. Once enabled, the API applies it automatically to normal message operations and Baileys `sendMessage`; individual message nodes do not duplicate the settings.

| n8n field | API field | Purpose |
|---|---|---|
| Enabled | `enabled` | Master policy switch. |
| Typing Indicator | `typing.enabled` | Bounded presence interval based on visible text length. |
| Typing Minimum/Maximum | `typing.minMs`, `typing.maxMs` | Duration bounds from 0 to 20 seconds. |
| Characters Per Second | `typing.charactersPerSecond` | Length-to-duration conversion; message text is never changed. |
| Bounded Jitter | `typing.jitterPercent` | Up to 25% variation to spread traffic bursts. |
| Instance/Recipient Limits | `rateLimit.*` | Persistent rolling minute and 24-hour limits, including the instance-wide daily cap. |
| Maximum Concurrent Sends | `rateLimit.maxConcurrentSends` | Per-process in-flight ceiling. |
| Quiet Hours | `quietHours.*` | Rejects sends inside an IANA-time-zone window. |
| Suppressed Recipients | `suppression.recipients` | JIDs or numbers that may not receive automated sends. |
| Recipient Allowlist | `suppression.allowlistEnabled`, `suppression.allowedRecipients` | Optional opt-in mode that permits sends only to listed JIDs or numbers. |
| Exact Duplicate Protection | `duplicate.*` | Compares an exact SHA-256 fingerprint for the recipient. |
| Failure Pause | `failurePause.*` | Temporarily opens a circuit after consecutive failures. |
| Audit Retention | `audit.retentionDays` | Retention of persistent decision and delivery rows. |

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
      "messageType": "text",
      "status": "BLOCKED",
      "reason": "duplicate_message",
      "delayMs": null,
      "requestedAt": "2026-09-14T12:00:00.000Z",
      "sentAt": null
    }
  ]
}
```

Policy rejections arrive as HTTP 429. Retry only retryable results such as rate limits or quiet hours; do not automatically retry `recipient_suppressed`, `recipient_not_allowed`, or `duplicate_message`.

See the [complete Evolution API policy reference](https://github.com/Neup123/evolution-api/blob/main/docs/outbound-automation-safety.md) for defaults, bounds, processing order, and response details.
