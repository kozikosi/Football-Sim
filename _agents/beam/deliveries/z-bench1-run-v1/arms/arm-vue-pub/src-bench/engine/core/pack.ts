// Model pack (L0 kernel, Phase 0): an immutable bundle of the numbers a sport module's model runs on, plus where they came from.
// The save stores the pack hash, so a league is replayable and a pack change is a visible version bump (design section 4).
// Rules are DATA, not code: overtime format, kickoff rules, penalties on/off, clock rules live in `rules.values` and a pack is
// fitted per rules regime. The kernel does not know what any key means; the sport module reads them.
import { canonicalText } from './events.ts';
import { hash53 } from './hash.ts';

export type Scalar = number | string | boolean;
export type ParamValue = Scalar | readonly Scalar[] | { readonly [key: string]: Scalar | readonly Scalar[] };

export interface Provenance {
  readonly source: string;                                  // where the numbers came from (data set, prior, legacy constant)
  readonly fitDate: string;                                 // ISO date the pack was made
  readonly heldOut?: { readonly [metric: string]: number }; // held-out metrics, when it was fitted
  readonly note?: string;
}
export interface RulesData { readonly sport: string; readonly regime: string; readonly values: { readonly [key: string]: Scalar } }
export interface PackBody {
  readonly schema: 1;
  readonly id: string;                                      // human name, e.g. "nfl-legacy-2026-11"
  readonly rules: RulesData;
  readonly params: { readonly [key: string]: ParamValue };
  readonly provenance: Provenance;
}
export interface ModelPack extends PackBody { readonly hash: string }

export const packHash = (body: PackBody): string => 'pack53:' + hash53(canonicalText(body));

export function makePack(body: PackBody): ModelPack {
  if (body.schema !== 1) throw new Error('makePack: unknown schema ' + String(body.schema));
  if (!body.id) throw new Error('makePack: id is required');
  if (!body.provenance.source) throw new Error('makePack: provenance.source is required (a pack with no origin cannot be audited)');
  return Object.freeze({ ...body, hash: packHash(body) });
}
// True when the stored hash still matches the content (a hand-edited pack fails).
export function verifyPack(p: ModelPack): boolean {
  const { hash, ...body } = p;
  return hash === packHash(body as PackBody);
}
