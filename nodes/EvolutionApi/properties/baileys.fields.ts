import { INodeProperties } from 'n8n-workflow';

import { BAILEYS_METHOD_METADATA } from './baileys.metadata';
import { baileysResourceByGroup } from './baileys.operations';

type ParameterDefinition = {
	name: string;
	required: boolean;
	rest: boolean;
	schema: {
		type?: string;
		enum?: readonly (string | number)[];
		description?: string;
	};
};

export function baileysParameterFieldName(method: string, parameter: string) {
	return `baileys_${method}_${parameter}`;
}

function titleCase(value: string) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/^./, (character) => character.toUpperCase());
}

const parameterLabels: Record<string, string> = {
	jid: 'WhatsApp JID',
	id: 'WhatsApp JID',
	to: 'Recipient JID',
	participants: 'Participant JIDs',
	participant: 'Participant JID',
	groupJid: 'Group JID',
	parentCommunityJid: 'Parent Community JID',
	newsletterJid: 'Newsletter JID',
	messageId: 'Message ID',
	messageIds: 'Message IDs',
	profilePicture: 'Profile Picture',
};

function parameterDescription(method: string, parameter: ParameterDefinition) {
	const name = parameter.name;
	if (['jid', 'id', 'to'].includes(name)) return 'Full WhatsApp address, for example 15551234567@s.whatsapp.net or 120363000000000000@g.us.';
	if (/participants?/i.test(name)) return 'One or more participant WhatsApp JIDs, including the @s.whatsapp.net suffix.';
	if (/inviteCode/i.test(name)) return 'Invite code only, without the https://chat.whatsapp.com/ URL prefix.';
	if (/messageId/i.test(name)) return 'WhatsApp message identifier from the message key.';
	if (name === 'action') return `Action to perform when running ${titleCase(method)}.`;
	if (name === 'content') return 'Baileys message content. Use the JSON structure for the message type you want to send.';
	if (name === 'options') return 'Optional Baileys settings for this operation. Only include properties you need to override.';
	if (name === 'subject') return 'Name shown to WhatsApp users.';
	if (name === 'description') return 'Description shown in WhatsApp.';
	return parameter.schema.description && !/^(string|number|boolean|any)(\[\])?$/.test(parameter.schema.description)
		? parameter.schema.description
		: `${titleCase(name)} used by ${titleCase(method)}.`;
}

function parameterField(method: string, parameter: ParameterDefinition): INodeProperties {
	const common = {
		displayName: parameterLabels[parameter.name] ?? titleCase(parameter.name),
		name: baileysParameterFieldName(method, parameter.name),
		required: parameter.required,
		description: parameterDescription(method, parameter),
		displayOptions: {
			show: {
				resource: ['baileys-api', baileysResourceByGroup[BAILEYS_METHOD_METADATA[method as keyof typeof BAILEYS_METHOD_METADATA].group]],
				operation: [method],
			},
		},
	};

	if (parameter.schema.enum?.length) {
		return {
			...common,
			type: 'options',
			options: parameter.schema.enum.map((value) => ({ name: String(value), value })),
			default: parameter.schema.enum[0],
		};
	}

	if (parameter.schema.type === 'string') return { ...common, type: 'string', default: '' };
	if (parameter.schema.type === 'number' || parameter.schema.type === 'integer') {
		return { ...common, type: 'number', default: 0 };
	}
	if (parameter.schema.type === 'boolean') return { ...common, type: 'boolean', default: false };
	if (parameter.schema.type === 'array' && (parameter.schema as any).items?.type === 'string') {
		return { ...common, type: 'string', typeOptions: { multipleValues: true }, default: [] };
	}

	return {
		...common,
		type: 'json',
		default: parameter.schema.type === 'array' || parameter.rest ? '[]' : '{}',
	};
}

const typedParameterFields = Object.entries(BAILEYS_METHOD_METADATA).flatMap(([method, definition]) =>
	definition.parameters.map((parameter) => parameterField(method, parameter)),
);

export const baileysFields: INodeProperties[] = [
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the connected Evolution API instance that will perform this WhatsApp operation',
		displayOptions: {
			show: {
				resource: ['baileys-api', ...Object.values(baileysResourceByGroup)],
			},
		},
	},
	...typedParameterFields,
];
