import { IDataObject, IExecuteFunctions, IRequestOptions } from 'n8n-workflow';

import { evolutionRequest } from '../evolutionRequest';

const jsonParameter = (ef: IExecuteFunctions, name: string) => {
	const value = ef.getNodeParameter(name, 0, '{}');
	if (typeof value === 'object') return value;
	return JSON.parse(String(value || '{}'));
};

export async function archiveOperation(ef: IExecuteFunctions) {
	const operation = ef.getNodeParameter('operation', 0) as string;
	const instanceName = encodeURIComponent(
		String(ef.getNodeParameter('archiveInstanceName', 0, '')),
	);
	const map: Record<string, { method: IRequestOptions['method']; uri: string }> = {
		status: { method: 'GET', uri: '/archive/status' },
		events: { method: 'GET', uri: `/archive/events/${instanceName}` },
		messages: { method: 'GET', uri: `/archive/messages/${instanceName}` },
		contacts: { method: 'GET', uri: `/archive/contacts/${instanceName}` },
		chats: { method: 'GET', uri: `/archive/chats/${instanceName}` },
		groups: { method: 'GET', uri: `/archive/groups/${instanceName}` },
		media: { method: 'GET', uri: `/archive/media/${instanceName}` },
		'message-revisions': {
			method: 'GET',
			uri: `/archive/messages/${instanceName}/${encodeURIComponent(String(ef.getNodeParameter('archiveMessageId', 0, '')))}/revisions`,
		},
		receipts: { method: 'GET', uri: `/archive/receipts/${instanceName}` },
		reactions: { method: 'GET', uri: `/archive/reactions/${instanceName}` },
		memberships: { method: 'GET', uri: `/archive/memberships/${instanceName}` },
		calls: { method: 'GET', uri: `/archive/calls/${instanceName}` },
		'sync-gaps': { method: 'GET', uri: `/archive/sync-gaps/${instanceName}` },
		'list-policies': { method: 'GET', uri: '/archive/policies' },
		'put-policy': { method: 'PUT', uri: '/archive/policies' },
		backfill: { method: 'POST', uri: `/archive/backfill/${instanceName}` },
		'preview-purge': { method: 'POST', uri: `/archive/purges/preview/${instanceName}` },
		'confirm-purge': { method: 'POST', uri: '/archive/purges/confirm' },
		tombstones: { method: 'GET', uri: `/archive/purges/tombstones/${instanceName}` },
		verify: { method: 'POST', uri: `/archive/verify/${instanceName}` },
	};
	const selected = map[operation];
	const options: IRequestOptions = { method: selected.method, uri: selected.uri, json: true };
	if (
		[
			'events',
			'messages',
			'contacts',
			'chats',
			'groups',
			'media',
			'receipts',
			'reactions',
			'memberships',
			'calls',
			'sync-gaps',
		].includes(operation)
	) {
		const query = jsonParameter(ef, 'archiveQuery') as IDataObject;
		if (operation === 'events' && ef.getNodeParameter('archiveIncludePayload', 0, false))
			query.includePayload = true;
		options.qs = query;
	}
	if (operation === 'message-revisions' && ef.getNodeParameter('archiveMessageChatJid', 0, '')) {
		options.qs = { chatJid: ef.getNodeParameter('archiveMessageChatJid', 0) };
	}
	if (operation === 'put-policy') {
		options.body = {
			id: ef.getNodeParameter('archivePolicyId', 0, '') || undefined,
			scope: ef.getNodeParameter('archivePolicyScope', 0),
			selector: jsonParameter(ef, 'archivePolicySelector'),
			policy: jsonParameter(ef, 'archivePolicy'),
		};
	}
	if (operation === 'backfill')
		options.body = { limit: ef.getNodeParameter('archiveBackfillLimit', 0) };
	if (operation === 'preview-purge') options.body = jsonParameter(ef, 'archivePurgeCriteria');
	if (operation === 'confirm-purge') {
		options.body = {
			previewId: ef.getNodeParameter('archivePreviewId', 0),
			confirmationToken: ef.getNodeParameter('archiveConfirmationToken', 0),
		};
	}
	return evolutionRequest(ef, options);
}
