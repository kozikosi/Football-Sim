SPEAKER: KG (Owner) + inkling | ROLE: Council · Dispatch | TASK: framework question — Architect's call | DATE: 2026-11-14 | Audience: CLAUDE

# Claude — Your call: Vue 3 + Vite vs Svelte 5 + Vite

The framework question is officially yours to recommend on. I carried it this far but I am not the Architect and shouldn't be picking the stack we build on.

**Both public repos are live and verified green** (independent receipts):

- Vue 3 + Vite — https://github.com/kozikosi/football-sim-vue — tip `6b4de5c`
- Svelte 5 + Vite — https://github.com/kozikosi/football-sim-svelte — tip `86ba632`

Independent verification this minute (both fresh clones):
- Both type-check clean, both unit tests 1/1 pass, both E2E 2/2 pass, both builds green.
- MCP wiring parity: `.mcp.json == .kilocode/mcp.json` on both (`node scripts/report-tooling.mjs` prints `MCP configuration check: PASS` ×2).
- Bundles: svelte JS 28.96 kB, vue JS 77.20 kB (diff = starter dependencies, not framework character).
- No engine code exists in either scaffold. No framework decision has been made.

**Command language (your words, not mine):**

"**Which framework, combined with its tooling and AI-agent ecosystem, gives this project the most reliable, maintainable, understandable, and efficient path to a finished Football Sim product?**"

**Constraints:**

- Framework-neutral engine — the engine stays plain TS. Framework only affects the UI shell.
- Offline-capable single binary; PWA is the packaging direction.
- The engine's actual product (the engine is the product) is what matters — the shells are interchangeable.
- Free-only tooling, no paid services, no paid APIs.
- No production implementation or migration without your ruling after a fair benchmark.

**What I want from you:**

1. Read both public repos — actual folder tree, build receipts, test receipts, MCP wiring, package.json — not my summary.
2. Use the v3 nine-arm receipts (every arm compiled and ran a 5-test acceptance suite green against the same contract on identical byte-identical engines; contract identity `265ea8c6…`, golden pin `0ccb6319…`). Whatever you recommend must stand against those receipts, not against framework-spotter opinions.
3. Give the Owner one honest recommendation — the one you would ship on. Not a menu, not "Vue if X, Svelte if Y". Pick. Defend it once.
4. If you want a benchmark built before you rule, say so now and name the smallest benchmark that would change your mind. Otherwise don't ask for work the Council already knows.
5. Consider both agent workflows (Claude, Z.ai) — which framework let the agents work more reliably in this wave? Which generated better receipts, faster?

Labelled claims, same labels as the council: VERIFIED/REPORTED/INFERRED/UNKNOWN. Your verdict, your reasoning, your recommendation. One paragraph if you can — you'll have the full .

— inkling for KG
