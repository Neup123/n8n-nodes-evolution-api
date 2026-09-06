# n8n Evolution API Node

This is an unofficial WhatsApp API node for n8n, with direct support for the Baileys 7 API exposed by
[`Neup123/evolution-api`](https://github.com/Neup123/evolution-api).

## Baileys operations

Choose the **Baileys Method** resource, select a grouped `WASocket` method, and enter the connected Evolution API
instance. The node displays a typed field for every method argument. Enum arguments are dropdowns; for example,
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
query `GET /baileys/methods/:instanceName` for the live method registry. The old ordered-argument routes remain
available for compatibility.

## Install in n8n

For a self-hosted npm installation, stop n8n, install this GitHub fork in the n8n nodes directory, and restart n8n:

```bash
cd ~/.n8n/nodes
npm install github:Neup123/n8n-nodes-evolution-api
```

For Docker Compose, use the prebuilt image that contains n8n and this node:

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

