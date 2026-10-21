# P3 · nba-current — tasks

## A. The Owner's concept answers (blocking B and C)
- [ ] `Q-OWNER-03` — the flex concept in the NBA
- [ ] `Q-OWNER-14` — the draft shape (2 rounds is thin; league-wide expansion draft?)
- [ ] `Q-OWNER-15` — roster size, rotation, minutes
- [ ] `Q-OWNER-16` — awards, All-NBA shape, playoff presentation

## B. The profile (a seat; fills `ENGINE-SPEC.md` §2 for the NBA)
- [ ] 30 teams, 6 divisions, 2 conferences, 82 games, 41 weeks, 5 byes
- [ ] 16-team playoffs: play-in, 8/8, 4/4, 2, Finals — bracket shape and byes
- [ ] 5 starters + rotation; positions and value weights
- [ ] standings and tiebreakers (playoff seeding, conference records)
- [ ] schedule generation (82 games, 5 byes, no divisional-and-conference silliness)

## C. The matchup model (the real work)
- [ ] unit ratings: offence, defence, pace, 3P%, FT%, TOV, rebounding, rim coverage
- [ ] the expected-points model and its calibration against real NBA margins
- [ ] game-plan adjustments: offensive identity and defensive identity, chosen independently
- [ ] rest, back-to-backs, and late-game behaviour
- [ ] the calibration receipt (predicted vs realised on a sample)

## D. The data
- [ ] the NBA2K → record mapping file (`mapping-nba2k-v1.md`), reviewed by two seats
- [ ] the converter (dependency-free), the validator, a 20-record hand-check
- [ ] `data/nba/current.json` → validation green

## E. Implementation and gates
- [ ] the profile wired into the engine
- [ ] the four gates green on the NBA pack
- [ ] the engine code byte-identical to the NFL pack's engine
