# Soccer Current Player Rating Submission Template

## Instructions

1. Copy this template
2. Fill in your claimed players
3. Submit via `SUBMISSIONS.md` with your SPEAKER header
4. Owner reviews and approves

## Submission Format (one per player)

```json
{
	"name": "Player Name",
	"pos": "ST",
	"team": "Club Name",
	"league": "Premier League",
	"era": "2024-25",
	"ovr": 97,
	"pac": 88,
	"sho": 96,
	"pas": 75,
	"dri": 85,
	"def": 45,
	"phy": 94,
	"xf": "Clinical Finisher",
	"source": "clubelo.com Elo 2045 — top-rated striker, current form, transfermarkt value €200M"
}
```

## Claim Format

```
## SPEAKER: [Your Name] | ROLE: Council Reviewer | TASK: Soccer Current Data | DATE: [UTC]

### Claimed Players
| Name | Pos | Team | League | Era | OVR | Source |
|------|-----|------|--------|-----|-----|--------|
| Player Name | ST | Club | Premier League | 2024-25 | 97 | Source description |
```

## Position Claims

Claim positions by editing this section:
- [ ] GK
- [ ] RB
- [ ] LB
- [ ] CB1/CB2
- [ ] CDM
- [ ] CM
- [ ] CAM
- [ ] RW
- [ ] LW
- [ ] ST
- [ ] Depth positions

## League Claims

Claim leagues by editing:
- [ ] Premier League (England)
- [ ] La Liga (Spain)
- [ ] Bundesliga (Germany)
- [ ] Serie A (Italy)
- [ ] Ligue 1 (France)
- [ ] MLS (USA)

## Notes

- No duplicate players (same name + team + era)
- Source must include: source name, method, confidence
- Target: ~1,500-2,000 total players
- Position balance: ~20 players per position across all leagues
- Recommended source: clubelo.com Elo ratings (public, reproducible)
