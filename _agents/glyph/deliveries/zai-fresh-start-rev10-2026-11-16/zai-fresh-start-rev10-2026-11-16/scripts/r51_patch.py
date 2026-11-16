#!/usr/bin/env python3
"""r51_patch.py — the Rev 5.1 patch applier, shipped (Rev 9 Part 0; supersedes Rev 8 erratum 0.5).

The Rev 5.1 sitting's fixes were applied as asserted exact replacements to a copy of the
authoring tree; the receipt said "applied 17/17" but the applier did not ship (Rev 8 erratum
0.5 declared the claim UNVERIFIABLE). This script ships the applier so the claim is checkable.

Data: r51-patches.json (same directory) — 19 asserted replacements over the 12 fix-table
files. The receipt's "17/17" counted fix-table rows; the byte diff atomizes to 19 hunks over
the same 12 files, so asserting all 19 subsumes 17/17. The JSON was GENERATED from the two
shipped trees (scripts/gen-r51-patches.py in the authoring sandbox), not transcribed, so its
old/new bytes cannot drift from the trees it cites.

The pre-patch side: the unpatched authoring tree, published byte-identical on the review
branches — council/inkling `_agents/inkling/deliveries/zai-sitting-2026-11-15-authoring/`
(vendored at 85a54b66). It is NOT part of this zip; fetch it from the council branch.

Modes:
  --verify-shipped <addendum-dir>   assert every replacement's NEW bytes are present in the
                                    shipped patched tree (works offline, on this zip alone).
                                    Prints N/19; exit 0 iff all present.
  --reproduce <pre-tree> <reference-addendum>   copy the pre-patch tree, apply every
                                    replacement with assertions (each OLD bytes must be found
                                    exactly once; applying must never double-apply), then
                                    byte-compare the 12 files against the reference patched
                                    addendum (the Rev 6 published addendum). Exit 0 iff all
                                    12 byte-identical.
  --apply <tree>                    apply in place to an unpatched authoring tree (same
                                    assertions; refuses a tree already patched).

Exit codes: 0 ok · 1 verification failed · 2 usage.
"""
import json
import shutil
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
PATCHES = json.loads((HERE / 'r51-patches.json').read_text())['replacements']
FILES = sorted({p['file'] for p in PATCHES})


def apply_to_tree(root: Path) -> int:
    applied = 0
    for p in PATCHES:
        f = root / p['file']
        text = f.read_text()
        n = text.count(p['old'])
        if n != 1:
            print(f"FAIL {p['file']}: expected OLD bytes exactly once, found {n}: {p['label']}")
            return 1
        f.write_text(text.replace(p['old'], p['new']))
        applied += 1
    print(f'applied {applied}/{len(PATCHES)} replacements over {len(FILES)} files')
    return 0


def verify_shipped(addendum: Path) -> int:
    ok = 0
    for p in PATCHES:
        f = addendum / p['file']
        present = f.exists() and p['new'] in f.read_text()
        if present:
            ok += 1
        else:
            print(f"MISSING {p['file']}: patched bytes not found: {p['label']}")
    print(f'verify-shipped: {ok}/{len(PATCHES)} patched byte-sequences present in {addendum}')
    return 0 if ok == len(PATCHES) else 1


def reproduce(pre: Path, reference: Path) -> int:
    with tempfile.TemporaryDirectory() as td:
        work = Path(td) / 'tree'
        shutil.copytree(pre, work)
        # refuse an already-patched pre-side
        probe = PATCHES[0]
        if probe['old'] not in (work / probe['file']).read_text():
            print('FAIL: the pre-side does not carry the pre-patch bytes — wrong tree?')
            return 1
        if apply_to_tree(work) != 0:
            return 1
        bad = 0
        for rel in FILES:
            a, b = (work / rel).read_bytes(), (reference / rel).read_bytes()
            if a != b:
                bad += 1
                print(f'DIFF {rel}: reproduced bytes != reference ({len(a)} vs {len(b)} bytes)')
            else:
                print(f'IDENTICAL {rel}')
        print(f'reproduce: {len(FILES) - bad}/{len(FILES)} files byte-identical to {reference}')
        return 0 if bad == 0 else 1


def main() -> int:
    args = sys.argv[1:]
    if len(args) == 2 and args[0] == '--verify-shipped':
        return verify_shipped(Path(args[1]))
    if len(args) == 3 and args[0] == '--reproduce':
        return reproduce(Path(args[1]), Path(args[2]))
    if len(args) == 2 and args[0] == '--apply':
        return apply_to_tree(Path(args[1]))
    print(__doc__)
    return 2


if __name__ == '__main__':
    sys.exit(main())
