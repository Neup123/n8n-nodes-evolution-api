# Local-first reads in the Evolution API node

Version 2 of this community node targets Evolution API v3. Eligible read operations use Evolution's instance-scoped database snapshots by default and keep the same n8n output structure.

## Workflow behavior

Leave **Force Live WhatsApp Read** disabled for routine reads. Evolution returns a fresh snapshot when available and contacts WhatsApp only on a miss or expiry.

Enable it when a workflow decision must use current WhatsApp state. The node sends `live: true`; Evolution bypasses the snapshot, stores a successful response, and exposes a remote failure instead of silently returning stale data.

The option appears only on operations supported by the API's local-first policy. Writes and socket-bound methods remain live and do not display it.

## Supported node operations

The traditional Chat and Group resources support local-first reads for number checks, profile/profile-picture/business-profile/privacy reads, group information, all participating groups, and group participants.

The Baileys resource supports the API's localizable community, business, newsletter, group, account, privacy, status, and profile methods. The exact registry is available from:

```http
GET /baileys/methods/{instanceName}
```

Methods are marked `local-first` or `live-only` in that response. For the full matrix and server configuration, see the [Evolution API reference](https://github.com/Neup123/evolution-api/blob/main/docs/local-first-reads.md).

## Upgrade requirements

This is a breaking v2 node release:

- Deploy Evolution API v3 and its database migration first.
- Upgrade the node package or the `ghcr.io/neup123/n8n-evolution-api:v2.0.0` image.
- Reopen and test workflows that use Baileys operations.
- Custom HTTP Request nodes must migrate from `/baileys/{method}/{instanceName}` with positional `args` to `/baileys/{group}/{method}/{instanceName}` with named fields.

Existing maintained node operations already use grouped routes. Existing local-first outputs need no expression migration because the API response body is unchanged.

## Verification

Run a read once with **Force Live WhatsApp Read** enabled, then run it twice with the option disabled. The result should remain structurally identical. When debugging through an HTTP Request node, inspect `X-Evolution-Data-Source` and `X-Evolution-Data-Age` response headers.

Do not test production workflows with real sends, removals, approvals, or other side effects. Use read-only operations and a test instance.
