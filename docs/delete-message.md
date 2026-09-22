# Delete Message node

Use **Chat → Delete Message** with Evolution API 5.4.2 or newer.

Set **Message Ownership** to **Auto Detect**. Evolution first reads the archived original message key and automatically chooses between deleting a message sent by the connected account and admin-deleting another participant's group message.

Map these values from a `MESSAGES_UPSERT` webhook:

- **Contact**: `{{$json.data.key.remoteJid}}`
- **Message ID**: `{{$json.data.key.id}}`
- **Original Participant JID**: `{{$json.data.key.participant}}`
- **Participant Alternate JID**: `{{$json.data.key.participantAlt}}`

The participant fields are useful when Evolution does not have the original message in its local `Message` table. A group message with a participant JID selects group-admin deletion. A direct message without a participant is treated as a message sent by the connected account.

WhatsApp does not permit deleting another person's incoming direct message for everyone. It also requires the connected account to be an admin before deleting another participant's group message. The API returns a clear error for both cases.

The node reports success only after the API receives a WhatsApp server acknowledgement. A bare `PENDING` response throws an n8n node error; it is no longer returned as `success: true`.

On success, use these output fields:

```json
{
  "success": true,
  "serverAcknowledged": true,
  "status": "SERVER_ACK",
  "data": {
    "deletion": {
      "target": "GROUP_PARTICIPANT_MESSAGE",
      "ownershipSource": "ARCHIVED_MESSAGE_KEY"
    }
  }
}
```
