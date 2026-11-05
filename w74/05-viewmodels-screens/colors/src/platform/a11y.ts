// Accessibility bootstrap (w74 item 5h, Z.ai DRAFT — Pickle's idea).
//
// The ask: accessibility state is read ONCE AT BOOT and becomes STATE the screens read — not CSS-only media
// queries. What that means concretely:
//   - main.ts calls readA11yAtBoot() before mount and sets the data attributes on <html> (data-a11y-*), so any
//     screen/VM can branch and any stylesheet can key off them.
//   - CSS media queries stay as the fallback for mid-session OS changes (the boot read is the state; the queries
//     are the live override).
//   - The state is PLAIN DATA (no matchMedia handles leak into app state — appstate.ts forbids DOM handles).
//
// What is read at boot (the set that can change how screens RENDER, not just how they paint):
//   reducedMotion  - prefers-reduced-motion: the draft recap cinematics (P-155) must skip or shorten
//   moreContrast   - prefers-contrast: more / less / custom -> 'more' flips semantic tones to hard colours
//   forcedColors   - forced-colors: active -> the app stops trusting colour alone (tones get text markers)
//   reducedData    - prefers-reduced-data where supported: the feed collapses to drive summaries
//   fontScale      - the user's text-size setting from sim:theme (the one PERSISTED a11y input; read via the
//                    injected getter so this file stays DOM-free except for the boot-time matchMedia reads)
export interface A11yState {
  reducedMotion: boolean;
  moreContrast: 'more' | 'less' | 'custom' | 'no-preference';
  forcedColors: boolean;
  reducedData: boolean;
  fontScale: number;                     // 1 = default; from the theme setting, not the OS
  dataAttributes(): Record<string, string>;
}

export function readA11yAtBoot(themeFontScale: () => number = () => 1): A11yState {
  const q = (qs: string): boolean => (typeof matchMedia === 'function' ? matchMedia(qs).matches : false);
  const contrast = typeof matchMedia === 'function'
    ? (['more', 'less', 'custom'] as const).find((c) => matchMedia(`(prefers-contrast: ${c})`).matches) ?? 'no-preference'
    : 'no-preference';
  const reducedMotion = q('(prefers-reduced-motion: reduce)');
  const forcedColors = q('(forced-colors: active)');
  const reducedData = q('(prefers-reduced-data: reduce)');     // not everywhere; false when unsupported
  const fontScale = themeFontScale();
  return {
    reducedMotion, moreContrast: contrast, forcedColors, reducedData, fontScale,
    dataAttributes: () => ({
      'data-a11y-reduced-motion': String(reducedMotion),
      'data-a11y-contrast': contrast,
      'data-a11y-forced-colors': String(forcedColors),
      'data-a11y-reduced-data': String(reducedData),
      'data-a11y-font-scale': String(fontScale),
    }),
  };
}
