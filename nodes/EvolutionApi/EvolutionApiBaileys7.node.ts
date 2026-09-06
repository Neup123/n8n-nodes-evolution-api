import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionNodeProperties } from './properties';
import { resourceOperationsFunctions } from './execute';

export class EvolutionApiBaileys7 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution API (Baileys 7 English)',
		name: 'evolutionApiBaileys7',
		icon: 'file:evolutionapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Manage WhatsApp instances and run guided Evolution API and Baileys 7 operations',
		defaults: { name: 'Evolution API (Baileys 7 English)' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'evolutionApi', required: true }],
		properties: evolutionNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const savedParameters = this.getNode().parameters as Record<string, unknown>;
		const resource = savedParameters.resource as string | undefined;
		const operation = savedParameters.operation as string | undefined;
		if (!resource || !operation) {
			throw new NodeApiError(this.getNode(), {
				message: 'Resource or operation is missing',
				description: 'Open this node, select its resource and operation again, then save the workflow.',
			});
		}
		const fn = resourceOperationsFunctions[resource]?.[operation];
		if (!fn) {
			throw new NodeApiError(this.getNode(), {
				message: 'Operation not supported',
				description: `The operation "${operation}" is not available for the resource "${resource}"`,
			});
		}
		const responseData = await fn(this);
		return [this.helpers.returnJsonArray(responseData)];
	}
}
