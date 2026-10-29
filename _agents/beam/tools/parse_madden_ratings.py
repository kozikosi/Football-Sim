#!/usr/bin/env python3
"""Parse Madden NFL 27 player ratings scrape into clean JSON/CSV.

Usage:
    python3 parse_madden_ratings.py <raw_scrape.txt> [output.json]

Input: raw text scraped from the Madden ratings page (the table with columns
PLAYER ABILITY POS TEAM OVR SPD STR AGI COD INJ AWR). Player names are
duplicated on consecutive lines; footnotes (1-4) may appear between ratings.

Output: JSON array of objects with keys: name, pos, team, ovr, spd, str.
Only name, pos, team, ovr, spd, str are kept (no XF/AGI/COD/INJ/AWR).

The parser identifies a player block by a known POS token followed by a known
TEAM, then collects the 7 rating numbers (filtering out single-digit footnotes).
"""
import sys, json, re

VALID_POS = {
    'QB','HB','FB','WR','TE','LT','LG','C','RG','RT','DT','LEDG','REDG',
    'MIKE','WILL','SAM','OLB','ILB','SS','FS','CB','K','P','LS','NICKEL',
    'DIME','EDGE','OL','DL','LB','DB','ST',
}
# NFL teams (Madden's naming)
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
# Noise lines to skip
NOISE = {
    'X-Factor','Filter','Reset all','Search Player','Showing','results','Leagues & Teams',
    'AFC East','AFC North','AFC South','AFC West','NFC East','NFC North','NFC South',
    'NFC West','Buffalo Bills','Miami Dolphins','New England Patriots','NY Jets',
}

def is_footnote(tok):
    return tok.isdigit() and int(tok) < 10

def parse(text):
    lines = [ln.strip() for ln in text.splitlines()]
    # Remove empty lines
    lines = [ln for ln in lines if ln]
    players = []
    i = 0
    n = len(lines)
    while i < n:
        # Look for a known POS token
        if lines[i] in VALID_POS:
            pos = lines[i]
            # team is next line
            if i + 1 < n and lines[i+1] in TEAMS:
                team = lines[i+1]
                # name: search backwards for the name (skip duplicates/ability)
                name = None
                j = i - 1
                # skip ability markers
                while j >= 0 and (lines[j] in ('X-Factor',) or lines[j].isdigit()):
                    j -= 1
                if j >= 0:
                    name = lines[j]
                    # name often duplicated on the line before; take the last distinct
                    if j - 1 >= 0 and lines[j-1] == name:
                        pass  # already have name
                # collect numbers after team
                nums = []
                k = i + 2
                while k < n and not (lines[k] in VALID_POS and k + 1 < n and lines[k+1] in TEAMS):
                    # stop if we hit a known team line that starts a new block? handled by pos check
                    if lines[k].isdigit():
                        if not is_footnote(lines[k]):
                            nums.append(int(lines[k]))
                    k += 1
                    if k >= n:
                        break
                # We need exactly 7 ratings; if more, take first 7
                if len(nums) >= 7 and name:
                    ovr, spd, str_, agi, cod, inj, awr = nums[:7]
                    players.append({
                        'name': name,
                        'pos': pos,
                        'team': team,
                        'ovr': ovr,
                        'spd': spd,
                        'str': str_,
                    })
                i = k
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
