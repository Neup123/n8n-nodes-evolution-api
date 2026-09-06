import { INodeProperties } from 'n8n-workflow';

import { BAILEYS_METHOD_METADATA } from './baileys.metadata';

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

function parameterField(method: string, parameter: ParameterDefinition): INodeProperties {
	const common = {
		displayName: titleCase(parameter.name),
		name: baileysParameterFieldName(method, parameter.name),
		required: parameter.required,
		description: parameter.schema.description ?? `Baileys ${parameter.name} parameter`,
		displayOptions: {
			show: {
				resource: ['baileys-api'],
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
		description: 'Connected Evolution API instance name',
		displayOptions: {
			show: {
				resource: ['baileys-api'],
			},
		},
	},
	...typedParameterFields,
];
