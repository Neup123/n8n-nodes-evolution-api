import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function deleteMessage(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0) as string;
		const remoteJid = ef.getNodeParameter('remoteJid', 0) as string;
		const messageId = ef.getNodeParameter('messageId', 0) as string;
		const fromMe = ef.getNodeParameter('fromMe', 0) as boolean;

		const validRemoteJid =
			/^(?:\d+@(?:s\.whatsapp\.net|lid)|\d+-\d+@g\.us|status@broadcast|[^@\s]+@broadcast)$/.test(
				remoteJid,
			);
		if (!validRemoteJid) {
			throw new NodeOperationError(ef.getNode(), 'Invalid WhatsApp remote JID', {
				description:
					'remoteJid must be a full WhatsApp JID, not an Evolution database row ID. Use the message key remoteJid and keep the message ID in Message ID.',
			});
		}

		const body = {
			id: messageId,
			remoteJid,
			fromMe,
		};

		const requestOptions: IRequestOptions = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/chat/deleteMessageForEveryone/${instanceName}`,
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
	} catch (error) {
		const errorData = {
			success: false,
			error: {
				message: error.message,
				details: 'Error deleting message',
				code: error.code || 'UNKNOWN_ERROR',
				timestamp: new Date().toISOString(),
			},
		};

		if (!ef.continueOnFail()) {
			throw new NodeOperationError(ef.getNode(), error.message, {
				message: errorData.error.message,
				description: errorData.error.details,
			});
		}

		return {
			json: errorData,
			error: errorData,
		};
	}
}
