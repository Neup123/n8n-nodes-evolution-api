import { IExecuteFunctions, IRequestOptions } from 'n8n-workflow';

export async function evolutionRequest(ef: IExecuteFunctions, options: IRequestOptions) {
	const credentials = await ef.getCredentials('evolutionApi');
	const serverUrl = credentials['server-url'];
	const apiKey = credentials.apikey;
	const live = ef.getNodeParameter('live', 0, false) === true;

	const requestOptions: IRequestOptions = {
		...options,
		headers: {
			apikey: apiKey,
			...(options.headers || {}),
		},
		uri: `${serverUrl}${options.uri}`,
		qs: live ? { ...(options.qs || {}), live: true } : options.qs,
	};

	return await ef.helpers.request(requestOptions);
}
