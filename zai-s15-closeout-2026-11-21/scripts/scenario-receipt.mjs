#!/usr/bin/env node
import { createServer } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const seedArg = process.argv.find((arg) => arg.startsWith('--seed='));
const seed = seedArg ? Number(seedArg.slice('--seed='.length)) : 935613;
if (!Number.isSafeInteger(seed) || seed < 1 || seed > 2_147_483_647) {
  throw new Error('--seed must be an integer from 1 through 2147483647');
}

const server = await createServer({
  root,
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});

try {
  const scenarios = await server.ssrLoadModule('/src/lib/dev/scenario.ts');
  const receipts = [];
  for (const scenarioId of scenarios.SCENARIO_IDS) {
    const snapshot = scenarios.createScenario(seed, scenarioId);
    receipts.push(await scenarios.createScenarioReceipt(snapshot));
  }
  process.stdout.write(JSON.stringify({
    manifestSchema: 1,
    seed,
    scenarios: receipts,
  }, null, 2) + '\n');
} finally {
  await server.close();
}
