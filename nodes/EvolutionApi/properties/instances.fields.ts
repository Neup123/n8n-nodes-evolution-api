import { INodeProperties } from 'n8n-workflow';

// Instance fields
export const instancesFields: INodeProperties[] = [
	// Fields = Create Instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name for the instance',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Instance API Key',
		name: 'token',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'Optional: Enter a token for the instance',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'WhatsApp Number',
		name: 'number',
		type: 'string',
		default: '',
		description: 'Optional: Number to be connected to the instance, to receive the pairing code',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options_Create_instance',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Behavior',
				name: 'instanceSettings',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Instance Behavior',
						name: 'settings',
						values: [
							{
								displayName: 'Reject Calls',
								name: 'rejectCall',
								type: 'boolean',
								default: false,
								description: 'Whether to automatically reject incoming calls',
							},
							{
								displayName: 'Message on Reject',
								name: 'msgCall',
								type: 'string',
								default: '',
								description: 'Whether to send a message after rejecting a call, and if so, what message',
							},
							{
								displayName: 'Ignore Groups',
								name: 'groupsIgnore',
								type: 'boolean',
								default: false,
								description: 'Whether to ignore messages from groups',
							},
							{
								displayName: 'Always Online',
								name: 'alwaysOnline',
								type: 'boolean',
								default: false,
								description: 'Whether to keep the status always set to Online',
							},
							{
								displayName: 'Read Messages',
								name: 'readMessages',
								type: 'boolean',
								default: false,
								description: 'Whether to automatically mark messages as read',
							},
							{
								displayName: 'Read Status',
								name: 'readStatus',
								type: 'boolean',
								default: false,
								description: 'Whether to allow the API to view the Status of added contacts',
							},
							{
								displayName: 'Sync History',
								name: 'syncFullHistory',
								type: 'boolean',
								default: false,
								description: 'Whether to synchronize the full message history with the API',
							},
						],
					},
				],
				description: 'Instance behavior',
			},
			{
				displayName: 'Chatwoot',
				name: 'chatwoot',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Chatwoot Settings',
						name: 'chatwootSettings',
						values: [
							{
								displayName: 'Chatwoot Account ID',
								name: 'chatwootAccountId',
								type: 'string',
								default: '',
								description: 'Enter the Chatwoot account ID',
							},
							{
								displayName: 'Chatwoot Admin Token',
								name: 'chatwootToken',
								type: 'string',
								typeOptions: {
									password: true,
								},
								default: '',
								description: 'Enter the Chatwoot admin token',
							},
							{
								displayName: 'Chatwoot URL',
								name: 'chatwootUrl',
								type: 'string',
								default: '',
								description: 'Enter the Chatwoot URL',
							},
							{
								displayName: 'Chatwoot Agent Signature',
								name: 'chatwootSignMsg',
								type: 'boolean',
								default: false,
								description: 'Whether to enable or disable the Chatwoot agent signature',
							},
							{
								displayName: 'Reopen Messages in Chatwoot',
								name: 'chatwootReopenConversation',
								type: 'boolean',
								default: false,
								description: 'Whether to enable or disable reopening messages in Chatwoot',
							},
							{
								displayName: 'Start Conversations as Pending in Chatwoot',
								name: 'chatwootConversationPending',
								type: 'boolean',
								default: false,
								description: 'Whether to start conversations as pending in Chatwoot',
							},
							{
								displayName: 'Import Contacts to Chatwoot',
								name: 'chatwootImportContacts',
								type: 'boolean',
								default: false,
								description: 'Whether to import contacts to Chatwoot',
							},
							{
								displayName: 'Chatwoot Inbox Name',
								name: 'chatwootNameInbox',
								type: 'string',
								default: '',
								description: 'Enter the Chatwoot Inbox name',
							},
							{
								displayName: 'Merge Brazilian Contacts in Chatwoot',
								name: 'chatwootMergeBrazilContacts',
								type: 'boolean',
								default: false,
								description: 'Whether to merge Brazilian contacts in Chatwoot',
							},
							{
								displayName: 'Import Messages to Chatwoot',
								name: 'chatwootImportMessages',
								type: 'boolean',
								default: false,
								description: 'Whether to import messages to Chatwoot',
							},
							{
								displayName: 'Days Limit for Message Import to Chatwoot',
								name: 'chatwootDaysLimitImportMessages',
								type: 'number',
								default: 0,
								description: 'Enter the number of days to limit message import to Chatwoot',
							},
							{
								displayName: 'QR Code Contact Name in Chatwoot',
								name: 'chatwootOrganization',
								type: 'string',
								default: '',
								description: 'Enter the QR code contact name in Chatwoot',
							},
							{
								displayName: 'Logo URL for Contact in Chatwoot',
								name: 'chatwootLogo',
								type: 'string',
								default:
									'https://github.com/user-attachments/assets/4d1e9cd6-377a-4383-820a-9a97e6cfbb63',
								description: 'Enter the logo URL for the contact in Chatwoot',
							},
						],
					},
				],
				description: 'Chatwoot Settings',
			},
			{
				displayName: 'Proxy',
				name: 'proxy',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Proxy Settings',
						name: 'proxySettings',
						values: [
							{
								displayName: 'Proxy Host',
								name: 'proxyHost',
								type: 'string',
								default: '',
								description: 'Enter the proxy host',
							},
							{
								displayName: 'Proxy Port',
								name: 'proxyPort',
								type: 'string',
								default: '1234',
								description: 'Enter the proxy port',
							},
							{
								displayName: 'Proxy Protocol',
								name: 'proxyProtocol',
								type: 'options',
								options: [
									{
										name: 'HTTP',
										value: 'http',
									},
									{
										name: 'HTTPS',
										value: 'https',
									},
								],
								default: 'http',
								description: 'Select the proxy protocol',
							},
							{
								displayName: 'Proxy Username',
								name: 'proxyUsername',
								type: 'string',
								default: '',
								description: 'Enter the proxy username',
							},
							{
								displayName: 'Proxy Password',
								name: 'proxyPassword',
								type: 'string',
								typeOptions: {
									password: true,
								},
								default: '',
								description: 'Enter the proxy password',
							},
						],
					},
				],
				description: 'Proxy settings',
			},
			{
				displayName: 'RabbitMQ',
				name: 'rabbitmq',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'RabbitMQ Settings',
						name: 'rabbitmqSettings',
						values: [
							{
								displayName: 'Enable or Disable RabbitMQ',
								name: 'rabbitmqEnabled',
								type: 'boolean',
								default: false,
								description: 'Whether to send media data in base64 format in the RabbitMQ',
							},
							{
								displayName: 'Events',
								name: 'rabbitmqEvents',
								type: 'multiOptions',
								default: [],
								options: [
									{
										name: 'CALL',
										value: 'CALL',
									},
									{
										name: 'CHATS_DELETE',
										value: 'CHATS_DELETE',
									},
									{
										name: 'CHATS_SET',
										value: 'CHATS_SET',
									},
									{
										name: 'CHATS_UPDATE',
										value: 'CHATS_UPDATE',
									},
									{
										name: 'CHATS_UPSERT',
										value: 'CHATS_UPSERT',
									},
									{
										name: 'CONNECTION_UPDATE',
										value: 'CONNECTION_UPDATE',
									},
									{
										name: 'CONTACTS_SET',
										value: 'CONTACTS_SET',
									},
									{
										name: 'CONTACTS_UPDATE',
										value: 'CONTACTS_UPDATE',
									},
									{
										name: 'CONTACTS_UPSERT',
										value: 'CONTACTS_UPSERT',
									},
									{
										name: 'GROUP_PARTICIPANTS_UPDATE',
										value: 'GROUP_PARTICIPANTS_UPDATE',
									},
									{
										name: 'GROUP_UPDATE',
										value: 'GROUP_UPDATE',
									},
									{
										name: 'GROUPS_UPSERT',
										value: 'GROUPS_UPSERT',
									},
									{
										name: 'LABELS_ASSOCIATION',
										value: 'LABELS_ASSOCIATION',
									},
									{
										name: 'LABELS_EDIT',
										value: 'LABELS_EDIT',
									},
									{
										name: 'MESSAGES_DELETE',
										value: 'MESSAGES_DELETE',
									},
									{
										name: 'MESSAGES_SET',
										value: 'MESSAGES_SET',
									},
									{
										name: 'MESSAGES_UPDATE',
										value: 'MESSAGES_UPDATE',
									},
									{
										name: 'MESSAGES_UPSERT',
										value: 'MESSAGES_UPSERT',
									},
									{
										name: 'PRESENCE_UPDATE',
										value: 'PRESENCE_UPDATE',
									},
									{
										name: 'QRCODE_UPDATED',
										value: 'QRCODE_UPDATED',
									},
									{
										name: 'SEND_MESSAGE',
										value: 'SEND_MESSAGE',
									},
									{
										name: 'TYPEBOT_CHANGE_STATUS',
										value: 'TYPEBOT_CHANGE_STATUS',
									},
									{
										name: 'TYPEBOT_START',
										value: 'TYPEBOT_START',
									},
								],
							},
						],
					},
				],
				description: 'Events to be monitored',
			},
			{
				displayName: 'Webhook',
				name: 'webhook',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				default: { settings: {} },
				options: [
					{
						displayName: 'Webhook Settings',
						name: 'webhookSettings',
						values: [
							{
								displayName: 'Webhook URL',
								name: 'webhookUrl',
								type: 'string',
								default: '',
								description: 'Enter the URL that will receive Webhook events',
							},
							{
								displayName: 'Webhook By Events',
								name: 'webhookByEvents',
								type: 'boolean',
								default: false,
								description:
									'Whether to create a route for each event by appending the event name to the end of the URL',
							},
							{
								displayName: 'Base64 In Webhook',
								name: 'webhookBase64',
								type: 'boolean',
								default: false,
								description: 'Whether to send media data in base64 format in the webhook',
							},
							{
								displayName: 'Events',
								name: 'webhookEvents',
								type: 'multiOptions',
								default: [],
								options: [
									{
										name: 'CALL',
										value: 'CALL',
									},
									{
										name: 'CHATS_DELETE',
										value: 'CHATS_DELETE',
									},
									{
										name: 'CHATS_SET',
										value: 'CHATS_SET',
									},
									{
										name: 'CHATS_UPDATE',
										value: 'CHATS_UPDATE',
									},
									{
										name: 'CHATS_UPSERT',
										value: 'CHATS_UPSERT',
									},
									{
										name: 'CONNECTION_UPDATE',
										value: 'CONNECTION_UPDATE',
									},
									{
										name: 'CONTACTS_SET',
										value: 'CONTACTS_SET',
									},
									{
										name: 'CONTACTS_UPDATE',
										value: 'CONTACTS_UPDATE',
									},
									{
										name: 'CONTACTS_UPSERT',
										value: 'CONTACTS_UPSERT',
									},
									{
										name: 'GROUP_PARTICIPANTS_UPDATE',
										value: 'GROUP_PARTICIPANTS_UPDATE',
									},
									{
										name: 'GROUP_UPDATE',
										value: 'GROUP_UPDATE',
									},
									{
										name: 'GROUPS_UPSERT',
										value: 'GROUPS_UPSERT',
									},
									{
										name: 'LABELS_ASSOCIATION',
										value: 'LABELS_ASSOCIATION',
									},
									{
										name: 'LABELS_EDIT',
										value: 'LABELS_EDIT',
									},
									{
										name: 'MESSAGES_DELETE',
										value: 'MESSAGES_DELETE',
									},
									{
										name: 'MESSAGES_SET',
										value: 'MESSAGES_SET',
									},
									{
										name: 'MESSAGES_UPDATE',
										value: 'MESSAGES_UPDATE',
									},
									{
										name: 'MESSAGES_UPSERT',
										value: 'MESSAGES_UPSERT',
									},
									{
										name: 'PRESENCE_UPDATE',
										value: 'PRESENCE_UPDATE',
									},
									{
										name: 'QRCODE_UPDATED',
										value: 'QRCODE_UPDATED',
									},
									{
										name: 'SEND_MESSAGE',
										value: 'SEND_MESSAGE',
									},
									{
										name: 'TYPEBOT_CHANGE_STATUS',
										value: 'TYPEBOT_CHANGE_STATUS',
									},
									{
										name: 'TYPEBOT_START',
										value: 'TYPEBOT_START',
									},
								],
							},
						],
					},
				],
				description: 'Events to be monitored',
			},
		],
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-basic'],
			},
		},
	},

	// Fields = Connect Instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name of the instance you want to search',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-connect'],
			},
		},
	},

	// Fields = Fetch Instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		description: 'Enter the name of the instance you want to search',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['fetch-instances'],
			},
		},
	},

	// Fields = Set Behavior
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name for the instance',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Reject Calls',
		name: 'rejectCall',
		type: 'boolean',
		default: false,
		description: 'Whether to reject calls or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Call Message',
		name: 'msgCall',
		type: 'string',
		default: 'We do not accept phone calls.',
		description: 'Message to be sent if calls are rejected',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Ignore Groups',
		name: 'groupsIgnore',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Always Online',
		name: 'alwaysOnline',
		type: 'boolean',
		default: false,
		description: 'Whether the instance should always be online or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Read Messages',
		name: 'readMessages',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Sync Full History',
		name: 'syncFullHistory',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all history or not',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Read Status',
		name: 'readStatus',
		type: 'boolean',
		default: false,
		description: 'Whether to mention them all',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['instance-settings'],
			},
		},
	},
	{
		displayName: 'Automation Safety & Pacing',
		name: 'automationSafety',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Policy',
		description: 'Optional content-preserving safety policy for automated outbound messages',
		displayOptions: { show: { resource: ['instances-api'], operation: ['instance-settings'] } },
		options: [
			{
				name: 'policy',
				displayName: 'Policy',
				values: [
					{ displayName: 'Enabled', name: 'enabled', type: 'boolean', default: false, description: 'Whether to enforce this policy for all outbound sends on the instance' },
					{ displayName: 'Typing Indicator', name: 'typingEnabled', type: 'boolean', default: true, description: 'Whether to show a bounded typing indicator calculated from visible text length' },
					{ displayName: 'Typing Minimum (Ms)', name: 'typingMinMs', type: 'number', default: 500, typeOptions: { minValue: 0, maxValue: 20000 }, description: 'Shortest automatic typing indicator' },
					{ displayName: 'Typing Maximum (Ms)', name: 'typingMaxMs', type: 'number', default: 5000, typeOptions: { minValue: 0, maxValue: 20000 }, description: 'Longest automatic typing indicator' },
					{ displayName: 'Characters Per Second', name: 'typingCharactersPerSecond', type: 'number', default: 18, typeOptions: { minValue: 1, maxValue: 100, numberPrecision: 1 }, description: 'Visible text rate used only to calculate indicator duration' },
					{ displayName: 'Bounded Jitter (%)', name: 'typingJitterPercent', type: 'number', default: 10, typeOptions: { minValue: 0, maxValue: 25 }, description: 'Small bounded variation used to avoid simultaneous traffic bursts' },
					{ displayName: 'Presence', name: 'typingPresence', type: 'options', default: 'composing', options: [{ name: 'Composing', value: 'composing' }, { name: 'Recording', value: 'recording' }], description: 'Presence state shown during the pacing interval' },
					{ displayName: 'Use Media Captions', name: 'typingApplyToMediaCaptions', type: 'boolean', default: true, description: 'Whether caption length contributes to the indicator duration' },
					{ displayName: 'Instance Sends Per Minute', name: 'instancePerMinute', type: 'number', default: 60, typeOptions: { minValue: 1, maxValue: 10000 }, description: 'Maximum accepted sends for the instance in a rolling minute' },
					{ displayName: 'Instance Sends Per Day', name: 'instancePerDay', type: 'number', default: 5000, typeOptions: { minValue: 1, maxValue: 1000000 }, description: 'Maximum accepted sends for the instance in a rolling 24-hour window' },
					{ displayName: 'Recipient Sends Per Minute', name: 'recipientPerMinute', type: 'number', default: 10, typeOptions: { minValue: 1, maxValue: 1000 }, description: 'Maximum accepted sends to one recipient in a rolling minute' },
					{ displayName: 'Recipient Sends Per Day', name: 'recipientPerDay', type: 'number', default: 250, typeOptions: { minValue: 1, maxValue: 100000 }, description: 'Maximum accepted sends to one recipient in 24 hours' },
					{ displayName: 'Minimum Recipient Interval (Ms)', name: 'minimumIntervalMs', type: 'number', default: 750, typeOptions: { minValue: 0, maxValue: 600000 }, description: 'Minimum time between successful sends to the same recipient' },
					{ displayName: 'Maximum Concurrent Sends', name: 'maxConcurrentSends', type: 'number', default: 4, typeOptions: { minValue: 1, maxValue: 100 }, description: 'Maximum in-flight sends per API process for this instance' },
					{ displayName: 'Limit New or Dormant Recipients', name: 'outreachEnabled', type: 'boolean', default: true, description: 'Whether to limit unique direct recipients who have never sent an inbound message or have been inactive beyond the relationship window' },
					{ displayName: 'New or Dormant Recipients Per Day', name: 'newOrDormantRecipientsPerDay', type: 'number', default: 50, typeOptions: { minValue: 1, maxValue: 100000 }, description: 'Unique new or dormant direct contacts allowed in a rolling 24-hour window; active inbound contacts, groups, and broadcasts do not count' },
					{ displayName: 'Dormant After Days', name: 'dormantAfterDays', type: 'number', default: 180, typeOptions: { minValue: 1, maxValue: 3650 }, description: 'A direct contact becomes dormant after this many days without an inbound message' },
					{ displayName: 'Quiet Hours', name: 'quietHoursEnabled', type: 'boolean', default: false, description: 'Whether requests in the configured local-time window are rejected' },
					{ displayName: 'Quiet Hours Start', name: 'quietHoursStart', type: 'string', default: '22:00', placeholder: '22:00', description: 'Start time in 24-hour HH:MM format' },
					{ displayName: 'Quiet Hours End', name: 'quietHoursEnd', type: 'string', default: '08:00', placeholder: '08:00', description: 'End time in 24-hour HH:MM format' },
					{ displayName: 'Quiet Hours Time Zone', name: 'quietHoursTimeZone', type: 'string', default: 'UTC', placeholder: 'Europe/Athens', description: 'IANA time zone used for quiet-hours evaluation' },
					{ displayName: 'Block Duplicate or Similar Text', name: 'duplicateEnabled', type: 'boolean', default: true, description: 'Whether to block duplicate or sufficiently similar visible text for the same recipient' },
					{ displayName: 'Duplicate Window (Seconds)', name: 'duplicateWindowSeconds', type: 'number', default: 30, typeOptions: { minValue: 1, maxValue: 86400 }, description: 'Checks every successful message to the same recipient inside this rolling time window; there is no fixed message-count limit' },
					{ displayName: 'Similarity Threshold (%)', name: 'duplicateSimilarityThresholdPercent', type: 'number', default: 100, typeOptions: { minValue: 1, maxValue: 100 }, description: '100 blocks exact text only; lower values also block near-duplicates. 85 is a practical starting point.' },
					{ displayName: 'Suppressed Recipients', name: 'suppressedRecipients', type: 'string', typeOptions: { rows: 4 }, default: '', placeholder: '15551234567@s.whatsapp.net', description: 'Comma-separated or one-per-line JIDs or numbers that must never receive automated sends' },
					{ displayName: 'Use Recipient Allowlist', name: 'allowlistEnabled', type: 'boolean', default: false, description: 'Whether only entries in Allowed Recipients can receive automated sends' },
					{ displayName: 'Allowed Recipients', name: 'allowedRecipients', type: 'string', typeOptions: { rows: 4 }, default: '', placeholder: '15551234567@s.whatsapp.net', description: 'Comma-separated or one-per-line JIDs or numbers permitted when the allowlist is enabled' },
					{ displayName: 'Pause After Failures', name: 'failurePauseEnabled', type: 'boolean', default: true, description: 'Whether repeated failures temporarily stop new sends' },
					{ displayName: 'Failure Threshold', name: 'failurePauseThreshold', type: 'number', default: 5, typeOptions: { minValue: 1, maxValue: 100 }, description: 'Consecutive failures that open the circuit' },
					{ displayName: 'Failure Pause (Seconds)', name: 'failurePauseSeconds', type: 'number', default: 300, typeOptions: { minValue: 1, maxValue: 86400 }, description: 'How long the failure circuit remains open' },
					{ displayName: 'Audit Retention (Days)', name: 'auditRetentionDays', type: 'number', default: 90, typeOptions: { minValue: 1, maxValue: 3650 }, description: 'How long outbound safety audit rows are retained' },
				],
			},
		],
	},

	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Instance whose persistent outbound safety audit should be listed',
		displayOptions: { show: { resource: ['instances-api'], operation: ['outbound-audit'] } },
	},
	{
		displayName: 'Limit',
		name: 'outboundAuditLimit',
		type: 'number',
		default: 100,
		typeOptions: { minValue: 1, maxValue: 500 },
		description: 'Maximum number of newest audit records to return',
		displayOptions: { show: { resource: ['instances-api'], operation: ['outbound-audit'] } },
	},
	{
		displayName: 'Recipient',
		name: 'outboundAuditRecipient',
		type: 'string',
		default: '',
		description: 'Optional exact normalized recipient JID or number',
		displayOptions: { show: { resource: ['instances-api'], operation: ['outbound-audit'] } },
	},
	{
		displayName: 'Status',
		name: 'outboundAuditStatus',
		type: 'options',
		default: '',
		options: [
			{ name: 'All', value: '' },
			{ name: 'Blocked', value: 'BLOCKED' },
			{ name: 'Failed', value: 'FAILED' },
			{ name: 'Pending', value: 'PENDING' },
			{ name: 'Sent', value: 'SENT' },
		],
		description: 'Optional delivery or policy status filter',
		displayOptions: { show: { resource: ['instances-api'], operation: ['outbound-audit'] } },
	},

	// Fields = Set presence
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the instance name',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-presence'],
			},
		},
	},
	{
		displayName: 'Presence',
		name: 'presence',
		type: 'options',
		options: [
			{
				name: 'Available',
				value: 'available',
			},
			{
				name: 'Unavailable',
				value: 'unavailable',
			},
		],
		default: 'available',
		required: true,
		description: 'Instance presence status',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-presence'],
			},
		},
	},

	// Fields = Proxy
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name of the instance that will send the message',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
			},
		},
	},

	{
		displayName: 'What Do You Want To Do',
		name: 'resourceForProxy',
		type: 'options',
		options: [
			{
				name: 'Set Proxy',
				value: 'setProxy',
			},
			{
				name: 'Check Proxy',
				value: 'findProxy',
			},
		],
		default: 'setProxy',
		description: 'Choose between enabling/disabling proxy or checking the proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
			},
		},
	},
	{
		displayName: 'Enable Proxy',
		name: 'enabled',
		type: 'boolean',
		default: true,
		description: 'Whether to enable or disable integration with proxy',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Proxy Protocol',
		name: 'proxyProtocol',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
		type: 'options',
		options: [
			{
				name: 'HTTP',
				value: 'http',
			},
			{
				name: 'HTTPS',
				value: 'https',
			},
		],
		default: 'http',
		description: 'Select the proxy protocol',
	},
	{
		displayName: 'Proxy Host',
		name: 'proxyHost',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the proxy host',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Proxy Port',
		name: 'proxyPort',
		type: 'string',
		default: '1234',
		required: true,
		description: 'Enter the proxy port',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Proxy Username',
		name: 'proxyUsername',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the proxy username',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},
	{
		displayName: 'Proxy Password',
		name: 'proxyPassword',
		type: 'string',
		required: true,
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'Enter the proxy password',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['set-proxy'],
				resourceForProxy: ['setProxy'],
			},
		},
	},

	// Fields = Restart instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name of the instance you want to search',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['restart-instance'],
			},
		},
	},

	// Fields = Disconnect instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name of the instance you want to search',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['logout-instance'],
			},
		},
	},

	// Fields = Delete instance
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Enter the name of the instance to be deleted',
		displayOptions: {
			show: {
				resource: ['instances-api'],
				operation: ['delete-instance'],
			},
		},
	},
];
