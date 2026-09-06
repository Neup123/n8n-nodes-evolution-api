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

export const baileysMethodNames = Object.keys(BAILEYS_METHOD_METADATA);

export const baileysOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['baileys-api'],
		},
	},
	options: Object.entries(BAILEYS_METHOD_METADATA).map(([method, definition]) => ({
		name: `${groupLabels[definition.group]}: ${method}`,
		value: method,
		action: `Invoke ${method}`,
		description: `Invoke Baileys WASocket.${method} with named parameters`,
	})),
	default: '',
};
