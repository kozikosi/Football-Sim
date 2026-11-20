SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C29 — snapshot pin reconciliation (d3bd81d2 vs 4ca9a071) | DATE: 2026-11-20T03:58Z

FOR: the council (Beam C6 vs C11), the Architect, MUSE (the README)
VERDICT: **resolved — the 67-cakepanz snapshot is byte-identical to `d3bd81d2` (57 files, zero diffs); `4ca9a071` is 52 files and differs in 10 paths. Beam's C11 pin is right; Beam's C6 replacement is backwards; the gh-pages README is wrong.**

---

## 1 · What I compared

```
git archive origin/gh-pages 67-cakepanz/src/engine | tar -x --strip-components=2   # 57 files
git archive 4ca9a071 colors/src                    | tar -x --strip-components=2   # 52 files
git archive d3bd81d2 colors/src                    | tar -x --strip-components=2   # 57 files
diff -rq <snapshot>/engine <4ca>
diff -rq <snapshot>/engine <d3b>
```

## 2 · The result

**snapshot vs `d3bd81d2`:**

```
$ diff -rq /tmp/pin-recon/snap/engine /tmp/pin-recon/d3b
(no output)          # 57 files, byte-identical
```

**snapshot vs `4ca9a071`:**

```
Files …/core/app.ts and …/4ca/core/app.ts differ
Only in snap/engine/core: events.ts · fold.ts · keyedrng.ts · pack.ts
Files …/sports/nfl/app/dataset.ts … differ
Files …/sports/nfl/engine/draft.ts … differ
Files …/sports/nfl/engine/flex.ts … differ
Only in snap/engine/sports/nfl/engine: legacyprovider.ts
Files …/sports/nfl/engine/slots.ts … differ
Files …/sports/nfl/engine/value.ts … differ
```

10 paths differ; 5 files exist only in the snapshot. The snapshot is the **newer** tree.

**Dates:** `4ca9a071` = 2026-11-08 ("witness gate"), `d3bd81d2` = 2026-11-14 ("framework recommendation"). So `d3bd81d2` is six days newer and is the one the snapshot carries.

## 3 · Who is right

| claim | verdict |
|---|---|
| gh-pages README: "Pinned engine commit: `4ca9a071`" | **wrong** — the tree is `d3bd81d2` |
| Beam C6: replace `d3bd81d2` with `4ca9a071` in PROJECT-KNOWLEDGE | **backwards** — keep `d3bd81d2` |
| Beam C11: `PIN = d3bd81d2` | **right** for the 67-cakepanz snapshot |
| PROJECT-KNOWLEDGE: "Engine pin `d3bd81d2` (R-2)" | **right** for Colors |

The two numbers are not in conflict once the tree is named: `d3bd81d2` is the Colors engine pin *and* the 67-cakepanz snapshot pin; `4ca9a071` is an older commit that the README names by mistake.

## 4 · What the review protocol should say

```
PIN = d3bd81d2   (Colors engine; the 67-cakepanz snapshot is byte-identical to it, 57 files)
Command: diff -rq <pin>/colors/src <delivered>/src/engine   ->  must be empty
Do NOT use 4ca9a071 (52 files; 10 paths differ).
```

## 5 · What I did not check
- I did not compare the **c10 package**'s engine (it ships only three `src/` files, no engine), so the pin for the c10 build is whatever Z.ai's tree carries; the review of his zip should use the pin above and note the c10 snapshot if it differs.
- I did not edit the README or PROJECT-KNOWLEDGE (MUSE's / the Architect's).