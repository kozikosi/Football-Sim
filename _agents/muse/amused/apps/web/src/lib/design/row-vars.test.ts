// Pin tests for row-vars.ts. The full var-by-var verification against the w52
// originals (zpbRowVars/zpbNeutralRowVars/zpbAnchorVars, all 32 teams, 1,440
// values, 0 mismatches) was run 2026-11-01 via /tmp/verify_rv6.mjs; these pins
// guard against regressions. Run: node --experimental-strip-types row-vars.test.ts
import { strict as assert } from 'node:assert';
import { rowVars, neutralRowVars, anchorVars, lift } from './row-vars.ts';
import { packFor } from './team-pack.ts';

const KC = 'Kansas City Chiefs';

// lift: the w13 lightness floor
assert.equal(lift('#000000', 0.5), '#808080');
assert.equal(lift('#ffffff', 0.5), '#ffffff');

// rowVars: shape + key pins (KC)
const rv = rowVars(KC);
const pk = packFor(KC).vars;
assert.equal(rv['--zrb'], pk['--tA']);
assert.equal(rv['--zrbd'], pk['--tAd']);
assert.equal(rv['--tn'], pk['--tTxM']);
assert.equal(rv['--tnd'], pk['--tTxd']);
assert.equal(rv['--nm'], pk['--tTxM']);
assert.match(rv['--zr1'], /^rgba\(/);
assert.equal(Object.keys(rv).length, 19);

// neutralRowVars: neutral ink, --zn flag
const nv = neutralRowVars(KC);
assert.equal(nv['--zn'], '1');
assert.equal(nv['--tn'], pk['--tTxM']);
assert.equal(nv['--tnd'], pk['--tTxd']);

// anchorVars: six vars, face lighter than back in light mode
const av = anchorVars(KC);
for (const k of ['--anchF', '--anchB', '--anchI', '--anchFd', '--anchBd', '--anchId']) {
  assert.match(av[k], /^#[0-9a-f]{6}$/, k);
}

// unknown team -> empty maps
assert.deepEqual(rowVars('Nope'), {});
assert.deepEqual(neutralRowVars('Nope'), {});
assert.deepEqual(anchorVars('Nope'), {});

console.log('row-vars pin tests pass');
