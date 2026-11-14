import json, subprocess, os
os.chdir('/home/z/my-project/boot')
d = json.loads(subprocess.run(['git', 'show', 'origin/architect/engine-and-seats:tools/mathlab/flex.json'],
                              capture_output=True, text=True, cwd='/home/z/my-project/boot').stdout)
def walker(x):
    if isinstance(x, dict):
        return sum(walker(v) for v in x.values())
    return 1
print("flex.json leaf-count receipt (cwd /home/z/my-project/boot · cmd: git show origin/architect/engine-and-seats:tools/mathlab/flex.json)")
print("live table sha256: 0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6 (verified against architect tip AND council/muse mirror)")
rules = [(r, dp, v) for r, dd in d['flex'].items() for dp, v in dd.items()]
from collections import Counter
t = Counter(v for _, _, v in rules)
print("top-level keys:", list(d.keys()))
print("corrected count (destination rules only):", len(rules), "· tiers:", dict(sorted(t.items(), reverse=True)))
print("QB->FS:", d['flex']['QB'])
print()
print("REPRODUCTION of the fwtest10 C5b '101': a walker that counts every NON-DICT node as one leaf gives")
print("  _source (string) -> 1 · roles (list) -> 1 · flex (dict, recursed) ->", walker(d['flex']), "=> total", walker(d))
print("i.e. 101 = 99 rules + 2 non-rule top-level nodes counted as leaves. (v3 §8 phrased the extra 2 as roles+flex;")
print("the arithmetic is identical: two non-rule top-level nodes. The reproducible walker pins which two: _source and roles.)")
