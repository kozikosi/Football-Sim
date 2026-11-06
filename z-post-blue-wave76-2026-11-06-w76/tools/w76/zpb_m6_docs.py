#!/usr/bin/env python3
# zpb_m6_docs.py — wave 76 · M6: the stale-reference dispositions applied to the w74 docs.
# Source bytes: origin/gh-pages (the live w74 tree). Output: w76/w74-docs-m6/ at the repo-relative
# paths + a unified diff + a line manifest. History artifacts (b-top30-*.json) untouched.
import hashlib, os, subprocess

SRC = '/home/z/my-project/work/w74docs'
OUT = '/home/z/my-project/work/w76/w74-docs-m6'
PATCH = '/home/z/my-project/work/w76/w74-docs-m6/w74-m6.patch'

COUNT_BASIS = ('**Test counts:** 288 = the full vitest suite (core + nfl + app) · '
               '286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run · '
               '284 = 286 minus the 2 golden-seasons tests that were still warming (288−2−2).')

NEW_TARGET = '90 % playoffs / ~35 % Super Bowl appearance / 25 % title, with P(20-0) ≈ 1–2 %'

edits_done = []

def load(name):
    return open(os.path.join(SRC, name), encoding='utf-8').read()

def rep(src, old, new, n=1, tag=''):
    c = src.count(old)
    assert c == n, 'M6 %s: anchor count %d (want %d) for: %s' % (tag, c, n, old[:80])
    edits_done.append((tag, old[:64].replace('\n', ' ')))
    return src.replace(old, new)

def write(rel, content):
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8').write(content)
    print('wrote', rel, '·', len(content.encode()), 'B · md5', hashlib.md5(content.encode()).hexdigest())

# ---------------- CALIBRATION.md ----------------
s = load('w74_03-lab-calibration_CALIBRATION.md')
s = rep(s, '**Owner target (5 Nov 2026, verbatim ruling):** for a user consistently picking within the top 30 of wins/priority — **80 % playoffs / 25 % Super Bowl / 10 % title**.',
        '**Owner target (5 Nov 2026, verbatim ruling; retargeted 6 Nov 2026, w76 M6 — the stale 80/25/10 reads 90/35/25):** for a user consistently picking within the top 30 of wins/priority — **' + NEW_TARGET + '**.', tag='CAL/header')
s = rep(s, '**Reading note (flagged):** "25 % Super Bowl" is read as *reaching* the Super Bowl game (`finalists`), "10 % title" as *winning* it (`champion`). If the Owner meant 25 % as titles, every band below shifts one metric — one line re-runs it.',
        '**Reading note (flagged):** "35 % Super Bowl" is read as *reaching* the Super Bowl game (`finalists`), "25 % title" as *winning* it (`champion`). If the Owner meant 25 % as appearances, every band below shifts one metric — one line re-runs it.', tag='CAL/reading-note')
s = rep(s, 'The policy the 80/25/10 target applies to.', 'The policy the 90/35/25 + P(20-0) target applies to.', tag='CAL/policy-role')
s = rep(s, '| top30 | **80 % ± 5 pp** | **25 % ± 5 pp** | **10 % ± 3 pp** | 1,000 |',
        '| top30 | **90 % ± 5 pp** | **35 % ± 5 pp** | **25 % ± 3 pp** | 1,000 |', tag='CAL/bands-row')
s = rep(s, '**The measuring-instrument constraint (GLM\'s, adopted):** a rate p measured at N=100 has a 95 % CI half-width of ±1.96·√(p(1−p)/100) ≈ **±8 pp at p=0.5** — a band tighter than ±8 pp is not measurable at N=100. The 80/25/10 bands above (±3–5 pp) require **N ≈ 1,000 per policy** (±2.5–3 pp at p=0.1–0.8). Gate runs (CI) may use N=300 with ±5–6 pp tolerance and are labelled smoke, never verdicts.',
        '**The measuring-instrument constraint (GLM\'s, adopted):** a rate p measured at N=100 has a 95 % CI half-width of ±1.96·√(p(1−p)/100) ≈ **±8 pp at p=0.5** — a band tighter than ±8 pp is not measurable at N=100. The 90/35/25 bands above (±3–5 pp) require **N ≈ 1,000 per policy** (±2.5–3 pp at p=0.1–0.8); the top30 policy also carries **P(20-0) ≈ 1–2 %** at the same N (a perfect season including the playoff run). Gate runs (CI) may use N=300 with ±5–6 pp tolerance and are labelled smoke, never verdicts.', tag='CAL/instrument')
