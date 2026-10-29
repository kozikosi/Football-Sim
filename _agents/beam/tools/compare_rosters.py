#!/usr/bin/env python3
"""Compare old roster (TEAM_DATA) names against new Madden ratings scrape.

Usage:
    python3 compare_rosters.py <raw_madden_scrape.txt>

Reads old roster names from _agents/beam/data/old-roster-names.txt.
Outputs players in the old roster but NOT found in the Madden scrape.
"""
import sys, re, os

VALID_POS = {
    'QB','HB','FB','WR','TE','LT','LG','C','RG','RT','DT','LEDG','REDG',
    'MIKE','WILL','SAM','OLB','ILB','SS','FS','CB','K','P','LS','NICKEL','DIME',
}
TEAMS = {
    'Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills',
    'Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns',
    'Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers',
    'Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs',
    'Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins',
    'Minnesota Vikings','New England Patriots','New Orleans Saints','NY Giants',
    'NY Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers',
    'Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders',
}

def extract_names(text):
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    names = set()
    i = 0
    n = len(lines)
    while i < n:
        if lines[i] in VALID_POS and i + 1 < n and lines[i+1] in TEAMS:
            # name is the previous non-ability line
            j = i - 1
            while j >= 0 and (lines[j] in ('X-Factor',) or lines[j].isdigit()):
                j -= 1
            if j >= 0:
                names.add(lines[j])
            i += 2
            continue
        i += 1
    return names

def main():
    if len(sys.argv) < 2:
        print("Usage: compare_rosters.py <raw_madden_scrape.txt>", file=sys.stderr)
        sys.exit(1)
    with open(sys.argv[1], encoding='utf-8') as f:
        new_names = extract_names(f.read())
    old_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'old-roster-names.txt')
    with open(old_path, encoding='utf-8') as f:
        old_names = set(ln.strip() for ln in f if ln.strip())
    missing = sorted(old_names - new_names)
    print(f"Old roster: {len(old_names)} players")
    print(f"New Madden: {len(new_names)} players")
    print(f"Missing from new (in old, not in new): {len(missing)}")
    print("---")
    for name in missing:
        print(name)

if __name__ == '__main__':
    main()
