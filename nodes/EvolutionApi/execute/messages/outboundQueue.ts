import { IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import { evolutionRequest } from '../evolutionRequest';

export async function outboundQueue(ef: IExecuteFunctions) {
	const items = ef.getInputData();
	const returnData: INodeExecutionData[] = [];
	const operation = ef.getNodeParameter('operation', 0) as string;

	for (let i = 0; i < items.length; i++) {
		try {
			const instanceName = ef.getNodeParameter('queueInstanceName', i) as string;
			const limit = operation === 'outbound-queue' ? (ef.getNodeParameter('queueLimit', i, 100) as number) : 0;
			const response = await evolutionRequest(ef, {
				method: (operation === 'outbound-queue' ? 'GET' : 'DELETE') as IHttpRequestMethods,
				uri: `/message/outboundQueue/${instanceName}${limit ? `?limit=${limit}` : ''}`,
				json: true,
			});

			returnData.push({ json: { success: true, data: response } });
		} catch (error) {
			if (!ef.continueOnFail()) {
				throw new NodeOperationError(ef.getNode(), 'Outbound queue operation failed', {
					description: error.message,
				});
			}
			returnData.push({
				json: { success: false, error: { message: error.message, code: error.code || 'UNKNOWN_ERROR' } },
				error: new NodeOperationError(ef.getNode(), 'Outbound queue operation failed', {
					description: error.message,
				}),
			});
		}
	}

	return returnData;
}
