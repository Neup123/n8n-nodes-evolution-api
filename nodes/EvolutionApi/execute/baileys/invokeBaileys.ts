import { IExecuteFunctions, IHttpRequestMethods, IRequestOptions, NodeOperationError } from 'n8n-workflow';

import { BAILEYS_METHOD_METADATA } from '../../properties/baileys.metadata';
import { baileysParameterFieldName } from '../../properties/baileys.fields';
import { evolutionRequest } from '../evolutionRequest';

type MethodName = keyof typeof BAILEYS_METHOD_METADATA;

function isMissing(value: unknown) {
	return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
}

export function normalizeStringArray(value: unknown): string[] {
	const values = Array.isArray(value) ? value.flat(Infinity) : [value];
	return values.flatMap((entry) => {
		if (typeof entry !== 'string') return String(entry);
		const trimmed = entry.trim();
		if (!trimmed) return [];
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) return normalizeStringArray(parsed);
		} catch {
			// n8n's multiple-values control already creates the array. Accept a
			// bracket-wrapped single value as a convenience for existing workflows.
		}
		if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
			return trimmed.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
		}
		return trimmed;
	});
}

function parseJsonParameter(ef: IExecuteFunctions, name: string, value: unknown) {
	if (typeof value !== 'string') return value;
	try {
		return JSON.parse(value);
	} catch (error) {
		throw new NodeOperationError(ef.getNode(), `${name} must be valid JSON: ${(error as Error).message}`);
	}
}

export async function executeBaileysMethod(ef: IExecuteFunctions) {
	const savedParameters = ef.getNode().parameters as Record<string, unknown>;
	const instanceName = ef.getNodeParameter('instanceName', 0, '') as string;
	const method = savedParameters.operation as MethodName;
	if (!method || !BAILEYS_METHOD_METADATA[method]) {
		throw new NodeOperationError(ef.getNode(), 'Select a valid Baileys operation and save the workflow before executing it.');
	}
	if (!instanceName.trim()) {
		throw new NodeOperationError(ef.getNode(), 'Instance Name is required.');
	}
	const definition = BAILEYS_METHOD_METADATA[method];
	const body: Record<string, unknown> = {};

	for (const parameter of definition.parameters) {
		const fieldName = baileysParameterFieldName(method, parameter.name);
		const schema = parameter.schema as { type?: string; items?: { type?: string }; enum?: readonly unknown[] };
		const value = ef.getNodeParameter(fieldName, 0, schema.enum?.[0]);
		if (isMissing(value)) {
			if (parameter.required) {
				throw new NodeOperationError(ef.getNode(), `${parameter.name} is required for ${method}.`);
			}
			continue;
		}
		body[parameter.name] =
			schema.type === 'array' && schema.items?.type === 'string'
				? normalizeStringArray(value)
				: schema.type === 'object' || schema.type === 'array' || !schema.type
				? parseJsonParameter(ef, parameter.name, value)
				: value;
	}

	const requestOptions: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: `/baileys/${definition.group}/${method}/${encodeURIComponent(instanceName)}`,
		body,
		json: true,
	};

	const response = await evolutionRequest(ef, requestOptions);
	return {
		json: {
			success: true,
			data: response,
		},
	};
}
