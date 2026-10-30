// Numbers shown to the user that carry a display rule from the Owner.
//
// Owner 29 Oct: "Never list the Gone% on the table as 100%. List it as 99% instead. In case there is a slight chance that
// you calculated wrong and that player is available next round." The probability itself is never altered; only what is shown.
export function goneDisplay(probability: number): number {
  if (!Number.isFinite(probability)) throw new Error('goneDisplay: not a number: ' + probability);
  const pct = Math.round(Math.min(1, Math.max(0, probability)) * 100);
  return Math.min(99, pct);
}
