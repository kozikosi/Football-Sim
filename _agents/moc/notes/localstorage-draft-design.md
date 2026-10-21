# V22 item (b) — the draft survives a refresh: localStorage design

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: design and serializability assessment | DATE: 2026-10-21T10:50:00Z**

**Build:** V21 — `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`. Single file, **no build step**, so the persistence must be plain `localStorage` and must survive the file being reopened from a different path.

## 1 · The design decision that matters: persist the *decisions*, not the *data*

There are two ways to persist a draft in progress.

**(A) Persist the whole state object** — `draftSim` with its `pool`, `rosters`, `order`, `pos`, `log`, `userIndex`, `awaitingUser`. Simple, and it restores exactly.

**(B) Persist only the decisions** — the ordered list of picks (player, team, slot), the user's own choices (team, weights, the settings), and where the draft stood (whose turn, which pick number). Everything else is **re-derived** from the build on load.

**I recommend (B), and the reason is a correctness one, not a tidiness one.** The pool is the build's player data: if the ratings change between the refresh and the restore, a state persisted under (A) would bring back **stale ratings** — the user would draft against a pool the build no longer has, and the numbers on the board would disagree with every other view. Under (B) the past picks stay (they are facts: "pick 14 was Cooper DeJean to the Rams at CB1") and the future is computed from the **current** build. The cost of (B) is that a restored draft may be internally inconsistent — a player whose rating changed is still on the board at his old rating if he was not yet picked; that is a **reconcilable** problem (a validation pass on restore) rather than a silent one.

**Under (B) the persisted payload is small and human-readable** — a few hundred bytes of picks — which also matters because `localStorage` is per-origin and a file:// page's origin is fragile.

## 2 · What to persist

| field | what | why |
|---|---|---|
| `v` | **schema version** (integer) | a payload from an older shape must be discarded, not half-read |
| `build` | the build hash the draft was started under | a draft started under a different build may not be restorable — see §5 |
| `team` | the user's team name (and its pick index) | the pick order is derived from it |
| `weights` | the weights in force, if the user changed them | otherwise the restored draft silently reverts to the model weights |
| `settings` | the user's other choices (filter, view mode, position chips) | cheap to store, and their absence is jarring |
| `picks` | the ordered list of picks made so far: `{round, team, player, slot}` | **the decision log** — this is the draft |
| `turn` | whose turn it is, and the pick number within the round | where the draft stood |
| `pending` | the user's own pending choice, if any | so a half-made pick is not lost |

**Explicitly NOT persisted:** the `pool` (1,200+ NFL players; re-derived), the rosters (re-derived from the picks), the `order` and `pos` maps (re-derived), the `log` of CPU reasoning (a transcript, not a decision — re-derived), any DOM reference, any function, any closure.

## 3 · When to write

- **after every pick** (the user's and the CPU's) — the pick log is the only thing that must never be lost;
- **when the user's turn state changes** (a pick made, a chip toggled, a slot chosen);
- **not** on every render — writing on every keystroke in the weights panel would be wasteful and can corrupt a payload mid-write.

The write is one `setItem` with a JSON string: cheap enough to do per pick, and atomic from the reader's point of view (`setItem` is synchronous in the same tab).

## 4 · The key, and how to restore

**Key:** `nfl-draft-sim.draft.v1` — namespaced, versioned in the key itself so a future schema change can use `.v2` and ignore the old one.

**Restore, on load, before `processUntilUserTurn`:**

1. read the key; if absent → a fresh draft (no error, no notice beyond the normal onboarding);
2. `JSON.parse` inside a `try/catch`; on a parse failure → **discard the payload** (remove the key) and start fresh;
3. check `v` and `build`; on a mismatch → **discard**, and say so in one line ("a draft from an older build was found and not restored");
4. **validate the picks against the current pool**: for each recorded pick, the player must still exist in the pool at that team and at a slot that team still needs. A pick that no longer validates is the one real conflict case — the honest handling is to **stop the restore at the last valid pick** and tell the user where it stopped, rather than silently dropping a pick;
5. re-derive the pool, the rosters, the order and the CPU's valuation from the current build, then **replay the recorded picks** in order (a pick is a pick: take the player, fill the slot) — this reproduces the draft exactly up to where it stopped;
6. resume the normal flow at `turn`.

**The key subtlety:** the CPU's future picks are *not* re-derived from a seed — the build has 58 unseeded `Math.random()` sites, so a replayed draft will **not** continue identically to the original run. That is fine: the draft **continues**, it does not repeat. The already-made picks are preserved as facts; the picks still to come are drawn fresh. This should be stated to the user plainly ("the picks already made are kept; the rest of the draft is simulated afresh") — pretending otherwise would be a false promise.

