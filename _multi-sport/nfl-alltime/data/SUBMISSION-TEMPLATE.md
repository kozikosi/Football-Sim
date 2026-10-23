# NFL All-Time Player Submission Template

**Purpose.** A template for council members to submit all-time NFL player ratings. The Owner and council will review and approve submissions before they enter the database.

**How to use.** Copy this template, fill in the player details, and submit via SUBMISSIONS.md (your own section, S-### ID) or paste directly to the Owner. Include evidence for every rating (career stats, All-Pro selections, Hall of Fame status, etc.).

---

## Submission format

```
### Player: [Name]
- **Position:** [QB/RB1/etc.]
- **Primary team:** [Team name]
- **Era:** [Decade of peak, e.g., "1980s"]
- **OVR:** [0-99]
- **Attributes:** spd/str/agi/cod/inj/awr [0-99 each]
- **X-factor:** [name or null]
- **Source:** [How this rating was derived]
- **Career highlights:** [Pro Bowls, All-Pro, championships, records]
- **Era adjustment:** [None / -2 / -4 / -6 / -8 (with reason)]
- **Submitted by:** [Your name]
- **Date:** [Date]
```

## Example submissions

### Player: Joe Montana

- **Position:** QB
- **Primary team:** San Francisco 49ers
- **Era:** 1980s
- **OVR:** 96
- **Attributes:** spd=72, str=68, agi=78, cod=82, inj=85, awr=99
- **X-factor:** Clutch
- **Source:** Owner input — consensus top-5 all-time QB, era-adjusted from 99 to 96
- **Career highlights:** 4x Super Bowl champion, 3x Super Bowl MVP, 2x NFL MVP, 8x Pro Bowl, Hall of Fame
- **Era adjustment:** -3 (1980s era, less athletic than modern QBs)
- **Submitted by:** Owner
- **Date:** 20 Oct 2026

### Player: Jerry Rice

- **Position:** WR1
- **Primary team:** San Francisco 49ers
- **Era:** 1990s
- **OVR:** 99
- **Attributes:** spd=90, str=78, agi=92, cod=94, inj=95, awr=99
- **X-factor:** YAC
- **Source:** Owner input — consensus #1 all-time WR, no era adjustment needed
- **Career highlights:** 3x Super Bowl champion, 13x Pro Bowl, 10x All-Pro, NFL all-time leader in receptions/yards/TDs, Hall of Fame
- **Era adjustment:** None (1990s was competitive enough; Rice's numbers are timeless)
- **Submitted by:** Owner
- **Date:** 20 Oct 2026

### Player: Lawrence Taylor

- **Position:** DE1
- **Primary team:** New York Giants
- **Era:** 1980s
- **OVR:** 98
- **Attributes:** spd=88, str=95, agi=90, cod=88, inj=88, awr=97
- **X-factor:** Fearmonger
- **Source:** Owner input — consensus top-3 all-time defender, era-adjusted from 99 to 98
- **Career highlights:** 2x Super Bowl champion, 3x Defensive Player of the Year, 10x Pro Bowl, 8x All-Pro, Hall of Fame
- **Era adjustment:** -1 (1980s defense was less athletic but Taylor was transcendent)
- **Submitted by:** Owner
- **Date:** 20 Oct 2026

## Submission guidelines

1. **One player per submission.** Do not batch multiple players in one submission.
2. **Evidence required.** Every rating must be backed by career stats, awards, or cited reference. "I think he's a 95" is not a submission.
3. **Era adjustment must be justified.** State the adjustment and the reason. The Owner will verify.
4. **Position balance.** Check `_multi-sport/nfl-alltime/data/players-template.json` for current position counts. Avoid over-representing any position.
5. **No duplicates.** Check the existing database before submitting.
6. **Source tracking.** Every submission must include a `source` field explaining how the rating was derived.

## Validation

Before submitting, verify:
- [ ] All required fields present (name, pos, team, era, ovr, spd, str, agi, cod, inj, awr, source)
- [ ] OVR is 0-99
- [ ] Attributes are 0-99
- [ ] Pos is a valid NFL position code
- [ ] Team is a valid NFL team name
- [ ] Era is a decade string (e.g., "1980s")
- [ ] Source explains the rating derivation
- [ ] No duplicate (same name + team)
- [ ] Position balance maintained
