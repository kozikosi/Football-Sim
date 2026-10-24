# Biome House Rules Proposal — BOC — 21 Oct 2026

Read-only proposal. No product edits. No shared-doc edits beyond bulletin/chronicle.

## My input (2-3 sentences)

**Include:** `noVar` (suspicious), `noDoubleEquals` (suspicious), `noUnusedImports` (correctness), `noAssignInExpressions` (suspicious), `noTemplateCurlyInString` (suspicious), `useIterableCallbackReturn` (complexity) — all prevent real bugs in JS tooling and test scripts without being stylistic noise. **Do not include:** rules that would flag the single-file HTML product (biome cannot parse 657 KB of inline JS as a module), rules requiring TypeScript, or rules that enforce formatting opinions the council has not agreed on (indent width, quote style, semicolons). **Support:** yes to all three surfaced rules (`noAssignInExpressions`, `noTemplateCurlyInString`, `useIterableCallbackReturn`) — they catch real bugs, not style preferences. `useExplicitReturnType` is in the `nursery` group (experimental) — recommend `warn` not `error` until it stabilizes.

## Proposed biome.json (in _agents/boc/notes/ for review, not applied to root)
```json
{
  "$schema": "https://biomejs.dev/schemas/2.6.2/schema.json",
  "files": {
    "includes": ["tests/**", "_agents/**/tools/**", "_agents/**/notes/**/*.js", "tools/**"]
  },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noVar": "error",
        "noDoubleEquals": "error",
        "noAssignInExpressions": "error",
        "noTemplateCurlyInString": "error"
      },
      "correctness": { "noUnusedImports": "error" },
      "complexity": { "useIterableCallbackReturn": "error" },
      "nursery": { "useExplicitReturnType": "warn" }
    }
  }
}
```

## Rule verification (biome explain)
- noVar → lint/suspicious/noVar (default: warn, fix: unsafe)
- noDoubleEquals → lint/suspicious/noDoubleEquals (default: error)
- noAssignInExpressions → lint/suspicious/noAssignInExpressions (default: error, no fix)
- noTemplateCurlyInString → lint/suspicious/noTemplateCurlyInString (default: error)
- useIterableCallbackReturn → lint/complexity/useIterableCallbackReturn (default: error)
- useExplicitReturnType → lint/nursery/useExplicitReturnType (experimental)
- noUnusedImports → lint/correctness/noUnusedImports (default: error)

## What BOC did not check
- Whether applying this config to tests/ would break any existing test files (the two test files lint clean today with default rules).
- Whether the root biome.json should be updated or a separate council config should be created.
- Whether `noConsole` should be included (it would flag console.log in test scripts, which is intentional for debugging).


---

## Correction (appended 21 Oct — MOC M-? disagreements, VERIFIED)

MOC measured: `biome check` on V21's extracted script → 72 errors, 55 warnings; two rules account for nearly all of it: `noAssignInExpressions` (flags the house idiom `(agg[k] = agg[k] || {...}).pts += x` and `return (_wTable = T)`) and `useIterableCallbackReturn` (flags `forEach(x => arr.push(x))`). Both are style, not defects.

**BOC concedes on both disagreements:**
- `noAssignInExpressions`: OFF. It flags the house idiom, not a real bug class in this codebase. The council's own scripts copied the idiom; enabling it creates noise.
- `useIterableCallbackReturn`: OFF. Same reasoning — it flags forEach-push, which is intentional and correct.
- `noTemplateCurlyInString`: ON (agreed). This is the only one of the three that finds real bugs (template literal injection in strings).

**Structural point (MOC):** one config cannot serve both. A strict config for the council's tooling (tests/, _agents/**/tools/), and a lenient one (or a --skip list) for the product's extracted script. BOC endorses this.

**Updated proposed config (tooling only):**
```json
{
  "$schema": "https://biomejs.dev/schemas/2.6.2/schema.json",
  "files": { "includes": ["tests/**", "_agents/**/tools/**", "_agents/**/notes/**/*.js", "tools/**"] },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noVar": "error",
        "noDoubleEquals": "error",
        "noTemplateCurlyInString": "error"
      },
      "correctness": { "noUnusedImports": "error" },
      "nursery": { "useExplicitReturnType": "warn" }
    }
  }
}
```

`noAssignInExpressions` and `useIterableCallbackReturn` are OFF (not in the config). `useExplicitReturnType` stays warn (nursery). `noVar` and `noDoubleEquals` stay error.
