// Checked indexed access for noUncheckedIndexedAccess. `at(xs, i)` returns xs[i] or throws, so a broken invariant fails loudly
// where it happens instead of becoming NaN or "undefined" three calls later. Same value as xs[i] whenever the index is in range,
// so seeded runs are unchanged. Use it where the index is meant to be valid; keep `?.`/`??` where absence is a legal state.
export function at<T>(xs: ArrayLike<T>, i: number): T {
  const v = xs[i];
  if (v === undefined) throw new Error(`at(): no element at index ${i} (length ${xs.length})`);
  return v;
}

// Same idea for a string-keyed record: `need(rec, key)` returns rec[key] or throws, so a missing key (a team name that is not in the table)
// fails where it happens. Use it where the key is meant to exist; keep `?.`/`??` where absence is a legal state.
export function need<T>(rec: Readonly<Record<string, T>>, key: string): T {
  const v = rec[key];
  if (v === undefined) throw new Error(`need(): no entry for key "${key}"`);
  return v;
}
