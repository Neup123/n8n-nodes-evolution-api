import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

import { evolutionRequest } from '../evolutionRequest';

export async function invokeBaileys(ef: IExecuteFunctions) {
	const instanceName = ef.getNodeParameter('instanceName', 0) as string;
	const method = ef.getNodeParameter('operation', 0) as string;
	const rawArguments = ef.getNodeParameter('baileysArguments', 0) as string | unknown[];

	let args: unknown[];
	try {
		args = typeof rawArguments === 'string' ? JSON.parse(rawArguments) : rawArguments;
	} catch (error) {
		throw new NodeOperationError(ef.getNode(), `Arguments must be valid JSON: ${error.message}`);
	}

	if (!Array.isArray(args)) {
		throw new NodeOperationError(ef.getNode(), 'Arguments must be a JSON array in Baileys signature order.');
	}

	const requestOptions: IRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		uri: `/baileys/${method}/${encodeURIComponent(instanceName)}`,
		body: { args },
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
