import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';
import { evolutionRequest } from '../evolutionRequest';
function parseJson(value: unknown, label: string) {
	if (typeof value !== 'string') return value;
	try {
		return JSON.parse(value);
	} catch {
		throw new Error(`${label} must be valid JSON`);
	}
}
export async function settingsTemplateOperation(ef: IExecuteFunctions) {
	try {
		const operation = ef.getNodeParameter('operation', 0) as string;
		const instanceName = ef.getNodeParameter('instanceName', 0, '') as string;
		const templateId = ef.getNodeParameter('templateId', 0, '') as string;
		const name = ef.getNodeParameter('templateName', 0, '') as string;
		const rawSettings = ef.getNodeParameter('templateSettings', 0, '') as string;
		const scope = ef.getNodeParameter('templateScope', 0, 'instance') as string;
		const target = ef.getNodeParameter('templateTarget', 0, '') as string;
		const routes: Record<
			string,
			{ method: IHttpRequestMethods; uri: string; body?: Record<string, unknown> }
		> = {
			create: {
				method: 'POST',
				uri: '/settings-template/create',
				body: { name, settings: parseJson(rawSettings, 'Settings') },
			},
			edit: {
				method: 'POST',
				uri: '/settings-template/edit',
				body: {
					templateId,
					...(name ? { name } : {}),
					...(rawSettings ? { settings: parseJson(rawSettings, 'Settings') } : {}),
				},
			},
			duplicate: {
				method: 'POST',
				uri: '/settings-template/duplicate',
				body: { templateId, name },
			},
			delete: { method: 'DELETE', uri: '/settings-template/delete', body: { templateId } },
			list: { method: 'GET', uri: '/settings-template/list' },
			assign: {
				method: 'POST',
				uri: `/settings-template/assign/${instanceName}`,
				body: { templateId, scope, ...(target ? { target } : {}) },
			},
			unassign: {
				method: 'DELETE',
				uri: `/settings-template/unassign/${instanceName}`,
				body: { scope, ...(target ? { target } : {}) },
			},
			bindings: { method: 'GET', uri: `/settings-template/bindings/${instanceName}` },
		};
		const route = routes[operation];
		if (!route) throw new Error(`Unsupported settings-template operation: ${operation}`);
		const options: IRequestOptions = {
			method: route.method,
			uri: route.uri,
			...(route.body ? { body: route.body } : {}),
			json: true,
		};
		return { json: { success: true, data: await evolutionRequest(ef, options) } };
	} catch (error) {
		if (!ef.continueOnFail()) throw new NodeOperationError(ef.getNode(), error as Error);
		return { json: { success: false, error: { message: (error as Error).message } } };
	}
}
