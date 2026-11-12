"""MUSE P-345 λ-objective analysis (Q1 receipt + test rows).

Uses Z.ai's merge_prototype.py (council/glyph, the V2 merged form) + the Owner's
99-rule table (flex-99-live.json). Computes, for each of the 97 cross-role rows,
the V2 price and tier at λ=0.20 and λ=0.40, and reports which rows flip tier,
which layer dominates, and whether the flips sit in high-value or low-value roles.
Also the FB rows and C>OG (the Owner's ruled test cases) at both λ.
Form: "merged_exp" (V2 exposure guard), weights W_MEAS (measured localWins20).
"""
import json
import sys

sys.path.insert(0, "/tmp/lam")
import merge_prototype as MP

live = json.load(open("/tmp/lam/flex-99-live.json"))["flex"]
pairs97 = [(s, d, o) for s, ds in live.items() for d, o in ds.items() if s != d]
print(f"rows: {len(pairs97)}")

TIERS = MP.TIERS
rows = []
for (src, dst, own) in pairs97:
    r20, dom20 = MP.raw_price(src, dst, "merged_exp", 0.20, MP.W_MEAS)
    r40, dom40 = MP.raw_price(src, dst, "merged_exp", 0.40, MP.W_MEAS)
    m, s = MP.ability_ms(src, dst)
    g = MP.guard(src, dst, MP.W_MEAS)
    e = MP.E_ROLE.get(src, 1.0)
    rows.append(dict(k=f"{src}>{dst}", src=src, dst=dst, own=own,
                     r20=round(r20, 2), t20=MP.tier_of(r20), dom20=dom20,
                     r40=round(r40, 2), t40=MP.tier_of(r40), dom40=dom40,
                     m=round(m, 2), s=round(s, 2), g=round(g, 2),
                     eg=round(e * g, 2), e=round(e, 3),
                     v_dst=MP.W_MEAS[dst], v_src=MP.W_MEAS[src]))

# --- headline counts (reproduce C1) ---
for lam, key in [(0.20, "t20"), (0.40, "t40")]:
    exact = sum(1 for r in rows if r[key] == r["own"])
    off1 = sum(1 for r in rows if abs(TIERS.index(r[key]) - TIERS.index(r["own"])) == 1)
    mae = sum(abs((r["r20"] if lam == 0.20 else r["r40"]) - r["own"]) for r in rows) / len(rows)
    print(f"λ={lam}: exact {exact}/97  off1 {off1}  mae {mae:.3f}")

# --- the flips: rows whose tier differs between 0.20 and 0.40 ---
flips = [r for r in rows if r["t20"] != r["t40"]]
print(f"\nrows whose TIER differs between λ=0.20 and λ=0.40: {len(flips)}")
print(f"{'row':12s} {'own':>3s} {'λ0.20':>5s} {'t20':>3s} {'λ0.40':>5s} {'t40':>3s} {'M':>5s} {'S':>5s} {'E·G':>5s} {'dom20':>7s} {'dom40':>7s} {'v_dst':>6s}")
for r in sorted(flips, key=lambda x: -x["v_dst"]):
    print(f"{r['k']:12s} {r['own']:3d} {r['r20']:5.2f} {r['t20']:3d} {r['r40']:5.2f} {r['t40']:3d} "
          f"{r['m']:5.2f} {r['s']:5.2f} {r['eg']:5.2f} {r['dom20']:>7s} {r['dom40']:>7s} {r['v_dst']:6.3f}")

# --- classify flips by destination value (high = the slots the user stares at) ---
hi = [r for r in flips if r["v_dst"] >= 0.6]   # WR1/DE1/DT1/OT1/WR2/CB1/OG1/TE1/RB1 class
lo = [r for r in flips if r["v_dst"] < 0.6]
print(f"\nflips into HIGH-value destinations (localWins20 ≥ 0.6): {len(hi)}")
for r in sorted(hi, key=lambda x: -x["v_dst"]):
    print(f"  {r['k']:12s} own {r['own']:2d}  λ0.20 tier {r['t20']:2d} (price {r['r20']:.2f})  λ0.40 tier {r['t40']:2d} (price {r['r40']:.2f})  v_dst {r['v_dst']:.3f}")
print(f"flips into LOW-value destinations (localWins20 < 0.6): {len(lo)}")
for r in sorted(lo, key=lambda x: -x["v_dst"]):
    print(f"  {r['k']:12s} own {r['own']:2d}  λ0.20 tier {r['t20']:2d} (price {r['r20']:.2f})  λ0.40 tier {r['t40']:2d} (price {r['r40']:.2f})  v_dst {r['v_dst']:.3f}")

# --- direction: at 0.20, under- vs over-priced relative to owner ---
under20 = [r for r in rows if r["t20"] < r["own"]]
over20 = [r for r in rows if r["t20"] > r["own"]]
under40 = [r for r in rows if r["t40"] < r["own"]]
over40 = [r for r in rows if r["t40"] > r["own"]]
print(f"\nλ=0.20: under-priced {len(under20)} (all by one tier), over-priced {len(over20)}")
print("  under-priced rows:", ", ".join(r["k"] for r in under20))
print(f"λ=0.40: under-priced {len(under40)}, over-priced {len(over40)}")
print("  under:", ", ".join(r["k"] for r in under40), " over:", ", ".join(r["k"] for r in over40))

# --- where 0.40's gap error is biggest (the rows that drive mae 1.311) ---
print("\nrows where λ=0.40's price is furthest from the Owner's tier (gap error):")
for r in sorted(rows, key=lambda x: -abs(x["r40"] - x["own"]))[:10]:
    print(f"  {r['k']:12s} own {r['own']:2d}  λ0.40 price {r['r40']:5.2f} (err {r['r40']-r['own']:+.2f}, dom {r['dom40']})  "
          f"λ0.20 price {r['r20']:5.2f} (err {r['r20']-r['own']:+.2f}, dom {r['dom20']})")

# --- the ruled test rows: FB and C>OG ---
print("\nruled test rows (Owner rulings — which objective respects them better):")
for k in ["FB>RB", "FB>TE", "C>OG", "C>OT", "C>DT"]:
    r = next(x for x in rows if x["k"] == k)
    print(f"  {k:8s} own {r['own']:2d}  λ0.20: price {r['r20']:5.2f} tier {r['t20']:2d} ({r['dom20']})  "
          f"λ0.40: price {r['r40']:5.2f} tier {r['t40']:2d} ({r['dom40']})  M {r['m']:.2f} S {r['s']:.2f} E·G {r['eg']:.2f}")

# --- how much of the price is ability vs guard at each λ (the mechanism) ---
for lam, key, dkey in [(0.20, "r20", "dom20"), (0.40, "r40", "dom40")]:
    n_guard = sum(1 for r in rows if r[dkey] == "guard")
    print(f"λ={lam}: guard dominates on {n_guard}/97 rows, ability on {97 - n_guard}/97")

json.dump(rows, open("/tmp/lam/lam_rows.json", "w"), indent=1)
print("\nSaved: /tmp/lam/lam_rows.json")
