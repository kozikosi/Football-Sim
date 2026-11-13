// Static parity with the other arms: `nuxt generate` prerenders the one page
// into `.output/public` — a fully static folder, no server, no paid anything.
export default defineNuxtConfig({
  compatibilityDate: '2026-11-13',
  devtools: { enabled: false },
  css: ['~/assets/style.css'],
  typescript: {
    tsConfig: {
      // Same strictness profile as arm-vue (strict on, the two indexed-access
      // extras off): the vendored contract's 69 pre-existing full-strict errors
      // are pinned by the contract's own ratchet, not by the arm. Without this,
      // Nuxt 4's defaults (noUncheckedIndexedAccess + exactOptionalPropertyTypes)
      // flag them through the import closure — exclude alone cannot, because
      // imported files enter the program regardless of exclude.
      compilerOptions: { noUncheckedIndexedAccess: false, exactOptionalPropertyTypes: false },
    },
  },
  // The engine contract is vendored TypeScript inside app/ — keep it out of
  // Nuxt's auto-import scanning; every import is explicit (leakage rule).
  imports: { autoImport: false },
});
