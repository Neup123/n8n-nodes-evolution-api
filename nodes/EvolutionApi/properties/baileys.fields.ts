import { INodeProperties } from 'n8n-workflow';

export const baileysFields: INodeProperties[] = [
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		description: 'Connected Evolution API instance name',
		displayOptions: {
			show: {
				resource: ['baileys-api'],
			},
		},
	},
	{
		displayName: 'Arguments',
		name: 'baileysArguments',
		type: 'json',
		default: '[]',
		required: true,
		description:
			'Ordered argument array from the Baileys method signature. Use {"$base64":"..."} for Buffer or Uint8Array values.',
		displayOptions: {
			show: {
				resource: ['baileys-api'],
			},
		},
	},
];