s = rep(s, 'Decision rule: pick the rung whose top30 playoffs/SB/title land closest to 80/25/10; if no rung reaches 80 %,',
        'Decision rule: pick the rung whose top30 playoffs/SB/title land closest to 90/35/25 (+ P(20-0) ≈ 1–2 %); if no rung reaches 90 %,', tag='CAL/ladder-rule')
s = rep(s, 'The lever cannot reach 80/25/10; **no parameter value is proposed**',
        'The lever cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %); **no parameter value is proposed**', tag='CAL/verdict')
s = rep(s, 'its own finding is that the CPU-draft lever does not move parity either (2.16–2.18 at every rung vs the 3.0–3.5 band).',
        'its own finding is that the CPU-draft lever does not move parity either (2.16–2.18 at every rung vs the real-NFL reference (3.07 ± 0.35) — the parity TARGET is derived in M5, not read off the NFL).', tag='CAL/parity-ref')
write('w74/03-lab-calibration/CALIBRATION.md', s)

# ---------------- FINDINGS-P-250.md ----------------
s = load('w74_03-lab-calibration_FINDINGS-P-250.md')
s = rep(s, 'spread cannot reach 80/25/10, and the gap is a draft-quality gap, not a league-strength gap.** Per the',
        'spread cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %), and the gap is a draft-quality gap, not a league-strength gap.** Per the', tag='FIND/headline')
s = rep(s, 'win-SD 2.17–2.23 in every arm — below the 3.0–3.5 band; the league is\n  too flat, and nothing in the draft policy changes it.',
        'win-SD 2.17–2.23 in every arm — below the real-NFL reference (3.07 ± 0.35; the parity\n  TARGET is derived in M5); the league is too flat, and nothing in the draft policy changes it.', tag='FIND/parity-ref')
s = rep(s, 'is 29.2 pp short of the target.',
        'is 29.2 pp short of the 5-Nov 80 % target — 39.2 pp short of the retargeted 90 % line.', tag='FIND/gap')
s = rep(s, "The Owner's 80/25/10 for top-30 pickers therefore",
        "The Owner's 90/35/25 (+ P(20-0) ≈ 1–2 %) for top-30 pickers therefore", tag='FIND/draft-quality')
s = rep(s, 'also does not move parity (win-SD ~2.17 at every rung vs the 3.0–3.5 band).',
        'also does not move parity (win-SD ~2.17 at every rung vs the real-NFL reference (3.07 ± 0.35) — the target is derived in M5).', tag='FIND/parity-cost')
write('w74/03-lab-calibration/FINDINGS-P-250.md', s)

# ---------------- timeline.md (line 33 + the count basis in the header) ----------------
s = load('w74_02-n1-drafts_docs_council_timeline.md')
s = rep(s, '| 2026-11-06 | Owner decides: real names · Svelte confirmed · top-30 target 80/25/10 | this session\'s context (w74) |',
        '| 2026-11-06 | Owner decides: real names · Svelte confirmed · top-30 target 90/35/25 + P(20-0) ≈ 1–2 % (retargeted from 80/25/10, w76 M6) | this session\'s context (w74) |', tag='TL/line33')
s = rep(s, '(Executor waves w52–w55 ship single-file product builds on the seat\'s branch; from w70\nthe shell is a frozen parity anchor and the work moves to the Colors rebuild.)',
        '(Executor waves w52–w55 ship single-file product builds on the seat\'s branch; from w70\nthe shell is a frozen parity anchor and the work moves to the Colors rebuild.)\n\n' + COUNT_BASIS, tag='TL/count-basis')
write('w74/02-n1-drafts/docs/council/timeline.md', s)

