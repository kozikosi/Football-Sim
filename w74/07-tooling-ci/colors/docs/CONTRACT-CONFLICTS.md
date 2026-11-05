# CONTRACT-CONFLICTS — the append-only channel (w74 item 7e, GLM's 2c idea)

**The rule.** When a contract is UNBUILDABLE as written — a view-model field the engine cannot produce, a state
the screen cannot render, an action the reducer cannot accept — you do NOT edit the contract in place and you do
NOT work around it silently. You APPEND one line to this file and keep building against your best reading:

```
CONTRACT-CONFLICT: <one screen> | <one reason, quoting the contract> | <one proposed fix> | <your seat, wave>
```

**Why append-only.** A silent in-place edit hides the conflict inside a diff the reviewer must rediscover; an
appended line is the conflict's permanent receipt. The Architect resolves by editing the CONTRACT (with the
conformance test, item 8b), then deletes the line here — never the other way round.

**Sequencing with tsc.** This channel is for cross-layer conflicts the type layer cannot see (that is what
`npm run contract:check` is for). Type errors are not contract conflicts; fix or file them in tsc.

**Current entries (none carried in at cutover — the first entry is the example, do not delete it):**

```
CONTRACT-CONFLICT: (example — keep the shape, delete only when resolved) | DraftBoard | appstate.ts ui.boardSort is EPHEMERAL but the folder-05 slice keeps sort in component state until the whole-app reducer exists | move ui.boardSort into AppState when the reducer lands; the component then reads it from there | Z.ai, w74
```
