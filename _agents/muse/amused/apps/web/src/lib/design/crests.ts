// Team crest data URIs — the package-B Wikipedia flat logo set, lifted from
// Z.ai's w52 (ZPB_LOGOS) with the Owner's blessing (2026-11-01); credit in CHANGELOG.
// Split into crests-{1..4}.ts for transport; framework-free.
import { CRESTS_1 } from './crests-1.ts';
import { CRESTS_2 } from './crests-2.ts';
import { CRESTS_3 } from './crests-3.ts';
import { CRESTS_4 } from './crests-4.ts';

const CRESTS: Record<string, string> = { ...CRESTS_1, ...CRESTS_2, ...CRESTS_3, ...CRESTS_4 };

/** Data-URI crest for a franchise, or null. */
export function crestFor(team: string): string | null {
  return CRESTS[team] ?? null;
}