# ---------------- w74/README.md ----------------
s = load('w74_README.md')
s = rep(s, 'but the proposed CPU-draft lever is FLAT and cannot reach the Owner\'s 80/25/10; no parameter is proposed, two follow-ups are pre-registered for ruling.**',
        'but the proposed CPU-draft lever is FLAT and cannot reach the Owner\'s 90/35/25 (+ P(20-0) ≈ 1–2 %); no parameter is proposed, two follow-ups are pre-registered for ruling.**', tag='ROOT/paragraph')
s = rep(s, 'decides whether 80/25/10 is a policy reading or an engine-tuning problem.',
        'decides whether 90/35/25 (+ P(20-0) ≈ 1–2 %) is a policy reading or an engine-tuning problem.', tag='ROOT/ruling2')
s = rep(s, '**Delivery:** files and zips only — nothing lands without Kosi\'s review and push; every folder carries its own README with what needs ruling.',
        '**Delivery:** files and zips only — nothing lands without Kosi\'s review and push; every folder carries its own README with what needs ruling.\n\n' + COUNT_BASIS, tag='ROOT/count-basis')
write('w74/README.md', s)

# ---------------- 03-lab-calibration/README.md ----------------
s = load('w74_03-lab-calibration_README.md')
s = rep(s, '— the CPU-draft spread cannot reach 80/25/10; no parameter value is proposed (the pre-registered rule stops the tuning);',
        '— the CPU-draft spread cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %); no parameter value is proposed (the pre-registered rule stops the tuning);', tag='LAB/headline')
s = rep(s, 'the Owner\'s 80/25/10 rungs over the top-30 group, the +31.5 pp gap called out.',
        'the Owner\'s 5-Nov target rungs (80/25/10) over the top-30 group, the +31.5 pp gap called out — the chart keeps its 5-Nov bands (a generated artifact); the retargeted rungs are 90/35/25 + P(20-0) ≈ 1–2 % (w76 M6).', tag='LAB/chart')
write('w74/03-lab-calibration/README.md', s)

# ---------------- 01-w74-review/README.md (the dated decision record + count basis) ----------------
s = subprocess.run(['git', '-C', '/home/z/my-project/Football-Sim', 'show', 'origin/gh-pages:w74/01-w74-review/README.md'],
                   capture_output=True, text=True, check=True).stdout
s = rep(s, "Kosi's three decided answers (real names · Svelte · 80/25/10), and my w72/w73 records.",
        "Kosi's three decided answers (real names · Svelte · the top-30 target — 80/25/10 as decided that day, retargeted 90/35/25 + P(20-0) ≈ 1–2 % on 6 Nov, w76 M6), and my w72/w73 records.", tag='REV01/answers')
s = rep(s, '**Applies to:** branch `architect/engine-and-seats` (verified at `425f72a`). No repo files changed by this item — it is a review document.',
        '**Applies to:** branch `architect/engine-and-seats` (verified at `425f72a`). No repo files changed by this item — it is a review document.\n\n' + COUNT_BASIS, tag='REV01/count-basis')
write('w74/01-w74-review/README.md', s)

# ---------------- the count-basis READMEs (02, 04, 05, 07, 08 — no target statements in them) ----------------
def count_basis_doc(gitpath, outrel, anchor, tag):
    s = subprocess.run(['git', '-C', '/home/z/my-project/Football-Sim', 'show', 'origin/gh-pages:' + gitpath],
                       capture_output=True, text=True, check=True).stdout
    s = rep(s, anchor, anchor + '\n\n' + COUNT_BASIS, tag=tag)
    write(outrel, s)

count_basis_doc('w74/02-n1-drafts/README.md', 'w74/02-n1-drafts/README.md',
    "**Applies to:** the fresh public repo at cutover — paths `docs/council/*` and `tools/council-metrics.mjs`, `tools/council-telemetry.mjs`. Nothing here edits the Architect's branch; it is exhibit content + two generator scripts.",
    'N1/count-basis')
count_basis_doc('w74/04-contracts-fixes/README.md', 'w74/04-contracts-fixes/README.md',
    '**Applies to:** branch `architect/engine-and-seats` at `425f72a`. Files below are at their repo paths under `colors/`.',
    'CT/count-basis')
count_basis_doc('w74/05-viewmodels-screens/README.md', 'w74/05-viewmodels-screens/README.md',
    'This is the **pattern-freeze forcing function**: every place the VM pattern was ambiguous, I made the best call and flagged it **G-VM1…G-VM11** — Claude rules on the list and the freeze is real.',
    'VM/count-basis')
