# Flex audit — product FLEX vs Owner flex.json

product: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super/Football-Sim-PreColors.html (sha256 40233d6be00e987c)
owner flex source: CUR (hardcoded Pre-Colors role table)
roles: 17 · rules: 107 · mismatches: 60

## QB->FS (D-010)

QB->FS: Owner flex.json = 10, product FLEX.QB = {} => any QB flex = EMERGENCY_PENALTY 8. MISMATCH (D-010).

## CHANGED (16): WR->RB product=6 => owner=4; WR->CB product=4 => owner=6; TE->RB product=6 => owner=4; EDGE->OLB product=2 => owner=0; ILB->SS product=4 => owner=6; ILB->FS product=4 => owner=6; ILB->NICKEL product=4 => owner=6; OLB->EDGE product=6 => owner=4; OLB->DT product=4 => owner=6; OLB->SS product=4 => owner=6; OLB->FS product=4 => owner=6; SS->OLB product=2 => owner=4; SS->CB product=4 => owner=6; SS->ILB product=4 => owner=6; SS->WR product=4 => owner=6; CB->ILB product=4 => owner=6

## ADDED (owner only): QB->FS = 10; RB->FB = 2; RB->WR = 4; FB->RB = 4; FB->TE = 4; WR->NICKEL = 4; WR->DIME = 4; TE->WR = 2; TE->FB = 2; TE->C = 6; TE->OG = 6; TE->OT = 6; TE->EDGE = 6; TE->DT = 6; TE->NICKEL = 6; TE->DIME = 6; OT->FB = 4; OT->RB = 6; OG->FB = 4; OG->RB = 6; C->FB = 4; C->RB = 6; DT->FB = 4; EDGE->FB = 4; EDGE->NICKEL = 6; ILB->ILB = 0; ILB->OLB = 0; ILB->FB = 4; ILB->DIME = 6; OLB->OLB = 0; OLB->ILB = 2; OLB->FB = 6; OLB->DIME = 6; SS->NICKEL = 0; SS->DIME = 0; SS->FB = 6; FS->NICKEL = 0; FS->DIME = 0; CB->NICKEL = 0; CB->DIME = 0; K->P = 0; P->K = 4

## REMOVED (product only): ILB->RB was 6; OLB->RB was 6


FLEXAUDIT MISMATCH: see D-010 / above.
