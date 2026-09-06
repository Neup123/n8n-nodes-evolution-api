# n8n Evolution API Node

This is an unofficial WhatsApp API node for n8n, with direct support for the Baileys 7 API exposed by
[`Neup123/evolution-api`](https://github.com/Neup123/evolution-api).

## Baileys operations

Choose the **Baileys** resource, select a `WASocket` method, enter the connected Evolution API instance,
and provide an ordered JSON argument array. For example, `updateProfileStatus` accepts:

```json
["Available through Evolution API"]
```

For methods that accept `Buffer` or `Uint8Array`, use a Base64 envelope:

```json
[{ "$base64": "SGVsbG8=" }]
```

The node calls `POST /baileys/<method>/:instanceName`. See the Evolution API Swagger UI at `/docs` or
query `GET /baileys/methods/:instanceName` for the live method registry.

## Credit

This project is based on the [n8n-nodes-evolution-api](https://github.com/oriondesign2015/n8n-nodes-evolution-api) by [OrionDesign](https://github.com/oriondesign2015).

