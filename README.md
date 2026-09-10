# n8n Evolution API Node

This is an unofficial WhatsApp API node for n8n, with direct support for the Baileys 7 API exposed by
[`Neup123/evolution-api`](https://github.com/Neup123/evolution-api).

Version 3 adds a scoped **WhatsApp Archive** resource for Evolution API 4, including archive searches, policy management, existing-database backfill, integrity checks, and preview-confirm purges. See [the archive node reference](docs/archive.md).

## Baileys operations

Choose a focused Baileys resource: **Account & Privacy**, **Business & Catalog**, **Call & Message**, **Community**,
**Group**, **Newsletter**, or **Advanced Protocol**. Then select the WhatsApp operation and the connected Evolution API
instance. Every operation has a practical explanation. The node displays a named field for every method argument,
string lists can be entered as repeated values, and enum arguments are dropdowns; for example,
`communityParticipantsUpdate` shows `jid`, `participants`, and an `action` dropdown.

```json
{
  "jid": "120363000000000000@g.us",
  "participants": ["5511999999999@s.whatsapp.net"],
  "action": "add"
}
```

For methods that accept `Buffer` or `Uint8Array`, use a Base64 envelope:

```json
[{ "$base64": "SGVsbG8=" }]
```

The node calls `POST /baileys/<group>/<method>/:instanceName`. See the Evolution API Swagger UI at `/docs` or
query `GET /baileys/methods/:instanceName` for the live method registry. Version 2 requires Evolution API v3; the old
ordered-argument routes were removed from that API as a breaking change.

Eligible reads are local-first: Evolution returns a fresh, instance-scoped database snapshot without contacting
WhatsApp. Enable **Force Live WhatsApp Read** when a workflow explicitly needs an immediate refresh. Missing or expired
snapshots are refreshed automatically, and live failures are returned instead of silently serving stale data.

See the [local-first workflow guide](docs/local-first-reads.md) for supported operations, upgrade requirements, and safe verification.

## Building webhook workflows

This fork provides a dedicated AsyncAPI contract—the webhook/event equivalent of Swagger—with all 49 Evolution webhook
events, complete HTTP envelopes, event-specific `data` schemas, allowed values, examples, and useful n8n expressions.
Open `/webhooks/docs` on your Evolution API server, or read the
[webhook payload guide](https://github.com/Neup123/evolution-api/blob/main/docs/webhooks.md).

For a single n8n Webhook node, use its production `/webhook/` URL and leave **Webhook by event** disabled. Route events
with a Switch node using `{{$json.event}}`. When Webhook by event is enabled, Evolution appends a suffix such as
`/messages-upsert`, so n8n needs an exact route for every enabled suffix.

## Install in n8n

The n8n **Install community nodes** screen only accepts package names published to the npm registry. This fork is not
published to npm yet, so install its prebuilt GitHub Release package as a custom extension instead. This avoids the
community-package reconciler removing a package that was not installed from npm. It adds only the node to your
existing n8n installation; it does not install another n8n instance.

For an existing Docker container:

```bash
docker exec -u node -it <your-n8n-container> sh -lc \
  'mkdir -p ~/.n8n/custom && cd ~/.n8n/custom && npm install \
  https://github.com/Neup123/n8n-nodes-evolution-api/releases/download/v3.0.0/n8n-nodes-evolution-api-en-3.0.0.tgz \
  --ignore-scripts'
docker restart <your-n8n-container>
```

For an existing non-Docker, self-hosted n8n:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm install \
  https://github.com/Neup123/n8n-nodes-evolution-api/releases/download/v3.0.0/n8n-nodes-evolution-api-en-3.0.0.tgz \
  --ignore-scripts
```

Restart n8n after installation. As an optional alternative, the prebuilt image below contains n8n and this node:

```yaml
services:
  n8n:
    image: ghcr.io/neup123/n8n-evolution-api:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

## Credit

This project is based on the [n8n-nodes-evolution-api](https://github.com/oriondesign2015/n8n-nodes-evolution-api) by [OrionDesign](https://github.com/oriondesign2015).

