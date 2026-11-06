// Checked indexed access for noUncheckedIndexedAccess. `at(xs, i)` returns xs[i] or throws, so a broken invariant fails loudly
// where it happens instead of becoming NaN or "undefined" three calls later. Same value as xs[i] whenever the index is in range,
// so seeded runs are unchanged. Use it where the index is meant to be valid; keep `?.`/`??` where absence is a legal state.
export function at<T>(xs: ArrayLike<T>, i: number): T {
  const v = xs[i];
  if (v === undefined) throw new Error(`at(): no element at index ${i} (length ${xs.length})`);
  return v;
}
