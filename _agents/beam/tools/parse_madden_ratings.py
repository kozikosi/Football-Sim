#!/usr/bin/env python3
"""Parse Madden NFL 27 player ratings scrape into clean JSON/CSV.

Usage:
    python3 parse_madden_ratings.py <raw_scrape.txt> [output.json]

Input: raw text scraped from the Madden ratings page (table with columns
PLAYER ABILITY POS TEAM OVR SPD STR AGI COD INJ AWR). Player names may
appear once or twice; footnotes (1-4) may appear between ratings.

Output: JSON array of objects with keys: name, pos, team, ovr, spd, str.
Only name, pos, team, ovr, spd, str are kept (no XF/AGI/COD/INJ/AWR).
"""
import sys, json, os

VALID_POS = {
    'QB','HB','FB','WR','TE','LT','LG','C','RG','RT','DT','LEDG','REDG',
    'MIKE','WILL','SAM','OLB','ILB','SS','FS','CB','K','P','LS','NICKEL',
    'DIME','EDGE','OL','DL','LB','DB','ST','RT','LT',
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

def is_footnote(tok):
    return tok.isdigit() and int(tok) < 10

def parse(text):
    lines = [ln.strip() for ln in text.splitlines()]
    lines = [ln for ln in lines if ln]
    players = []
    i = 0
    n = len(lines)
    while i < n:
        # Look for a known POS token followed by a known TEAM
        if lines[i] in VALID_POS and i + 1 < n and lines[i+1] in TEAMS:
            pos = lines[i]
            team = lines[i+1]
            # Find name: walk backwards, skip ability markers and digits
            name = None
            j = i - 1
            while j >= 0 and (lines[j] in ('X-Factor',) or lines[j].isdigit() or lines[j] in TEAMS):
                j -= 1
            if j >= 0:
                name = lines[j]
            # Collect numbers after team until we have 7+ valid ratings
            nums = []
            k = i + 2
            while k < n and len(nums) < 7:
                if lines[k].isdigit():
                    if not is_footnote(lines[k]):
                        nums.append(int(lines[k]))
                elif lines[k] in VALID_POS and k + 1 < n and lines[k+1] in TEAMS:
                    # Next player block — stop
                    break
                k += 1
            if len(nums) >= 7 and name:
                ovr, spd, str_ = nums[0], nums[1], nums[2]
                players.append({
                    'name': name,
                    'pos': pos,
                    'team': team,
                    'ovr': ovr,
                    'spd': spd,
                    'str': str_,
                })
            i = max(i + 1, k)
            continue
        i += 1
    return players

def main():
    if len(sys.argv) < 2:
        print("Usage: parse_madden_ratings.py <raw_scrape.txt> [output.json]", file=sys.stderr)
        sys.exit(1)
    with open(sys.argv[1], encoding='utf-8') as f:
        text = f.read()
    players = parse(text)
    out_path = sys.argv[2] if len(sys.argv) > 2 else None
    if out_path:
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(players, f, indent=2, ensure_ascii=False)
        print(f"Wrote {len(players)} players to {out_path}", file=sys.stderr)
    else:
        print(json.dumps(players, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main()
