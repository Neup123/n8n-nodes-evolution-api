import { INodeProperties } from 'n8n-workflow';

import { BAILEYS_METHOD_METADATA } from './baileys.metadata';

const groupLabels: Record<string, string> = {
	communities: 'Communities',
	business: 'Business & Catalog',
	messages: 'Calls & Messages',
	newsletters: 'Newsletters',
	groups: 'Groups',
	account: 'Account & Privacy',
	advanced: 'Advanced Protocol',
};

export const baileysResourceByGroup: Record<string, string> = Object.fromEntries(
	Object.keys(groupLabels).map((group) => [group, `baileys-${group}`]),
);

const methodDescriptions: Record<string, string> = {
	communityMetadata: 'Get the name, description, participants, and settings of a community.',
	communityCreate: 'Create a WhatsApp community with a subject and description.',
	communityCreateGroup: 'Create a group inside an existing community and add participants.',
	groupMetadata: 'Get the subject, description, owner, participants, and settings of a group.',
	groupCreate: 'Create a WhatsApp group and add the supplied participants.',
	groupParticipantsUpdate: 'Add, remove, promote, or demote participants in a group.',
	groupRequestParticipantsList: 'List pending requests from people who want to join a group.',
	groupRequestParticipantsUpdate: 'Approve or reject pending group join requests.',
	newsletterCreate: 'Create a WhatsApp newsletter (channel).',
	newsletterMetadata: 'Get newsletter details using its JID or invite code.',
	newsletterFetchMessages: 'Load messages published by a newsletter.',
	newsletterReactMessage: 'Add or remove an emoji reaction on a newsletter message.',
	sendMessage: 'Send a Baileys message payload directly to a chat or group.',
	readMessages: 'Mark one or more WhatsApp messages as read.',
	sendReceipt: 'Send a delivery, read, played, or other receipt for a message.',
	sendReceipts: 'Send the same receipt for multiple messages.',
	relayMessage: 'Relay an already constructed protocol message to a WhatsApp JID.',
	fetchMessageHistory: 'Request older messages for a chat from linked WhatsApp devices.',
	updateMediaMessage: 'Re-upload or refresh media data for a message whose media is unavailable.',
	fetchBlocklist: 'Get all WhatsApp accounts blocked by the connected account.',
	updateBlockStatus: 'Block or unblock a WhatsApp contact.',
	fetchPrivacySettings: 'Get the connected account privacy settings.',
	chatModify: 'Archive, unarchive, mute, pin, clear, or delete a chat using a Baileys chat modification.',
	sendPresenceUpdate: 'Set the account presence, such as available, unavailable, composing, or recording.',
	presenceSubscribe: 'Subscribe to live presence updates for a contact.',
	updateProfilePicture: 'Set the profile picture for the account, a group, or another supported JID.',
	requestPairingCode: 'Generate a pairing code for linking the WhatsApp account without scanning a QR code.',
	query: 'Send a low-level WhatsApp binary query. Intended for advanced protocol integrations.',
	sendRawMessage: 'Send a low-level raw WhatsApp message. Intended for advanced protocol integrations.',
};

function titleCase(value: string) {
	return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (character) => character.toUpperCase());
}

function describeMethod(method: string) {
	if (methodDescriptions[method]) return methodDescriptions[method];
	const readable = titleCase(method).toLowerCase();
	if (/^(fetch|get)/.test(method)) return `Retrieve ${readable.replace(/^(fetch|get) /, '')} from WhatsApp.`;
	if (/^(create|add)/.test(method)) return `Create or add ${readable.replace(/^(create|add) /, '')} in WhatsApp.`;
	if (/^(update|set|modify)/.test(method)) return `Change ${readable.replace(/^(update|set|modify) /, '')} for the connected WhatsApp account.`;
	if (/^(remove|delete|clean)/.test(method)) return `Remove ${readable.replace(/^(remove|delete|clean) /, '')} from WhatsApp.`;
	if (/^(send|relay|issue)/.test(method)) return `Send ${readable.replace(/^(send|relay|issue) /, '')} through the connected WhatsApp account.`;
	if (/^(subscribe|follow|unfollow|mute|unmute|leave|accept|reject|revoke|rotate|resync|star)/.test(method)) return `${titleCase(method)} for the connected WhatsApp account.`;
	return `Run the ${titleCase(method)} WhatsApp operation and return its Baileys result.`;
}

export const baileysMethodNames = Object.keys(BAILEYS_METHOD_METADATA);

function operationSelector(group: string, resource: string): INodeProperties {
	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: [resource] } },
		options: Object.entries(BAILEYS_METHOD_METADATA)
			.filter(([, definition]) => group === 'all' || definition.group === group)
			.map(([method, definition]) => ({
				name: group === 'all' ? `${groupLabels[definition.group]}: ${titleCase(method)}` : titleCase(method),
				value: method,
				action: titleCase(method),
				description: describeMethod(method),
			})),
		default: '',
	};
}

export const baileysOperations: INodeProperties[] = [
	...Object.entries(baileysResourceByGroup).map(([group, resource]) => operationSelector(group, resource)),
	operationSelector('all', 'baileys-api'),
];
