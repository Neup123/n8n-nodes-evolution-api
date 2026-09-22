import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const chatFields: INodeProperties[] = [
	{
		displayName: 'Force Live WhatsApp Read',
		name: 'live',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to bypass the Evolution API local snapshot and query WhatsApp now',
		displayOptions: {
			show: { resource: ['chat-api'], operation: ['check-number', 'fetch-profile-picture'] },
		},
	},
	// Common fields for all operations
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Enter the instance name',
		displayOptions: {
			show: {
				resource: ['chat-api'],
			},
		},
	},

	// Fields for checking number
	{
		displayName: 'Numbers',
		name: 'numbers',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'List of numbers to check (separated by comma)',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['check-number'],
			},
		},
	},

	// Fields for reading messages
	{
		displayName: 'Chat JID (Contact or Group)',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},
	{
		displayName: 'Is My Message',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'If the message was sent by the instance',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['read-messages'],
			},
		},
	},

	// Fields for managing archive
	{
		displayName: 'Contact',
		name: 'chat',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'Action',
		name: 'archive',
		type: 'options' as NodePropertyTypes,
		options: [
			{
				name: 'Archive',
				value: true,
			},
			{
				name: 'Unarchive',
				value: false,
			},
		],
		default: true,
		required: true,
		description: 'Choose whether to archive or unarchive the conversation',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Last message ID',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},
	{
		displayName: 'Is My Message',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'If the message was sent by the instance',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['manage-archive'],
			},
		},
	},

	// Fields for marking as unread
	{
		displayName: 'Contact',
		name: 'chat',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Last message ID',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},
	{
		displayName: 'Is My Message',
		name: 'fromMe',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'If the message was sent by the instance',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['mark-unread'],
			},
		},
	},

	// Fields for deleting message
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		placeholder: '120363000000000000@g.us',
		description:
			'Exact data.key.remoteJid from the original message. For a group message this must be the group JID, not participant or participantAlt.',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID of the message to be deleted',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Original Participant JID',
		name: 'participant',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '184353602666626@lid',
		description:
			'The participant value from the original webhook message key. Required for group-admin deletion when the Evolution message archive cannot resolve the message ID.',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Participant Alternate JID',
		name: 'participantAlt',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '972500000000@s.whatsapp.net',
		description:
			'Optional alternate participant identity from key.participantAlt, normally the phone-number JID when Participant JID is an LID',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Message Timestamp',
		name: 'messageTimestamp',
		type: 'number' as NodePropertyTypes,
		default: 0,
		typeOptions: { minValue: 0 },
		description:
			'Original data.messageTimestamp in Unix seconds. Needed for delete-for-me only when Evolution cannot find the stored original message.',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},
	{
		displayName: 'Delete Media for This Account',
		name: 'deleteMedia',
		type: 'boolean' as NodePropertyTypes,
		default: true,
		description: 'Whether delete-for-me also removes locally stored media for the connected account',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['delete-message'],
			},
		},
	},

	// Fields for fetching profile picture
	{
		displayName: 'Contact',
		name: 'number',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number (e.g., 5511999999999)',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['fetch-profile-picture'],
			},
		},
	},

	// Fields for getting media in Base64
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID of the message containing the media',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['get-media-base64'],
			},
		},
	},
	{
		displayName: 'Convert to MP4',
		name: 'convertToMp4',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		required: true,
		description: 'Whether to convert the video to MP4 format',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['get-media-base64'],
			},
		},
	},

	// Fields for editing message
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'ID of the message to be edited',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},
	{
		displayName: 'New Message',
		name: 'text',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'New message text',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['update-message'],
			},
		},
	},

	// Fields for sending presence
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},
	{
		displayName: 'Presence',
		name: 'presence',
		type: 'options',
		options: [
			{
				name: 'Typing...',
				value: 'composing',
			},
			{
				name: 'Recording...',
				value: 'recording',
			},
		],
		default: 'composing',
		required: true,
		description: 'Type of presence to be sent',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},
	{
		displayName: 'Delay',
		name: 'delay',
		type: 'number' as NodePropertyTypes,
		default: 1200,
		required: true,
		description: 'Time in milliseconds that the presence will remain active',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['send-presence'],
			},
		},
	},

	// Fields for blocking contact
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['block-contact'],
			},
		},
	},
	{
		displayName: 'Action',
		name: 'status',
		type: 'options',
		options: [
			{
				name: 'Block',
				value: 'block',
			},
			{
				name: 'Unblock',
				value: 'unblock',
			},
		],
		default: 'block',
		required: true,
		description: 'Action to be executed',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['block-contact'],
			},
		},
	},

	// Fields for listing contacts
	{
		displayName: 'List All',
		name: 'listAll',
		type: 'boolean' as NodePropertyTypes,
		default: true,
		required: true,
		description: 'Whether to list all contacts',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-contacts'],
			},
		},
	},
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Specific contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-contacts'],
				listAll: [false],
			},
		},
	},

	// Fields for searching messages
	{
		displayName: 'Contact PN or LID JID',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description:
			'Phone number, full @s.whatsapp.net JID, or @lid JID. Evolution searches both the primary and alternate identity stored for each canonical message.',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'One-based result page, newest messages first',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},
	{
		displayName: 'Items Per Page',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,
		description: 'Maximum canonical message rows returned on this page',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-messages'],
			},
		},
	},

	// Fields for searching message status
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'Page number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},
	{
		displayName: 'Items Per Page',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,
		description: 'Number of messages per page',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-status-messages'],
			},
		},
	},

	// Fields for searching chats
	{
		displayName: 'Contact',
		name: 'remoteJid',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'Contact number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number' as NodePropertyTypes,
		default: 1,
		description: 'Page number',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
	{
		displayName: 'Items Per Page',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		default: 10,
		description: 'Number of chats per page',
		displayOptions: {
			show: {
				resource: ['chat-api'],
				operation: ['find-chats'],
			},
		},
	},
];
