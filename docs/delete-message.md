# Delete Message node

Use **Chat → Delete Message** with Evolution API 5.4.3 or newer. The node automatically asks Evolution to apply the strongest deletion WhatsApp permits; there is no ownership or scope selector.

- Your own message is deleted for everyone.
- Another participant's group message is deleted for everyone when the connected account is an admin.
- Another person's private message is deleted for the connected account only.
- Another participant's group message is deleted for the connected account only when the account is not an admin.
- An unconfirmed delete-for-everyone attempt falls back to delete-for-me.

## Map an n8n Webhook payload

For the normal n8n Webhook output, where Evolution's payload is inside `body`, map:

- **Chat JID (Contact or Group)**: `{{ $json.body.data.key.remoteJid }}`
- **Message ID**: `{{ $json.body.data.key.id }}`
- **Original Participant JID**: `{{ $json.body.data.key.participant }}`
- **Participant Alternate JID**: `{{ $json.body.data.key.participantAlt }}`
- **Message Timestamp**: `{{ $json.body.data.messageTimestamp }}`
- **Delete Media for This Account**: `true`

If a previous node has already unwrapped the webhook body, use `$json.data...` instead of `$json.body.data...`.

For a group message, **Chat JID** must contain the group JID ending in `@g.us`. Do not place `participant`, `participantAlt`, `sender`, or an Evolution database row ID in that field.

Participant fields help reconstruct the original group key when Evolution message storage does not have it. Message Timestamp is required for delete-for-me only when Evolution cannot find the stored original message.

## Output contract

The node returns `success: true` for either of these verified outcomes:

- `deletionScope: "EVERYONE"` with `serverAcknowledged: true`.
- `deletionScope: "ME"` with `appStatePatchAccepted: true`.

Example delete-for-me output:

```json
{
  "success": true,
  "deletionScope": "ME",
  "serverAcknowledged": false,
  "appStatePatchAccepted": true,
  "status": "APP_STATE_PATCH_ACCEPTED",
  "data": {
    "deletion": {
      "fallbackReason": "INCOMING_DIRECT_MESSAGE",
      "everyoneAttempted": false,
      "everyoneConfirmed": false
    }
  }
}
```

The distinct scope fields matter: deleting for the connected account does not remove the message from the other person's WhatsApp.
