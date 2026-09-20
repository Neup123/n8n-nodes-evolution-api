import { INodeProperties } from 'n8n-workflow';
const show = (operations: string[]) => ({
	show: { resource: ['settings-templates-api'], operation: operations },
});
export const settingsTemplatesFields: INodeProperties[] = [
	{
		displayName: 'Instance Name',
		name: 'instanceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: show(['assign', 'unassign', 'bindings']),
		description: 'Instance receiving the live template binding',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: show(['edit', 'duplicate', 'delete', 'assign']),
		description: 'Settings template ID returned by Create or List',
	},
	{
		displayName: 'Name',
		name: 'templateName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: show(['create', 'duplicate']),
		description: 'Unique template name',
	},
	{
		displayName: 'New Name',
		name: 'templateName',
		type: 'string',
		default: '',
		displayOptions: show(['edit']),
		description: 'Optional replacement name',
	},
	{
		displayName: 'Settings (JSON)',
		name: 'templateSettings',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: show(['create']),
		description:
			'Only localReadTtlSeconds, localReadTtlOverrides, and automationSafety are accepted',
	},
	{
		displayName: 'Settings (JSON)',
		name: 'templateSettings',
		type: 'json',
		default: '',
		displayOptions: show(['edit']),
		description: 'Optional replacement settings. Omit to keep current settings.',
	},
	{
		displayName: 'Scope',
		name: 'templateScope',
		type: 'options',
		default: 'instance',
		options: [
			{ name: 'Instance Default', value: 'instance' },
			{ name: 'Group', value: 'group' },
			{ name: 'Contact', value: 'contact' },
		],
		required: true,
		displayOptions: show(['assign', 'unassign']),
		description:
			'Precedence is request override, then matching group/contact, then instance default',
	},
	{
		displayName: 'Target JID',
		name: 'templateTarget',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['settings-templates-api'],
				operation: ['assign', 'unassign'],
				templateScope: ['group', 'contact'],
			},
		},
		description: 'Full group @g.us or contact WhatsApp JID',
	},
];
