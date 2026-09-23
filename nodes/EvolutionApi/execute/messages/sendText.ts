import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function sendText(ef: IExecuteFunctions) {
	const items = ef.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const instanceName = ef.getNodeParameter('instanceName', i) as string;
			const settingsTemplateId = ef.getNodeParameter('settingsTemplateId', i, '') as string;
			const remoteJid = ef.getNodeParameter('remoteJid', i) as string;
			const messageText = ef.getNodeParameter('messageText', i) as string;

			if (/^@[^@\s]+$/.test(remoteJid.trim())) {
				throw new NodeOperationError(ef.getNode(), 'Username resolution required', {
					description:
						'A raw @username is not a message destination. Resolve it to the authoritative @lid returned by WhatsApp, then pass that full JID.',
				});
			}
			const options = ef.getNodeParameter('options_message', i, {}) as {
				delay?: number;
				linkPreview?: boolean;
				quoted?: {
					messageQuoted: {
						messageId: string;
					};
				};
				mentions?: {
					mentionsSettings: {
						mentionsEveryOne: boolean;
						mentioned?: string;
					};
				};
			};

			const body: any = {
				...(settingsTemplateId ? { settingsTemplateId } : {}),
				number: remoteJid,
				text: messageText,
			};

			if (options.delay) {
				body.delay = options.delay;
			}

			if (options.linkPreview !== undefined) {
				body.linkPreview = options.linkPreview;
			}

			if (options.quoted?.messageQuoted?.messageId) {
				body.quoted = {
					key: {
						id: options.quoted.messageQuoted.messageId,
					},
				};
			}

			if (options.mentions?.mentionsSettings) {
				const { mentionsEveryOne, mentioned } = options.mentions.mentionsSettings;

				if (mentionsEveryOne) {
					body.mentionsEveryOne = true;
				} else if (mentioned) {
					const mentionedNumbers = mentioned
						.split(',')
						.map((num) => num.trim())
						.map((num) => (num.includes('@s.whatsapp.net') ? num : `${num}@s.whatsapp.net`));

					body.mentioned = mentionedNumbers;
				}
			}

			const requestOptions: IRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				headers: {
					'Content-Type': 'application/json',
				},
				uri: `/message/sendText/${instanceName}`,
				body,
				json: true,
			};

			const response = await evolutionRequest(ef, requestOptions);
			const queued = response?.queued === true || response?.deliveryStatus === 'PENDING';
			returnData.push({
				json: {
					requestAccepted: true,
					success: !queued,
					messageWasSent: !queued,
					queued,
					deliveryStatus: queued ? 'PENDING' : 'SENT',
					final: !queued,
					data: response,
				},
			});
		} catch (error) {
			const errorMessage = error.message.includes('Could not get parameter')
				? 'Invalid or missing parameters'
				: 'Error sending text message';

			const errorDetails = error.message.includes('Could not get parameter')
				? 'Verify that all required fields were completed correctly'
				: error.message;

			if (!ef.continueOnFail()) {
				throw new NodeOperationError(ef.getNode(), errorMessage, {
					message: errorMessage,
					description: errorDetails,
				});
			}

			returnData.push({
				json: {
					requestAccepted: false,
					success: false,
					messageWasSent: false,
					queued: false,
					deliveryStatus: 'FAILED',
					final: true,
					error: {
						message: errorMessage,
						details: errorDetails,
						code: error.code || 'UNKNOWN_ERROR',
						timestamp: new Date().toISOString(),
					},
				},
				error: new NodeOperationError(ef.getNode(), errorMessage, {
					message: errorMessage,
					description: errorDetails,
				}),
			});
		}
	}

	return returnData;
}
