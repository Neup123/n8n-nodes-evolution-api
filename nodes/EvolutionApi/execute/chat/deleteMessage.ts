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
		const participant = ef.getNodeParameter('participant', 0, '') as string;
		const participantAlt = ef.getNodeParameter('participantAlt', 0, '') as string;
		const messageTimestamp = ef.getNodeParameter('messageTimestamp', 0, 0) as number;
		const deleteMedia = ef.getNodeParameter('deleteMedia', 0, true) as boolean;

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
			...(participant ? { participant } : {}),
			...(participantAlt ? { participantAlt } : {}),
			...(messageTimestamp > 0 ? { messageTimestamp } : {}),
			deleteMedia,
		};

		const requestOptions: IRequestOptions = {
			method: 'DELETE' as IHttpRequestMethods,
			uri: `/chat/deleteMessageForEveryone/${instanceName}`,
			body,
			json: true,
		};

		const response = await evolutionRequest(ef, requestOptions);
		const responseStatus = response?.deletion?.status ?? response?.status;
		const deletionScope = response?.deletion?.scope;
		const serverAcknowledged =
			response?.deletion?.serverAcknowledged === true ||
			responseStatus === 'SERVER_ACK' ||
			responseStatus === 'DELIVERY_ACK' ||
			responseStatus === 'READ' ||
			(typeof responseStatus === 'number' && responseStatus >= 2);
		const appStatePatchAccepted =
			deletionScope === 'ME' && response?.deletion?.appStatePatchAccepted === true;
		if (!serverAcknowledged && !appStatePatchAccepted) {
			throw new NodeOperationError(
				ef.getNode(),
				'WhatsApp did not accept the message deletion',
				{
					description:
						'The API returned neither a confirmed delete-for-everyone acknowledgement nor an accepted delete-for-me app-state patch.',
				},
			);
		}
		return {
			json: {
				success: true,
				deletionScope,
				serverAcknowledged,
				appStatePatchAccepted,
				status: responseStatus,
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
