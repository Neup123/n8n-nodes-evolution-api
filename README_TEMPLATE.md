# n8n Evolution API Community Node

This free community node helps n8n workflows use the main features of Evolution API. It is maintained in English; the upstream Portuguese reference is preserved separately in `README.ORIGINAL-pt-br.md`.

## Requirements

- n8n 1.54.4 or later
- Evolution API v3 or later

## Available resources

### Instance

Create, connect, inspect, configure, restart, log out, and delete Evolution API instances. Instance operations also cover presence and proxy settings.

### Messages

Send text, images, video, audio, documents, polls, contacts, lists, buttons, PIX content, status stories, and reactions. Operations expose relevant options such as delays, mentions, replies, and formatting.

### Groups

Create and administer groups, participants, permissions, pictures, names, descriptions, invitation links, and disappearing-message settings.

### Chat

Check numbers, read and manage messages, archive chats, mark chats unread, fetch profile pictures and media, manage contacts, send presence, and search messages, status messages, contacts, and chats.

### Events

Configure webhooks, RabbitMQ, and proxy delivery for Evolution API events.

### Integrations

Configure Chatwoot, Evolution Bot, Typebot, Flowise, and Dify integrations.

### Baileys

Use typed, grouped Baileys operations exposed by Evolution API v3. Eligible reads are local-first and offer a **Force Live WhatsApp Read** override. See [the local-first guide](docs/local-first-reads.md).

## Contributing

- Submit pull requests for fixes, improvements, and new operations.
- Open issues for defects and proposals.
- Keep user-facing text and maintained documentation in English.
- Update operation metadata, execution code, audits, and documentation together.

Originally developed by OrionDesign and maintained by the Evolution API community.
