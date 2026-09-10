import fs from 'node:fs';

const operationsSource = fs.readFileSync('nodes/EvolutionApi/properties/archive.operations.ts', 'utf8');
const executionSource = fs.readFileSync('nodes/EvolutionApi/execute/archive/archiveOperation.ts', 'utf8');
const mapSource = fs.readFileSync('nodes/EvolutionApi/execute/index.ts', 'utf8');
const documentation = fs.readFileSync('docs/archive.md', 'utf8');
const operations = ['status', 'events', 'messages', 'contacts', 'chats', 'groups', 'media', 'message-revisions', 'receipts', 'reactions', 'memberships', 'calls', 'sync-gaps', 'list-policies', 'put-policy', 'backfill', 'preview-purge', 'confirm-purge', 'tombstones', 'verify'];

for (const operation of operations) {
	if (!operationsSource.includes(`value: '${operation}'`)) throw new Error(`Archive selector is missing ${operation}`);
	if (!executionSource.includes(`${operation}:`) && !executionSource.includes(`'${operation}':`)) throw new Error(`Archive executor is missing ${operation}`);
	if (!mapSource.includes(`'${operation}'`)) throw new Error(`Archive operation map is missing ${operation}`);
}
for (const scope of ['archive:read', 'archive:media', 'archive:export', 'archive:verify', 'archive:policy', 'archive:admin']) {
	if (!documentation.includes(scope)) throw new Error(`Archive node documentation is missing ${scope}`);
}
console.log(`Audited ${operations.length} n8n archive operations successfully.`);
