# Changelog

## 4.1.1 - 2026-09-14

- Added controls for unique new/dormant-recipient outreach and the inbound inactivity window.
- Documented `NEW`, `DORMANT`, `ENGAGED`, and `NON_DIRECT` audit categories and the `outreach_recipient_limit` response.
- Requires Evolution API 5.0.0 or later for the new controls and non-2xx runtime-action error contract.

## 4.1.0 - 2026-09-14

- Added complete Automation Safety & Pacing controls to Instances → Set Behavior, including instance daily limits and opt-in recipient allowlisting.
- Added Instances → Get Outbound Safety Audit with recipient and delivery-status filters.
- Added field-by-field policy, output, and retry guidance.
- Requires Evolution API 4.2.0 or later for the new operations.
