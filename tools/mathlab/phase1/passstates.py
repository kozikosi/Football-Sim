# Dump the real pass plays of the given seasons as CSV (down,ytg,ydl,sd,qtr,hs,oc,season): the REAL state distribution, for tools that compare nodes on real vs simulated states.
# usage: python3 -I passstates.py OUT.csv [first_season=2023] [last_season=2025]
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, '..'))
from passclass import passes

out = sys.argv[1]; a = int(sys.argv[2]) if len(sys.argv) > 2 else 2023; b = int(sys.argv[3]) if len(sys.argv) > 3 else 2025
R = passes(range(a, b + 1))
with open(out, 'w') as f:
    f.write('down,ytg,ydl,sd,qtr,hs,oc,season\n')
    for i in range(len(R)):
        f.write('%d,%g,%g,%g,%d,%g,%d,%d\n' % (int(R.down[i]), float(R.ydstogo[i]), float(R.yardline_100[i]), float(R.sd[i]), int(R.qtr[i]), float(R.hs[i]), int(R.oc[i]), int(R.season[i])))
print('wrote', out, len(R), 'pass plays', a, '-', b)