count_basis_doc('w74/07-tooling-ci/README.md', 'w74/07-tooling-ci/README.md',
    '**What this is:** every gate from the brief, built and RUN in the worktree (not just written): bundle budget, runes enforcement, evidence pack, contract:check (both directions), the append-only conflict channel, the seven acceptance criteria as running Playwright specs, and the determinism bug-report harness with a checked-in card proving end-to-end replay.',
    'CI/count-basis')
count_basis_doc('w74/08-proposals-docs/README.md', 'w74/08-proposals-docs/README.md',
    "**Applies to:** the repo's docs/contract layer at `425f72a` (+ `origin/main` and `origin/gh-pages` for the deletion analysis). Every patch is text the Architect applies; nothing here is merged.",
    'PR/count-basis')

# ---------------- the manifest + the unified diff ----------------
manifest = ['# M6 — the stale-reference dispositions applied to the w74 docs (w76, 2026-11-06)',
            '',
            'The Muse w76 item, executed: every 80/25/10 → 90/35/25 + P(20-0) ≈ 1–2 %; every statement of',
            'the parity band as a target → "the real-NFL reference (3.07 ± 0.35) — the target is derived in',
            'M5"; timeline.md line 33 carries the retargeted wording; every touched doc that cites a test',
            'count states the basis in its header (288 = the full vitest suite (core + nfl + app); 286 = 288 − 2',
            'storage-env-dependent tests skipped in the sandbox run; 284 = 286 − 2 golden-seasons tests still',
            'warming = 288−2−2).',
            '',
            'The tree below drops onto gh-pages at the same paths (w74/…). `w74-m6.patch` is the unified diff',
            'against the current gh-pages bytes. History artifacts are untouched — `results/b-top30-*.json`',
            'keep their filenames and bytes.',
            '',
            'Edits applied (%d):' % len(edits_done), '']
for tag, anchor in edits_done:
    manifest.append('- %s — `%s`' % (tag, anchor))
manifest += ['',
             'Out of scope this pass (flagged, not applied):',
             '- The M1 policy relabels (top30 → skilled in the POLICY table; greedy is best-value, not "naive',
             '  best-OVR") — the w75 answers doc carries that ruling; Muse\'s w76 M6 list did not include it.',
             '  One line of the next Lab pass applies it.',
             '- The generated artifacts (calibration-curve.png/.svg, results/*.json) keep their bytes; the 03',
             '  README now says the chart draws the 5-Nov bands while the retargeted rungs are 90/35/25.',
             '']
open(os.path.join(OUT, 'M6-CHANGES.md'), 'w', encoding='utf-8').write('\n'.join(manifest))
print('wrote M6-CHANGES.md')

diff = []
for rel in ['w74/README.md', 'w74/01-w74-review/README.md', 'w74/02-n1-drafts/README.md',
            'w74/02-n1-drafts/docs/council/timeline.md', 'w74/03-lab-calibration/README.md',
            'w74/03-lab-calibration/CALIBRATION.md', 'w74/03-lab-calibration/FINDINGS-P-250.md',
            'w74/04-contracts-fixes/README.md', 'w74/05-viewmodels-screens/README.md',
            'w74/07-tooling-ci/README.md', 'w74/08-proposals-docs/README.md']:
    old = subprocess.run(['git', '-C', '/home/z/my-project/Football-Sim', 'show', 'origin/gh-pages:' + rel],
                         capture_output=True, text=True, check=True).stdout
    new = open(os.path.join(OUT, rel), encoding='utf-8').read()
    if old == new:
        print('UNCHANGED (flag):', rel)
        continue
    r = subprocess.run(['diff', '-u', '--label', 'a/' + rel, '--label', 'b/' + rel, '-', rel],
                       input=old, cwd=OUT, capture_output=True, text=True)
    diff.append(r.stdout)
open(PATCH, 'w', encoding='utf-8').write('\n'.join(diff))
print('wrote w74-m6.patch ·', len('\n'.join(diff).encode()), 'B')
print('\nM6 pass complete ·', len(edits_done), 'edits')
