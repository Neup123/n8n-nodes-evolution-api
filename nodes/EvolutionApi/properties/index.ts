import { INodeProperties } from 'n8n-workflow';
import { baileysFields } from './baileys.fields';
import { archiveFields } from './archive.fields';
import { archiveOperations } from './archive.operations';
import { baileysOperations, baileysResourceByGroup } from './baileys.operations';
import { eventsFields as eventsFields } from './events.fields';
import { instancesFields } from './instances.fields';
import { integrationsFields as integrationsFields } from './integrations.fields';
import { messagesFields as messagesFields } from './messages.fields';
import { eventsOperationsOptions } from './events.operations';
import { instancesOperationsOptions } from './instances.operations';
import { integrationsOperationsOptions } from './integrations.operations';
import { messagesOperationsOptions } from './messages.operations';
import { groupsFields } from './groups.fields';
import { groupsOperations } from './groups.operations';
import { chatFields } from './chat.fields';
import { chatOperations } from './chat.operations';
import { profileFields } from './profile.fields';
import { profileOperationsOptions } from './profile.operations';

const resourcesOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Instance',
			value: 'instances-api',
		},
		{
			name: 'Message',
			value: 'messages-api',
		},
		{
			name: 'Group',
			value: 'groups-api',
		},
		{
			name: 'Chat',
			value: 'chat-api',
		},
		{
			name: 'Profile',
			value: 'profile-api',
		},
		{
			name: 'WhatsApp Archive',
			value: 'archive-api',
		},
		{
			name: 'Baileys: Account & Privacy',
			value: baileysResourceByGroup.account,
		},
		{
			name: 'Baileys: Business & Catalog',
			value: baileysResourceByGroup.business,
		},
		{
			name: 'Baileys: Call & Message',
			value: baileysResourceByGroup.messages,
		},
		{
			name: 'Baileys: Community',
			value: baileysResourceByGroup.communities,
		},
		{
			name: 'Baileys: Group',
			value: baileysResourceByGroup.groups,
		},
		{
			name: 'Baileys: Newsletter',
			value: baileysResourceByGroup.newsletters,
		},
		{
			name: 'Baileys: Advanced Protocol',
			value: baileysResourceByGroup.advanced,
		},
		{
			name: 'Event',
			value: 'events-api',
		},
		{
			name: 'Integration',
			value: 'integrations-api',
		},
	],
	default: 'instances-api',
};

export const evolutionNodeProperties = [
	resourcesOptions,
	// Available functions when "Instances" resource is selected
	instancesOperationsOptions,
	// Available functions when "Messages" resource is selected
	messagesOperationsOptions,
	// Available functions when "Groups" resource is selected
	groupsOperations,
	// Available functions when "Events" resource is selected
	eventsOperationsOptions,
	// Available functions when "Integrations" resource is selected
	integrationsOperationsOptions,
	// Available functions when "Profile" resource is selected
	profileOperationsOptions,
	archiveOperations,
	...baileysOperations,
	// Available functions when "Chat" resource is selected
	chatOperations,
	// Available fields when resource and operation are selected
	...instancesFields,
	...messagesFields,
	...groupsFields,
	...eventsFields,
	...integrationsFields,
	...chatFields,
	...profileFields,
	...baileysFields,
	...archiveFields,
];
