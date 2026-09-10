import { INodeProperties } from 'n8n-workflow';

export const archiveOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['archive-api'] } },
	options: [
		{ name: 'Archive Status', value: 'status', action: 'Read archive status' },
		{ name: 'Search Events', value: 'events', action: 'Search archive events' },
		{ name: 'Search Messages', value: 'messages', action: 'Search archived messages' },
		{ name: 'Search Contacts', value: 'contacts', action: 'Search archived contacts' },
		{ name: 'Search Chats', value: 'chats', action: 'Search archived chats' },
		{ name: 'Search Groups', value: 'groups', action: 'Search archived groups' },
		{ name: 'Search Media', value: 'media', action: 'Search archive media' },
		{
			name: 'Message Revision History',
			value: 'message-revisions',
			action: 'Read message revision history',
		},
		{ name: 'Search Receipts', value: 'receipts', action: 'Search message receipt history' },
		{ name: 'Search Reactions', value: 'reactions', action: 'Search message reaction history' },
		{
			name: 'Search Group Memberships',
			value: 'memberships',
			action: 'Search group membership history',
		},
		{ name: 'Search Calls', value: 'calls', action: 'Search call history' },
		{ name: 'Search Sync Gaps', value: 'sync-gaps', action: 'Search known synchronization gaps' },
		{ name: 'List Policies', value: 'list-policies', action: 'List archive policies' },
		{
			name: 'Create or Version Policy',
			value: 'put-policy',
			action: 'Create or version an archive policy',
		},
		{
			name: 'Backfill Existing Database',
			value: 'backfill',
			action: 'Backfill existing operational data',
		},
		{ name: 'Preview Purge', value: 'preview-purge', action: 'Preview an archive purge' },
		{ name: 'Confirm Purge', value: 'confirm-purge', action: 'Confirm an archive purge' },
		{ name: 'List Purge Tombstones', value: 'tombstones', action: 'List archive purge tombstones' },
		{ name: 'Verify Integrity', value: 'verify', action: 'Verify archive integrity' },
	],
	default: 'status',
};
