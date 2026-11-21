import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileAuthSql } from '../scripts/gen-auth-migration.ts';

test('migrations/0002_better_auth.sql is exactly what the installed Better Auth would create (an upgrade that changes the schema fails here)', async () => {
  const committed = readFileSync(new URL('../migrations/0002_better_auth.sql', import.meta.url), 'utf8').replace(/^--.*\n/, '').trim();
  assert.equal(committed, (await compileAuthSql()).trim());
});
