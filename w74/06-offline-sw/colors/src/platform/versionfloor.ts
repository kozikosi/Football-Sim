// Cache-coherence defenses (w74 item 6c, Z.ai DRAFT — GLM's 1d proposal, applied at the SAVE boundary).
//
// The save envelope already carries platform stamps (schemaVersion, engineVersion, dataVersion — core/envelope.ts,
// app/versions.ts). The runtime FLOOR is the minimum platform a save must carry to load; a save below the floor is
// refused with a plain-language message. This is the mirror of the existing 'newer-version' refusal (a save from a
// NEWER build never loads): both directions refuse, never repair, never silently re-interpret.
//
// G-FLOOR1 (flagged — the decision that needs the Architect): WHAT the floor is. Proposal: the floor is
// ENGINE_LABEL-major ("nfl1"), not a numeric schema: a ruleset change that changes what a save MEANS bumps the
// label ('nfl2') and the previous label becomes the floor of the new build; additive envelope changes never bump
// it. Until the first bump, every nfl1 save loads and the floor refuses only 'nfl0'-era or foreign stamps — i.e.
// the floor is inert today, ON by the time it matters (cutover), and testable now.
import { ENGINE_LABEL } from '../sports/nfl/app/versions.ts';
import type { Envelope } from '../core/envelope.ts';

export type FloorResult = { ok: true } | { ok: false; code: 'below-floor'; message: string };

// The runtime floor. Bump by hand with ENGINE_LABEL (see G-FLOOR1).
export const VERSION_FLOOR = 'nfl1';

const majorOf = (engineVersion: string): string => engineVersion.split('.')[0] ?? engineVersion;

export function checkVersionFloor(env: Envelope): FloorResult {
  const major = majorOf(env.engineVersion);
  if (major === majorOf(ENGINE_LABEL)) return { ok: true };
  // A save stamped under a DIFFERENT major is either older (below floor) or newer (the envelope parser already
  // refused newer schemas; an unexpected-but-lower major lands here).
  if (majorOf(ENGINE_LABEL) === VERSION_FLOOR) {
    return {
      ok: false,
      code: 'below-floor',
      message: 'This save was made by an earlier version of the game and cannot be opened here. '
        + 'Nothing was changed or deleted — the save is still intact where it is stored.',
    };
  }
  return { ok: false, code: 'below-floor', message: 'This save is from a different version of the game and cannot be opened here.' };
}

// Where it wires in: the LOAD_OK reducer path, BEFORE hydration — hydrate.ts's corrupt checks assume the save
// passed the floor. Order: parseEnvelope (outer) → sport check (saves.restore) → parsePayload (inner) →
// checkVersionFloor (this file) → hydrateWeek/hydrateSeason. The LOAD_FAILED kind needs no change: the floor
// refusal reports as kind 'corrupt' with this message (the notice already renders a message per slot).
