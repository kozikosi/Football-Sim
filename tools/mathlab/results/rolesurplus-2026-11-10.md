# rolesurplus: role-specific star surplus vs the constant 20 (read-only, 10 Nov 2026)

role  starters(32 teams)  pool  star(P90 of starters)  replacement(first non-starter)  s_role
QB      32    92   95   73   22
WR     128   207   89   72   17
OT      64   134   93   72   21
OG      64   140   89   72   17
C       32    68   88   70   18
TE      96   139   84   65   19
RB      64   125   92   74   18
FB      32    16  (no data: no slot of its own or pool no larger than the starter count; s_role = 20 fallback)
EDGE    64   186   93   77   16
DT      64   199   93   76   17
ILB     32    79   87   75   12
OLB     64    94   82   67   15
CB      64   199   90   77   13
NICKEL  32     0  (no data: no slot of its own or pool no larger than the starter count; s_role = 20 fallback)
DIME    32     0  (no data: no slot of its own or pool no larger than the starter count; s_role = 20 fallback)
FS      32    82   88   75   13
SS      32    83   91   76   15
K       32    33   84   73   11
P       32    33   82   73    9

Owner rules compared: 97 (source and destination both have a role weight)

constant s = 20 (flexunify today): 8 rules priced more than 1 OVR below the guard
  FB>RB: Owner 2, guard 18.0
  FB>TE: Owner 6, guard 18.0
  C>OG: Owner 6, guard 10.0
  OG>OT: Owner 2, guard 4.0
  OLB>EDGE: Owner 12, guard 13.8
  OG>EDGE: Owner 6, guard 7.7
  CB>WR: Owner 6, guard 7.7
  TE>OG: Owner 6, guard 7.5

s = role surplus from OVR data: 5 rules priced more than 1 OVR below the guard
  FB>RB: Owner 2, guard 18.0
  FB>TE: Owner 6, guard 18.0
  C>OG: Owner 6, guard 9.0
  OG>OT: Owner 2, guard 3.4
  TE>OG: Owner 6, guard 7.1

Rules with a guard above 0.5 (the guard is doing something): s=20: 32, role surplus: 32

Selected rows (Owner / guard s=20 / guard role-surplus):
  FB>RB: 2 / 18.0 / 18.0
  FB>TE: 6 / 18.0 / 18.0
  C>OG: 6 / 10.0 / 9.0
  C>OT: 12 / 12.0 / 10.8
  C>DT: 12 / 12.0 / 10.8
  TE>OT: 12 / 10.0 / 9.5
  RB>WR: 12 / 12.3 / 11.1
  EDGE>SS: 12 / 0.0 / 0.0
  RB>SS: 12 / 3.3 / 3.0
  OG>OT: 2 / 4.0 / 3.4
  DT>OT: 6 / 0.0 / 0.0
