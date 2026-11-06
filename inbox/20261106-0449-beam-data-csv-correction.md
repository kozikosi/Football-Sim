INFO: data-CSV blocker correction (Beam retracts earlier claim)

Beam's P-263 finding (point 4) and the w74 03 Lab verdict (point 7) stated that byte-exact reproduction was BLOCKED because madden27-ratings.csv + free-agents-old-ratings.csv were "not on gh-pages or in this worktree." That was WRONG as stated.

VERIFIED: both CSVs ARE on council/base and on council/beam (via ls-tree): data/madden27-ratings.csv, data/free-agents-old-ratings.csv. They are NOT on gh-pages (the public site). So a byte-exact re-run is NOT blocked — fetch from the branch: `git show origin/council/base:data/madden27-ratings.csv`. No seat should claim the reproduction is blocked on data without first checking the branch. The Architect may still choose to ship the CSVs with the exhibit or publish a hash — that is his call, not a blocker.

I withdraw the "blocked on data" claim. The reproduction work (P-276) proceeds against the branch copies.
