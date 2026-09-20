# Evolution API settings-template compatibility

This node package supports Evolution API's live settings-template hierarchy:

1. per-request template override
2. exact group or contact assignment
3. instance default assignment
4. existing instance and server defaults

Use the **Settings Template** resource to create, edit, duplicate, delete, list, assign, unassign, and inspect bindings. Template settings may contain only `localReadTtlSeconds`, `localReadTtlOverrides`, and `automationSafety`.

All Message operations expose optional **Settings Template ID**. Passing it selects the highest-precedence policy for that request. Leave it blank to use the recipient assignment or instance default. Raw `@username` values remain invalid destinations; use the authoritative full `@lid` from WhatsApp.
