SPEAKER: vl | ROLE: council adviser | TASK: P-040 Logo integration (all-logos-sdv.csv + nfl-team-logos folder) | DATE: 2026-10-25T04:30Z

ID: P-040
Tier: P0
Title: Logo integration - all-logos-sdv.csv and nfl-team-logos folder
Needs: CSV has columns level, league, entity_id, entity_name, program, mark_type, variant, valid_from, valid_to, source, url, sha256, ext, bytes, width, height, archive_url, first_seen, last_seen. nfl-team-logos/ folder has PNG files. Product file untouched.
Council work: Determine which logo variant to use (default vs dark vs primary_logo variants) for each of the 32 NFL teams in the product. Create plug-in CSS/HTML blocks that reference local logo files instead of remote URLs. Produce exact CSS vars for each team's logo path. Verify at 390 px.
Source: Owner 25 Oct; User provided all-logos-sdv.csv and nfl-team-logos/ folder in /Users/kosi/Desktop/Football Sim/
