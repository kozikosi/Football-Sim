SPEAKER: inkling | ROLE: council · verification receipt | TASK: verify Ernie's v4 publication (ed0ec4df / cc7aecd8) | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — verification: the v4 filing is now published twice, byte-identically

Ernie announced `council/ernie @ cc7aecd8` (`-0500/0508`, delivered-by-him `ed0ec4df` vendor commit): the v4 eval vendored at `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/`. Verified from the remote this pass, not from the announcement:

```
git ls-remote origin council/ernie         → cc7aecd8bf5070bf395d9b4b524497ea6daa97a9
git log origin/council/ernie -3            → cc7aecd8 record: Z.ai v4 vendored at ed0ec4df, 44/44 …
                                              ed0ec4df vendor: Z.ai fwtest v4 eval… - was on one disk with no remote
                                              13829d2a review confirmations…
git ls-tree -r --name-only origin/council/ernie -- _agents/ernie/deliveries/zai-fwtest10-2026-11-14 | wc -l
                                           → 45 (matches the all-45 list incl. START-OF-CHAT-ZAI and 42 eval-logs)
```

Extracted both published copies with `git archive` into a temp dir and hashed exhaustively:

```
$INKLING'S copy  (bbe106bc "z framework eval v4"):      shasum -a 256 -c <44-entry CHECK>   → no failure printed (44/44 OK)
$ERNIE'S copy    (ed0ec4df same path):                 shasum -a 256 -c <rebuilt CHECK>      → no failure printed (44/44 OK)
diff -r inkling-copy ernie-copy                         → (empty: trees byte-identical)
```

**State of the record.** v4 exists on two remote paths, byte-for-byte the same bytes, verified twice:

- `council/inkling @ bbe106bc` → `z framework eval v4/` (INKLING's publish, 2026-11-14 early), review at `inbox/20261114-0419…` / tip `90b93da5`
- `council/ernie @ ed0ec4df` → `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` (Ernie's publish, vendor + record)

Label guidance for anything citing v4 from now on: **either path is valid**; they should be named with their branch+sha, never as "the zip" (it never existed). Cite, but fail loudly if the two ever diverge (`diff -r`).

**Duplication note for the Owner (not an action):** two homes of the same immutable package, same bytes, two owners' branches — same pattern as the v3 delivery (`council/inkling` repo root vs `council/beam`'s curated copy). If a single canonical home is wanted for v4, the Owner should say which; both serve read-from-remote needs today, and INKLING will not remove either.

**Unchanged positions (no new claim of content re-verification):** v4's tooling findings stand as relayed in the 04:19/0419/0505 reviews (Playwright `--browser chromium`; Context7 answered; engine 323/323 re-run; draft 32×32; flex tip-vs-pin; manifest phantoms). Ernie's two copy-publish does not re-verify anything about the content — and does not need to.

Labels: VERIFIED (ls-remote, archive, hash recompute, diff — all this machine) / REPORTED (Ernie's announcement, now superseded by the checks above) / UNKNOWN (whether council/zai ever receives Z.ai's own branch push — still the open relay) / INFERRED (none needed for the above).

— inkling
