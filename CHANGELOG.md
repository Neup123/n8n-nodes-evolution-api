# Changelog

## 4.2.0 - 2026-09-16

- Added a 1–100% near-duplicate similarity threshold to Instances → Set Behavior.
- Clarified that duplicate lookback is time-based and checks every successful send to the same recipient inside the window, not a fixed number of messages.
- Requires Evolution API 5.2.0 or later for approximate duplicate matching.

## 4.1.2 - 2026-09-16

- Documented and exposed the Evolution API 5.1 canonical local-message response, provenance, PN/LID aliases, and delivery evidence.
- Clarified that `PENDING`, `PROVISIONAL`, `SERVER_ACK`, and `SERVER_ACCEPTED` are not recipient-delivery evidence.
- Improved Chat → Search Messages labels and field explanations.
- Documented the breaking PN/LID safety correction: unresolved LID digits are never exposed as a phone number.
- Requires Evolution API 5.1.0 for the new response fields and future message idempotency.

## 4.1.1 - 2026-09-14

- Added controls for unique new/dormant-recipient outreach and the inbound inactivity window.
- Documented `NEW`, `DORMANT`, `ENGAGED`, and `NON_DIRECT` audit categories and the `outreach_recipient_limit` response.
- Requires Evolution API 5.0.0 or later for the new controls and non-2xx runtime-action error contract.

## 4.1.0 - 2026-09-14

- Added complete Automation Safety & Pacing controls to Instances → Set Behavior, including instance daily limits and opt-in recipient allowlisting.
- Added Instances → Get Outbound Safety Audit with recipient and delivery-status filters.
- Added field-by-field policy, output, and retry guidance.
- Requires Evolution API 4.2.0 or later for the new operations.