## 5 · Failure modes

| failure | detection | handling |
|---|---|---|
| corrupt / truncated JSON | `JSON.parse` throws | discard the payload, start fresh, one line of notice |
| payload from an older schema | `v` mismatch | discard, notice |
| payload from a different build | `build` mismatch | discard, notice — the pool may differ too much to replay |
| a recorded pick is no longer valid | validation pass | **stop at the last valid pick**, tell the user where it stopped |
| `localStorage` unavailable (private mode, a `file://` origin in some browsers, a quota of 0) | a write throws | **the draft must still work**: catch the write, set a flag "this draft will not survive a refresh", and carry on silently otherwise |
| the payload is too large | the write throws `QuotaExceededError` | with §2's design this cannot happen (a few hundred bytes); if it did, drop the optional fields and retry once |
| two tabs open with the same draft | a `storage` event | the second tab should **not** silently overwrite: warn, and let the user choose which to keep |

## 6 · Serializability assessment

**Serialisable (plain data, survives `JSON.stringify`):** `userIndex` ✓, the rosters' slot→player maps ✓, the pool ✓ *if stored as plain objects/arrays* — but it is **re-derived instead**, per §1; the pick `order` ✓, the position `pos` map ✓, the pick `log` ✓, `awaitingUser` ✓, and the user's settings ✓.

**Not serialisable:** DOM references (a node is not JSON), functions and methods, event listeners, closures, `Map`/`Set` (JSON turns them into `{}` — they must be converted to plain objects or arrays on the way in and back on the way out), `undefined` (it disappears), `NaN`/`Infinity` (they become `null`), `Date` objects (they become ISO strings), and any circular reference — **the pool and the rosters must be checked for cycles before storing them**, because a cycle makes `JSON.stringify` throw and the write silently fails.

The one that bites in practice: the `pool` and the rosters may hold **references back to their parent** (a player object pointing at its team, a team pointing at its players). A naive `JSON.stringify` of the whole draft then throws and **nothing is saved** — which is the failure the Owner would experience as "the draft still forgets everything", with no error to show for it. Either store the decision log only (§1), or deep-copy into plain structures first.

## 7 · The shape of the code (for Claude)

```js
const DRAFT_KEY = 'nfl-draft-sim.draft.v1';
const DRAFT_SCHEMA = 1;

// save: build a small payload of decisions only
function saveDraft(){
  try{
    const payload = {
      v: DRAFT_SCHEMA,
      build: BUILD_HASH,          // the V21 hash, so a mismatched build is discarded
      team: userTeamName,
      weights: {...weights},      // only if the user changed them
      settings: {...userSettings},
      picks: draftSim.log.map(p=>({r:p.round, t:p.team, p:p.player, s:p.slot})),  // decisions only
      turn: draftSim.userIndex
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  }catch(e){
    draftPersistOk = false;       // the draft still works; it just will not survive a refresh
  }
}

// restore: read, validate, replay
function restoreDraft(){
  let raw = null;
  try{ raw = localStorage.getItem(DRAFT_KEY); }catch(e){ return false; }
  if(!raw) return false;
  let p = null;
  try{ p = JSON.parse(raw); }catch(e){ try{ localStorage.removeItem(DRAFT_KEY); }catch(_){} return false; }
  if(!p || p.v !== DRAFT_SCHEMA || p.build !== BUILD_HASH){ try{ localStorage.removeItem(DRAFT_KEY); }catch(_){} return false; }
  // validate each recorded pick against the CURRENT pool, then replay
  const valid = [];
  for(const rec of p.picks||[]){ if(pickIsStillValid(rec)) valid.push(rec); else break; }
  if(!valid.length) return false;
  replayPicks(valid);             // take each player, fill each slot
  return valid.length;
}
```

The three rules that make this safe: **write decisions, not data**; **validate against the current build before replaying**; and **never let a storage failure break the draft**.

## 8 · What I did not check

I have not implemented or measured this — it is a design and a serializability assessment, and it has not been run against the live draft flow. I did not read the full `draftSim` object in the build (the field names above are the ones the assignment listed and the ones the flow uses); a reader should confirm them against the code before writing the patch. The `storage` event handling for two open tabs, and the exact behaviour of `localStorage` under a `file://` origin in the Owner's browser, are also unmeasured — the `try/catch` around every access is there precisely because that behaviour varies.
