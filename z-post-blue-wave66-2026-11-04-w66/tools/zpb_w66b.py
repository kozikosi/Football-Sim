#!/usr/bin/env python3
"""w66 chain step 2 — the Draft button tiers (all pulse; top-3 wear the team-gradient sheen)
and RETURN TO AUTO LINEUP (renamed, hidden until the user touches the lineup)."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP1_MD5 = 'fc271eac1b07dfccb354b76c6e6413d1'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP1_MD5, 'step-1 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:80]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

# ---- 1 · every Draft button pulses; the top-3 upgrade to the filled team-gradient sheen ----
rep('tr.zpb-top3 button.resetbtn{animation:zpbBtnPulse 1.5s ease-in-out infinite;}',
    '/* W66 (Owner): EVERY Draft button breathes (the top-3 law goes site-wide on the board),\n'
    '   and the top-3 buttons graduate from the pulse to the progression treatment — filled in\n'
    '   the drafting team\'s gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW. */\n'
    'button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}\n'
    'button.resetbtn[data-pick].zpb-ctabig{animation:none;} /* the hero buttons shimmer via the sheen, the brightness pulse retires for them */',
    'pulse-all law', 1)
rep('@media (prefers-reduced-motion: reduce){ tr.zpb-top3 button.resetbtn{animation:none;} }',
    '@media (prefers-reduced-motion: reduce){ button.resetbtn[data-pick]{animation:none;} }',
    'pulse reduced-motion', 1)
rep('const btn = r=> (canPick && r.slot) ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${r.p[0].replace(/"/g,\'&quot;\')}" data-slot="${r.slot}">Draft</button>` : \'\';',
    'const btn = r=> (canPick && r.slot) ? `<button class="resetbtn${top3.has(r.p[0])?\' zpb-ctabig\':\'\'}" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${r.p[0].replace(/"/g,\'&quot;\')}" data-slot="${r.slot}">Draft</button>` : \'\'; // W66 (Owner): the top-3 priority buttons wear the team-colored sheen',
    'top3 hero class', 1)

# ---- 2 · RETURN TO AUTO LINEUP — renamed, and honest: hidden until the user has moved someone ----
rep('${modelDiff?\'\':\'display:none;\'}">RETURN TO MODEL LINEUP</button>',
    '${(modelDiff&&roster._zpbTouched)?\'\':\'display:none;\'}">RETURN TO AUTO LINEUP</button>',
    'auto lineup button', 1)
rep("// w47: RETURN TO MODEL LINEUP shows when the lineup no longer matches the model's",
    "// w66 (Owner): RETURN TO AUTO LINEUP shows only once the user has actually touched the\n// lineup (roster._zpbTouched) AND it no longer matches the math's auto lineup — never on first paint",
    'auto lineup comment', 1)
rep("// w47 (Owner): RETURN TO MODEL LINEUP restores the math's lineup",
    "// w66 (Owner): RETURN TO AUTO LINEUP restores the math's lineup",
    'auto lineup handler comment', 1)
rep("const ok = movePlayerToSlot(roster, sel.value, sel.dataset.lineup);\n  if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');\n  onChange();\n }));",
    "const ok = movePlayerToSlot(roster, sel.value, sel.dataset.lineup);\n  roster._zpbTouched = true; // w66 (Owner): a real user move — the AUTO door may show now\n  if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');\n  onChange();\n }));",
    'live editor touched', 1)
rep("const ok = zpbStageMove(zpbStageOf(roster), v, sl); // w34 (Owner): stage the move — APPLY THE CHANGES commits it\n   if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');",
    "const ok = zpbStageMove(zpbStageOf(roster), v, sl); // w34 (Owner): stage the move — APPLY THE CHANGES commits it\n   roster._zpbTouched = true; // w66 (Owner): a real user move — the AUTO door may show now\n   if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');",
    'staged editor touched', 1)
rep("if(ac) ac.addEventListener('click', ()=>{ zpbStageApply(roster); rerenderEditor(); if(onChange) onChange(); });",
    "if(ac) ac.addEventListener('click', ()=>{ roster._zpbTouched = true; zpbStageApply(roster); rerenderEditor(); if(onChange) onChange(); }); // w66 (Owner): applying staged moves is a user touch too",
    'apply touched', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 2 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
