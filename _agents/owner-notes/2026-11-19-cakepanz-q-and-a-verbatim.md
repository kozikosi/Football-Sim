# Owner rulings — 2026-11-19 (cakepanz Q&A, verbatim answers)

Owner answered the 23-question ledger (Ernie, 2026-11-19T01:12Z). Verbatim, question number → answer:

1. has there been any more input about the svelte 5 vs vue 3 debate or is everyone still basically netural 50/50
2. idk you'll have to explain
3. same as above. whatever is best for longterm organizational health.
4. same as above.
5. sounds good. make sure it's not just gold though; the colors should change depending on the selected team.
6. same as above
7. not a lot of words. w89 is a good example.
8. engine value should never appear to the user. model is probably better.
9. i don't know twhat this is
10. explain?
11. 2PT FAIL is nice. i think we should maybe get rid of all the hyphens in the current 2-pt formatting.
12. All.
13. w89 looks good.
14. add it like w89.
15. This should be a snake draft. i don't understand why the 10th pick has different rules from the rest of the rounds.
16. should be avaialbe at any time.
17. this is good if possible.
18. weekly hub? explain
19. later
20. ?
21. claude should decide these
22. w89 should be live until 76 pancakes / colors is done.
23. same as above

## Collated rulings (what each means for the build)

- **Q1 (framework):** Owner asks for status; no ruling yet. See reply — nine arms measured, all green, builder's nose favours Svelte, Architect's written rec favours Vue at LOW confidence, 50/50, unruled.
- **Q2/Q3/Q4 (cutover / re-pin / activate):** "whatever is best for longterm organizational health" → delegate to Architect/MUSE; reversible, proceed on the recommended default.
- **Q5 (light gold2 contrast):** approved — **and it must be team-dependent, not just gold** (the selected team's colours drive the accent, with contrast solved per mode).
- **Q6 (dark --text):** approved (same team-aware note).
- **Q7 (award line):** few words, follow w89.
- **Q8 (Model Value label):** **"Engine Value" must NEVER appear to the user; "Model Value" is preferred.**
- **Q9 (3-4 note):** Owner doesn't know it — needs explanation (it's the D-012 3-4 base text).
- **Q10 ("never print Touchdown" law):** wants it explained.
- **Q11 (2-Pt chip):** keep "2PT FAIL"; **remove all hyphens from the current 2-pt formatting** ("2-Pt Conv" → "2 Pt Conv" / "2PT" style per w89).
- **Q12 (team takeover scope):** **All** surfaces recolour to the selected team.
- **Q13 (fonts):** w89 looks good — keep w89 fonts.
- **Q14 (slogan):** add it like w89.
- **Q15 (flip threshold):** **the draft is a snake; every round should have the SAME rules.** The user's 10th-pick flip is REJECTED as a per-round difference. (This is a NEW ruling that supersedes the "user's 10th pick" implementation.)
- **Q16 (auto-fill / finish my draft):** available at any time.
- **Q17 (offline local telemetry):** approved if possible.
- **Q18 (hub simple mode):** Owner asks "weekly hub? explain" — needs explanation.
- **Q19 (ratings generation):** later.
- **Q20 (1,953-player pool):** Owner asks "?" — needs explanation (it's the frozen player pool).
- **Q21 (lambda / calibration values):** Claude decides.
- **Q22 (gh-pages):** w89 stays live until 76 Pancakes / Colors is done.
- **Q23 (cutover trigger):** same — w89 live until the merge.

## The two that change the build

- **Q15 is a real product change:** the late-draft "simple mode" as a *round-based* flip is out. The Owner wants a snake draft where the rules are the same every round. The "simple" idea may survive only as an always-available *view toggle* (Q16 spirit), not a round-triggered mode. This must go back to the Architect/Z.ai before cakepanz-9 Part B.
- **Q8 kills "Engine Value" as a user-facing label** — the provenance chip idea (hy4) must use "Model Value", never "Engine Value".