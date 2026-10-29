#!/usr/bin/env python3
"""Parse a Madden NFL ratings page dump into a clean CSV.

Input: raw text scraped from the EA Madden ratings page (PLAYER ... OVR SPD STR AGI COD INJ AWR).
Output: CSV with columns: name,pos,team,ovr,spd,str (XF/AGI/COD/INJ/AWR dropped).

Usage:
    python3 parse_madden_ratings.py <raw.txt> > madden27-ratings.csv
    # or
    python3 parse_madden_ratings.py <raw.txt> --out madden27-ratings.csv

The parser walks the raw dump line by line. A player block is:
    <name>
    <name>                      (duplicate line on the page)
    [X-Factor]                  (optional)
    <pos>
    <team>
    <ovr> <spd> <str> <agi> <cod> <inj> <awr>   (numbers, sometimes split across lines)

Page chrome, footer, and pagination lines are skipped.
"""
import argparse, csv, re, sys

POS = {
    "QB","HB","FB","WR","TE","LT","LG","C","RG","RT","LE","RE","DT","NT","LEDG",
    "REDG","MIKE","WILL","SAM","CB","FS","SS","K","P","LS","OLB","ILB","EDGE",
    "DE","OL","DL","LB","DB","SAF",
}

def is_int(s):
    return bool(re.fullmatch(r"-?\d+", s.strip()))

def parse(text):
    lines = [ln.strip() for ln in text.splitlines()]
    # drop empties but keep structure
    toks = [ln for ln in lines if ln != ""]
    out = []
    i = 0
    n = len(toks)
    while i < n:
        # skip obvious chrome
        low = toks[i].lower()
        if low in ("player","ability","pos","team","ovr","spd","str","agi","cod","inj","awr"):
            i += 1; continue
        if low.startswith("showing ") or low.startswith("reset all") or low.startswith("filter"):
            i += 1; continue
        if low in ("1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"):
            i += 1; continue
        # a player block starts with a name line followed by the same name line
        if i + 1 < n and toks[i] == toks[i+1]:
            name = toks[i]
            j = i + 2
            # optional X-Factor
            if j < n and toks[j].lower() == "x-factor":
                j += 1
            # pos
            if j >= n or toks[j] not in POS:
                i += 1; continue
            pos = toks[j]; j += 1
            # team (may be multi-word; consume until we hit a number)
            team_parts = []
            while j < n and not is_int(toks[j]):
                team_parts.append(toks[j]); j += 1
            team = " ".join(team_parts).strip()
            if not team:
                i += 1; continue
            # collect the next 7 integers (ovr spd str agi cod inj awr), possibly split
            nums = []
            while j < n and len(nums) < 7:
                if is_int(toks[j]):
                    nums.append(int(toks[j])); j += 1
                else:
                    # stop if a non-number appears (next player name)
                    break
            if len(nums) < 3:
                i += 1; continue
            ovr, spd, str_ = nums[0], nums[1], nums[2]
            out.append({"name": name, "pos": pos, "team": team, "ovr": ovr, "spd": spd, "str": str_})
            i = j
            continue
        i += 1
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input", help="raw ratings dump file (or - for stdin)")
    ap.add_argument("--out", help="output CSV path (default stdout)")
    args = ap.parse_args()
    if args.input == "-":
        text = sys.stdin.read()
    else:
        with open(args.input, encoding="utf-8") as f:
            text = f.read()
    rows = parse(text)
    fh = open(args.out, "w", newline="", encoding="utf-8") if args.out else sys.stdout
    w = csv.writer(fh)
    w.writerow(["name", "pos", "team", "ovr", "spd", "str"])
    for r in rows:
        w.writerow([r["name"], r["pos"], r["team"], r["ovr"], r["spd"], r["str"]])
    if args.out:
        fh.close()
    print(f"# parsed {len(rows)} players", file=sys.stderr)

if __name__ == "__main__":
    main()
