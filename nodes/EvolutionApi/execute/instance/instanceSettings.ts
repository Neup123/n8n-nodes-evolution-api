import {
	IExecuteFunctions,
	IRequestOptions,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';

export async function instanceSettings(ef: IExecuteFunctions) {
	try {
		const instanceName = ef.getNodeParameter('instanceName', 0);
		const rejectCall = ef.getNodeParameter('rejectCall', 0);
		const msgCall = ef.getNodeParameter('msgCall', 0) || '';
		const groupsIgnore = ef.getNodeParameter('groupsIgnore', 0);
		const alwaysOnline = ef.getNodeParameter('alwaysOnline', 0);
		const readMessages = ef.getNodeParameter('readMessages', 0);
		const syncFullHistory = ef.getNodeParameter('syncFullHistory', 0);
		const readStatus = ef.getNodeParameter('readStatus', 0);
		const automationSafety = ef.getNodeParameter('automationSafety.policy', 0, {}) as any;

		const body: any = {
			rejectCall,
			msgCall: msgCall || '',
			groupsIgnore,
			alwaysOnline,
			readMessages,
			syncFullHistory,
			readStatus,
		};

		if (rejectCall) {
			body.msgCall = msgCall || '';
		}

		if (automationSafety && Object.keys(automationSafety).length > 0) {
			body.automationSafety = {
				enabled: Boolean(automationSafety.enabled),
				typing: {
					enabled: Boolean(automationSafety.typingEnabled),
					minMs: automationSafety.typingMinMs,
					maxMs: automationSafety.typingMaxMs,
					charactersPerSecond: automationSafety.typingCharactersPerSecond,
					jitterPercent: automationSafety.typingJitterPercent,
					presence: automationSafety.typingPresence,
					applyToMediaCaptions: Boolean(automationSafety.typingApplyToMediaCaptions),
				},
				rateLimit: {
					instancePerMinute: automationSafety.instancePerMinute,
					instancePerDay: automationSafety.instancePerDay,
					recipientPerMinute: automationSafety.recipientPerMinute,
					recipientPerDay: automationSafety.recipientPerDay,
					minimumIntervalMs: automationSafety.minimumIntervalMs,
					maxConcurrentSends: automationSafety.maxConcurrentSends,
				},
				outreach: {
					enabled: Boolean(automationSafety.outreachEnabled),
					newOrDormantRecipientsPerDay: automationSafety.newOrDormantRecipientsPerDay,
					dormantAfterDays: automationSafety.dormantAfterDays,
				},
				quietHours: {
					enabled: Boolean(automationSafety.quietHoursEnabled),
					start: automationSafety.quietHoursStart,
					end: automationSafety.quietHoursEnd,
					timeZone: automationSafety.quietHoursTimeZone,
				},
				duplicate: {
					enabled: Boolean(automationSafety.duplicateEnabled),
					windowSeconds: automationSafety.duplicateWindowSeconds,
				},
				suppression: {
					recipients: String(automationSafety.suppressedRecipients || '')
						.split(/[\n,]/)
						.map((value) => value.trim())
						.filter(Boolean),
					allowlistEnabled: Boolean(automationSafety.allowlistEnabled),
					allowedRecipients: String(automationSafety.allowedRecipients || '')
						.split(/[\n,]/)
						.map((value) => value.trim())
						.filter(Boolean),
				},
				failurePause: {
					enabled: Boolean(automationSafety.failurePauseEnabled),
					threshold: automationSafety.failurePauseThreshold,
					pauseSeconds: automationSafety.failurePauseSeconds,
				},
				audit: { retentionDays: automationSafety.auditRetentionDays },
			};
		}

		const options: IRequestOptions = {
			method: 'POST' as IHttpRequestMethods,
			headers: {
				'Content-Type': 'application/json',
			},
			uri: `/settings/set/${instanceName}`,
			body,
			json: true,
		};

		const response = await evolutionRequest(ef, options);
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
				message: error.message.includes('Could not get parameter')
					? 'Invalid or missing parameters'
					: 'Error setting instance configuration',
				details: error.message.includes('Could not get parameter')
					? 'Verify that all required fields were completed correctly'
					: error.message,
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
