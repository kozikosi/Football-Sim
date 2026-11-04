// Numbers shown to the user that carry a display rule from the Owner.
//
// Owner 29 Oct: "Never list the Gone% on the table as 100%. List it as 99% instead. In case there is a slight chance that
// you calculated wrong and that player is available next round." The probability itself is never altered; only what is shown.
export function goneDisplay(probability: number): number {
  if (!Number.isFinite(probability)) throw new Error('goneDisplay: not a number: ' + probability);
  const pct = Math.round(Math.min(1, Math.max(0, probability)) * 100);
  return Math.min(99, pct);
}

// Owner 29 Oct: "All numbers on the entire project should be represented as integers to the user except for QBR, WINS
// (which should really only be a part of the draft board), and Priority which these three can go to one decimal place."
// Every number the UI prints goes through one of these. The engine keeps full precision; only the text is rounded.
// Half rounds away from zero (so -2.5 and 2.5 are the same size), and a value that rounds to zero never prints as "-0".
export function showInt(n: number): string {
  if (!Number.isFinite(n)) throw new Error('showInt: not a number: ' + n);
  const r = Math.sign(n) * Math.round(Math.abs(n));
  return String(r === 0 ? 0 : r);
}
export type OneDecimalKind = 'qbr' | 'wins' | 'priority';
export const ONE_DECIMAL_KINDS: readonly OneDecimalKind[] = ['qbr', 'wins', 'priority'];
export function showDecimal(_kind: OneDecimalKind, n: number): string {
  if (!Number.isFinite(n)) throw new Error('showDecimal: not a number: ' + n);
  const r = Math.sign(n) * Math.round(Math.abs(n) * 10) / 10;
  return (r === 0 ? 0 : r).toFixed(1);
}
