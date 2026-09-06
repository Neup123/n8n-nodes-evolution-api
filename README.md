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

The n8n **Install community nodes** screen only accepts package names published to the npm registry. This fork is not
published to npm yet, so install its prebuilt GitHub Release package as a custom extension instead. This avoids the
community-package reconciler removing a package that was not installed from npm. It adds only the node to your
existing n8n installation; it does not install another n8n instance.

For an existing Docker container:

```bash
docker exec -u node -it <your-n8n-container> sh -lc \
  'mkdir -p ~/.n8n/custom && cd ~/.n8n/custom && npm install \
  https://github.com/Neup123/n8n-nodes-evolution-api/releases/download/v1.2.2/n8n-nodes-evolution-api-en-1.2.2.tgz \
  --ignore-scripts'
docker restart <your-n8n-container>
```

For an existing non-Docker, self-hosted n8n:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm install \
  https://github.com/Neup123/n8n-nodes-evolution-api/releases/download/v1.2.2/n8n-nodes-evolution-api-en-1.2.2.tgz \
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

