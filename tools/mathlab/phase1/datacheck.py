# Source-data identity check (18 Nov 2026). nflverse republishes its release files in place, so a pack or a conformance-vector file is only reproducible against the data revision it was made from.
# data-manifest.json records that revision (bytes + sha256 per file). bake.py and poolvectors.py call check(years) first and stop on a mismatch unless --allow-data-drift is passed.
# usage as a script: python3 -I datacheck.py [years...]   (default: all ten seasons); exit 0 = data matches the manifest, 3 = it does not.
import hashlib, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.environ.get('NFLVERSE_DIR', os.path.join(HERE, 'data'))
def check(years):
    man = json.load(open(os.path.join(HERE, 'data-manifest.json')))['files']
    bad = []
    for y in years:
        name = 'play_by_play_%d.parquet' % y; f = os.path.join(DATA, name)
        if name not in man: bad.append('%s: not in data-manifest.json' % name); continue
        if not os.path.exists(f): bad.append('%s: missing (sh fetch.sh)' % name); continue
        h = hashlib.sha256(open(f, 'rb').read()).hexdigest()
        if h != man[name]['sha256']: bad.append('%s: sha256 %s... != manifest %s... (%d B vs %d B)' % (name, h[:12], man[name]['sha256'][:12], os.path.getsize(f), man[name]['bytes']))
    return bad
def require(years, allow_drift=False):
    bad = check(years)
    if not bad: return
    msg = 'SOURCE DATA DOES NOT MATCH data-manifest.json:\n  ' + '\n  '.join(bad) + '\nA pack or vector file made from this data would not be reproducible from the committed ones. See data-manifest.json (note).'
    if allow_drift: print('WARNING (--allow-data-drift): ' + msg, file=sys.stderr); return
    raise SystemExit(msg)
if __name__ == '__main__':
    ys = [int(a) for a in sys.argv[1:]] or list(range(2016, 2026))
    b = check(ys)
    print('data matches data-manifest.json for %s' % ys if not b else '\n'.join(b))
    sys.exit(0 if not b else 3)
