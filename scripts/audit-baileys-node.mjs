import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { EvolutionApiBaileys7 } = require('../dist/nodes/EvolutionApi/EvolutionApiBaileys7.node.js');
const { BAILEYS_METHOD_METADATA } = require('../dist/nodes/EvolutionApi/properties/baileys.metadata.js');
const { executeBaileysMethod, normalizeStringArray } = require('../dist/nodes/EvolutionApi/execute/baileys/invokeBaileys.js');

const properties = new EvolutionApiBaileys7().description.properties;
const failures = [];

for (const [method, definition] of Object.entries(BAILEYS_METHOD_METADATA)) {
	const resource = `baileys-${definition.group}`;
	const selectors = properties.filter(
		(property) => property.name === 'operation' && property.displayOptions?.show?.resource?.includes(resource),
	);
	if (selectors.length !== 1 || !selectors[0].options?.some((option) => option.value === method)) {
		failures.push(`${method}: operation selector is missing from ${resource}`);
	}

	for (const parameter of definition.parameters) {
		const name = `baileys_${method}_${parameter.name}`;
		const fields = properties.filter((property) => property.name === name);
		if (fields.length !== 1) failures.push(`${method}: expected exactly one ${name} field, found ${fields.length}`);
		else if (!fields[0].displayOptions?.show?.operation?.includes(method)) failures.push(`${method}: ${name} has incorrect visibility`);
	}
}

if (failures.length) {
	throw new Error(`Baileys node audit failed:\n${failures.join('\n')}`);
}

const normalized = normalizeStringArray(["[151672961659093@lid]", [["15551234567@s.whatsapp.net"]]]);
if (normalized.join(',') !== '151672961659093@lid,15551234567@s.whatsapp.net') {
	throw new Error(`String-array normalization failed: ${JSON.stringify(normalized)}`);
}

const savedParameters = {
	resource: 'baileys-groups',
	operation: 'groupRequestParticipantsUpdate',
	instanceName: 'test-instance',
	baileys_groupRequestParticipantsUpdate_jid: '120363000000000000@g.us',
	baileys_groupRequestParticipantsUpdate_participants: ['[151672961659093@lid]'],
};
let request;
await executeBaileysMethod({
	getNode: () => ({ name: 'Audit', type: 'CUSTOM.evolutionApiBaileys7', typeVersion: 1, position: [0, 0], parameters: savedParameters }),
	getNodeParameter: (name, _item, fallback) => savedParameters[name] ?? fallback,
	getCredentials: async () => ({ 'server-url': 'https://evolution.example', apikey: 'redacted' }),
	helpers: { request: async (options) => { request = options; return { ok: true }; } },
});
if (
	request?.uri !== 'https://evolution.example/baileys/groups/groupRequestParticipantsUpdate/test-instance'
	|| request?.body?.action !== 'approve'
	|| request?.body?.participants?.[0] !== '151672961659093@lid'
) {
	throw new Error(`Generated execution request is incorrect: ${JSON.stringify(request)}`);
}

console.log(`Audited ${Object.keys(BAILEYS_METHOD_METADATA).length} Baileys operations successfully.`);
