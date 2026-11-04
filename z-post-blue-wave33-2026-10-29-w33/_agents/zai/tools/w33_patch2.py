#!/usr/bin/env python3
# w33_patch2.py — wave 33 stage 2: the draft.
# R2  · three new rounds: WR4, TE3, DL5 become real roster slots (28 -> 31)
# R3  · the GONE column becomes per-player truth; the CPU "miss" reach stays within a few board spots
# R14 · the draft-board WINS and PRIORITY columns carry one decimal (Owner's integer-law exception)
# R15 · unhighlighting a position chip removes those players even when they could flex
import sys

SRC = '/home/z/my-project/scripts/w33_stage1.html'
DST = '/home/z/my-project/scripts/w33_stage2.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- R2 · the roster grows to 31 slots ----------
add(
"const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];\nconst TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/CB4/SS2/FS2/WR4/P/FB",
"const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','WR4','TE1','TE2','TE3','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DL5','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];\nconst TOTAL_ROUNDS = ROSTER_SLOTS.length; // 31 — w33 (Owner): WR4, TE3 and DL5 are drafted now — three new rounds on the draft board"
)

add(
"""const NATURAL_SLOT_MAP = {
 QB:['QB'], HB:['RB1','RB2','FB'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'],
 LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
 DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'],""",
"""const NATURAL_SLOT_MAP = {
 QB:['QB'], HB:['RB1','RB2','FB'], WR:['WR1','WR2','WR3','WR4'], TE:['TE1','TE2','TE3'],
 LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
 DT:['DT1','DT2','DL5'], REDG:['DE1','DE2','DL5'], LEDG:['DE1','DE2','DL5'],""")

add(
"const SLOT_FAMILY = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K'};",
"const SLOT_FAMILY = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',WR4:'WR',TE1:'TE',TE2:'TE',TE3:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DL5:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K'}; // w33 (Owner): the WR4 / TE3 / DL5 slots join the flex families"
)

add(
"const WV_SLOT_GROUP = {DE1:'EDGE',DE2:'EDGE',DT1:'DT',DT2:'DT',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',MIKE:'LB',WILL:'LB',SAM:'LB',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',K:'K',FB:'RB',P:'K'};",
"const WV_SLOT_GROUP = {DE1:'EDGE',DE2:'EDGE',DL5:'EDGE',DT1:'DT',DT2:'DT',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',MIKE:'LB',WILL:'LB',SAM:'LB',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',WR4:'WR',TE1:'TE',TE2:'TE',TE3:'TE',K:'K',FB:'RB',P:'K'};"
)

# DEFAULT_WEIGHTS: make sure the new slots carry weights
add(
'"WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 80, "TE2": 20,',
'"WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 80, "TE2": 20, "TE3": 5,')

# find DL5 weight: DE2 sits before DT1 in DEFAULT_WEIGHTS; append DL5 after DE2's weight
add(
'"DE1": 350, "DE2":',
'"DE1": 350, "DL5": 5, "DE2":', n=1)

# ---------- R2b · the depth slots play: WR4 / TE3 join the offense detail, DL5 joins the defense detail ----------
add("const pers = stats.pers || '11', mixW = pers==='11' ? {'11':1} : {[pers]:0.6, '11':0.4};\n const ON = {'11':{WR1:1,WR2:1,WR3:1,TE1:1,TE2:0,RB1:1,RB2:0}, '12':{WR1:1,WR2:1,WR3:0,TE1:1,TE2:1,RB1:1,RB2:0}, '13':{WR1:1,WR2:0,WR3:0,TE1:1,TE2:1,RB1:1,RB2:0},\n             '21':{WR1:1,WR2:1,WR3:0,TE1:1,TE2:0,RB1:1,RB2:1}, '22':{WR1:1,WR2:0,WR3:0,TE1:1,TE2:1,RB1:1,RB2:1}};\n const FLOOR = {WR1:1,WR2:0.55,WR3:0.30,TE1:0.70,TE2:0.22,RB1:1,RB2:0.18};",
 "const pers = stats.pers || '11', mixW = pers==='11' ? {'11':1} : {[pers]:0.6, '11':0.4};\n const ON = {'11':{WR1:1,WR2:1,WR3:1,WR4:0,TE1:1,TE2:0,TE3:0,RB1:1,RB2:0}, '12':{WR1:1,WR2:1,WR3:0,WR4:0,TE1:1,TE2:1,TE3:0,RB1:1,RB2:0}, '13':{WR1:1,WR2:0,WR3:0,WR4:0,TE1:1,TE2:1,TE3:1,RB1:1,RB2:0},\n             '21':{WR1:1,WR2:1,WR3:0,WR4:0,TE1:1,TE2:0,TE3:0,RB1:1,RB2:1}, '22':{WR1:1,WR2:0,WR3:0,WR4:0,TE1:1,TE2:1,TE3:0,RB1:1,RB2:1}};\n const FLOOR = {WR1:1,WR2:0.55,WR3:0.30,WR4:0.10,TE1:0.70,TE2:0.22,TE3:0.12,RB1:1,RB2:0.18}; // w33 (Owner): WR4 and TE3 take the field as the rotation slots they now are")
def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:240])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch2 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
