import { IExecuteFunctions, IHttpRequestMethods, IRequestOptions, NodeOperationError } from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function outboundAudit(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const limit = ef.getNodeParameter('outboundAuditLimit', 0, 100) as number;
		const recipient = ef.getNodeParameter('outboundAuditRecipient', 0, '') as string;
		const status = ef.getNodeParameter('outboundAuditStatus', 0, '') as string;
		const query = [`limit=${encodeURIComponent(String(limit))}`];
		if (recipient) query.push(`recipient=${encodeURIComponent(recipient)}`);
		if (status) query.push(`status=${encodeURIComponent(status)}`);

		const options: IRequestOptions = {
			method: 'GET' as IHttpRequestMethods,
			uri: `/settings/outbound-audit/${instanceName}?${query.join('&')}`,
			json: true,
		};
		const response = await evolutionRequest(ef, options);
		return { json: { success: true, data: response } };
	} catch (error) {
		if (!ef.continueOnFail()) {
			throw new NodeOperationError(ef.getNode(), error.message, {
				message: 'Error fetching outbound safety audit',
				description: error.message,
			});
		}
		return { json: { success: false, error: { message: error.message } } };
	}
}
