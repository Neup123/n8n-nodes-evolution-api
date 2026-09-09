Purpose of this document

This file explains the terminology used by the Evolution API node property definitions.

Resource
  A top-level capability area, such as Instance, Messages, Integrations, Chat,
  Profile, Groups, Events, or Baileys.

Operation
  An action available after selecting a resource. For example, the Instance
  resource can expose Create Instance, Create Instance with Proxy, and Connect
  Instance.

Element
  An input field shown for an operation. For example, Send Text Message needs
  the sending instance, recipient remote JID, and message text.

When adding an operation, update its resource's operation list, define every
required element, implement its execution handler, and keep labels, descriptions,
errors, and documentation in English.
