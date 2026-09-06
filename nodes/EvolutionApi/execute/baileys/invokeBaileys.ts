import { IExecuteFunctions, IHttpRequestMethods, IRequestOptions, NodeOperationError } from 'n8n-workflow';

import { BAILEYS_METHOD_METADATA } from '../../properties/baileys.metadata';
import { baileysParameterFieldName } from '../../properties/baileys.fields';
import { evolutionRequest } from '../evolutionRequest';

type MethodName = keyof typeof BAILEYS_METHOD_METADATA;

function parseJsonParameter(ef: IExecuteFunctions, name: string, value: unknown) {
	if (typeof value !== 'string') return value;
	try {
		return JSON.parse(value);
	} catch (error) {
		throw new NodeOperationError(ef.getNode(), `${name} must be valid JSON: ${(error as Error).message}`);
	}
}

export async function invokeBaileys(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0) as string;
	const method = ef.getNodeParameter('operation', 0) as MethodName;
	const definition = BAILEYS_METHOD_METADATA[method];
	const body: Record<string, unknown> = {};

	for (const parameter of definition.parameters) {
		const fieldName = baileysParameterFieldName(method, parameter.name);
		const value = ef.getNodeParameter(fieldName, 0);
		const schema = parameter.schema as { type?: string };
		body[parameter.name] =
			schema.type === 'object' || schema.type === 'array' || !schema.type
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
