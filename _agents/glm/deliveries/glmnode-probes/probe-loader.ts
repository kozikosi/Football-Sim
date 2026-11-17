// probe: the loader's refusals (council GLM, 2026-11-17)
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
const base = JSON.parse(fs.readFileSync(new URL('../../data/packs/nfl-passclass-fit2023-2025.json', import.meta.url), 'utf8'));
const t = (name: string, mut: (b: typeof base) => void): void => {
  const b = JSON.parse(JSON.stringify(base)); mut(b);
  try { loadPassClass(makePack(b)); console.log(name, 'ACCEPTED  <-- BAD'); }
  catch (e) { console.log(name, 'refused:', (e as Error).message); }
};
t('minClassPool 0', (b) => { b.rules.values.minClassPool = 0; });
t('wrong feature list', (b) => { b.params.features[4] = 'yd100'; });
t('wrong class order', (b) => { b.params.classes = ['comp', 'sack', 'inc', 'int']; });
t('coef 3 rows', (b) => { b.params.coef.pop(); });
t('null in intercept', (b) => { b.params.intercept[1] = null; });
t('negative lambda', (b) => { b.params.lambda = -0.5; });
t('non-number coef cell', (b) => { b.params.coef[2][7] = 'x'; });
