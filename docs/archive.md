# Evolution API v4 WhatsApp archive

Node version 3 adds the **WhatsApp Archive** resource for Evolution API 4. Configure both credential fields: the normal Evolution `ApiKey` and the separate `Archive API Key`. The latter must have the scope required by the selected operation.

| Node operation | HTTP method and path | Required archive scope | Output |
| --- | --- | --- | --- |
| Archive Status | `GET /archive/status` | `archive:read` | `{ enabled, provider, accounts[] }` |
| Search Events | `GET /archive/events/{instanceName}` | `archive:read`; `archive:export` with payload | `ArchiveEvent[]` |
| Search Messages | `GET /archive/messages/{instanceName}` | `archive:read` | message `ArchiveEvent[]` |
| Search Contacts | `GET /archive/contacts/{instanceName}` | `archive:read` | contact `ArchiveEvent[]` |
| Search Chats | `GET /archive/chats/{instanceName}` | `archive:read` | chat `ArchiveEvent[]` |
| Search Groups | `GET /archive/groups/{instanceName}` | `archive:read` | group `ArchiveEvent[]` |
| Search Media | `GET /archive/media/{instanceName}` | `archive:media` | `ArchiveMedia[]` |
| Message Revision History | `GET /archive/messages/{instanceName}/{messageId}/revisions` | `archive:read` | message head and chronological revisions |
| Search Receipts | `GET /archive/receipts/{instanceName}` | `archive:read` | `ArchiveReceipt[]` |
| Search Reactions | `GET /archive/reactions/{instanceName}` | `archive:read` | `ArchiveReaction[]` |
| Search Group Memberships | `GET /archive/memberships/{instanceName}` | `archive:read` | membership history |
| Search Calls | `GET /archive/calls/{instanceName}` | `archive:read` | call history |
| Search Sync Gaps | `GET /archive/sync-gaps/{instanceName}` | `archive:read` | known incomplete-sync observations |
| List Policies | `GET /archive/policies` | `archive:policy` | `ArchivePolicy[]` |
| Create or Version Policy | `PUT /archive/policies` | `archive:policy` | stored `ArchivePolicy` |
| Backfill Existing Database | `POST /archive/backfill/{instanceName}` | `archive:admin` | import counts and truncation flag |
| Preview Purge | `POST /archive/purges/preview/{instanceName}` | `archive:admin` | counts, preview ID, one-time token, expiry |
| Confirm Purge | `POST /archive/purges/confirm` | `archive:admin` | completed job, counts, signed tombstone |
| List Purge Tombstones | `GET /archive/purges/tombstones/{instanceName}` | `archive:verify` | `ArchivePurgeTombstone[]` |
| Verify Integrity | `POST /archive/verify/{instanceName}` | `archive:verify` | hash-chain verification result |

Search Query is a JSON object. Supported fields are `entityJid`, `groupJid`, `eventType`, `entityType`, `from`, `before`, `mediaType`, `state`, and `limit`. Search Events can add the decrypted `payload`; this is intentionally a separate toggle and scope.

Policy resolution is general → entity type → account → specific JID, with the most-specific matching value winning. `media.mode` accepts `all`, `images`, `metadata`, or `none`; `media.types` can name explicit types. Policy changes are prospective.

Purge is deliberately two nodes or two workflow steps. **Preview Purge** accepts at least one of `before`, `entityJid`, `groupJid`, or `eventTypes`, plus optional `mediaOnly`. Pass its exact `previewId` and `confirmationToken` to **Confirm Purge** before expiry. Never put Confirm Purge in an unattended polling workflow.

The canonical field-by-field request and response schemas live in Evolution API's `docs/openapi.yaml` and human reference `docs/archive.md`. The canonical webhook bodies live in `docs/asyncapi.yaml`; archive capture happens in Evolution API before external webhook/queue delivery, so n8n is a reader and monitor rather than the archive owner.
