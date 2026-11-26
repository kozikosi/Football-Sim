// port/numProvenance.ts — the Wave B #2 NUMBER PROVENANCE + HONEST TIES (porca N2, hy4 #6,
// pickle B1). On focus (and long-press on touch), any displayed rating / wins / gone% reveals
// WHERE the number comes from: value → source VM function → engine pin → inputs → rounding —
// all from metadata THE SHELL ALREADY HOLDS. No recomputation, no new numbers (the anti-goal:
// every number is a VM the frozen engine already produces; what this file adds is the NAMING).
//
// The honest-ties rule: the engine may return TRUE ties (identical wins for ranked rows). The
// board's row ORDER then carries no information beyond the engine's stable sort — the UI says so
// (a "tied on wins" note) instead of implying a ranking the engine did not make. And until the
// engine lands rawSort, every ranked visual that displays a value rounded for display carries
// the INTERIM — display-rounded note at the point of use (the work order's rule).
//
// LAW (node battery N-prov-*): provenanceFor covers every displayed numeric field of the board
// row; every line names the pin from SNAPSHOT.md — never a hardcoded literal (the same pin the
// seam reads); the rounding note matches the field's actual display transform in display.ts.

export interface ProvenanceInput {
  field: 'ovr' | 'wins' | 'priority' | 'gone';
  value: string | number;                       // the DISPLAYED value (already engine-rounded)
  rawWins?: string | number;                    // the row's own wins AS DISPLAYED (the ranking unit)
  neighbourWins?: (string | number)[];          // the OTHER rows' wins AS DISPLAYED — ties compare
  //   DISPLAY STRINGS (equal strings ⇒ the engine printed the same value), never parsed numbers:
  //   the W2b law forbids deriving logic from display text, including here.
  oddsMeta?: { picksBetween: number; sims: number } | null;
  pin: string;                                  // read from SNAPSHOT.md once at boot — never inline
}

const SRC: Record<ProvenanceInput['field'], string> = {
  ovr: 'boardVM row .ovr ← engine players.ts ratings (never ranked by)',
  wins: 'boardVM row .wins ← engine value.ts slotWins (the ranking unit)',
  priority: 'boardVM row .priority ← engine value.ts (the ranking unit while the Priority sort is on)',
  gone: 'goneOdds(...) ← engine goneodds.ts CPU replay',
};

const ROUNDING: Record<ProvenanceInput['field'], string> = {
  ovr: 'displayed as the engine shows it (integer)',
  wins: 'displayed as the engine shows it (one decimal where the engine prints one)',
  priority: 'displayed as the engine shows it',
  gone: 'display-rounded to a whole percent — INTERIM — display-rounded (the raw value is the engine\'s; rawSort is filed with the Architect)',
};

export function provenanceFor(i: ProvenanceInput): string {
  const parts = [
    `${i.field.toUpperCase()} ${i.value} — source: ${SRC[i.field]} · engine pin ${i.pin}`,
  ];
  if (i.field === 'gone') {
    parts.push(i.oddsMeta
      ? `inputs: the ${i.oddsMeta.picksBetween} picks between now and your turn, replayed ${i.oddsMeta.sims} times with the real CPU logic`
      : 'inputs: no CPU replay while the CPU is on the clock');
    parts.push(ROUNDING.gone);
  } else {
    parts.push(`inputs: the madden27 ratings pool at the frozen snapshot (no UI math — the VM is the engine's)`);
    parts.push(ROUNDING[i.field]);
  }
  if (i.field === 'wins' && Array.isArray(i.neighbourWins) && i.neighbourWins.length > 0 && i.rawWins !== undefined) {
    const me = String(i.rawWins);
    const tied = i.neighbourWins.filter((w) => String(w) === me).length;
    if (tied > 0) parts.push(`GENUINE TIE: ${tied} other row${tied === 1 ? '' : 's'} share these exact wins — the order here is the engine's stable sort, not a ranking`);
  }
  return parts.join(' · ');
}
