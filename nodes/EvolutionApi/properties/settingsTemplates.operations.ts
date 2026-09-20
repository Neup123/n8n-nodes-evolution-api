import { INodeProperties } from 'n8n-workflow';
export const settingsTemplatesOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['settings-templates-api'] } },
	default: 'list',
	options: [
		{ name: 'Create', value: 'create', action: 'Create a settings template' },
		{ name: 'Edit', value: 'edit', action: 'Edit a settings template' },
		{ name: 'Duplicate', value: 'duplicate', action: 'Duplicate a settings template' },
		{ name: 'Delete', value: 'delete', action: 'Delete a settings template' },
		{ name: 'List', value: 'list', action: 'List settings templates' },
		{ name: 'Assign', value: 'assign', action: 'Assign a settings template' },
		{ name: 'Unassign', value: 'unassign', action: 'Unassign a settings template' },
		{ name: 'Bindings', value: 'bindings', action: 'List template bindings' },
	],
};
