# ONCALL-ROTATION.md — On-Call Rotation

**Status:** Advisory — not yet active (team size < 4). Documenting for future.

---

## 1. Purpose

When the team reaches **4+ active advisory sessions**, an on-call rotation ensures:
- Merge conflicts resolved within 2 hours
- Build breaks fixed within 4 hours
- Mobile regressions caught within 1 hour
- Data corruption recovered within 30 minutes
- Archive recovery within 24 hours

---

## 2. Roles & Responsibilities

| Role | Responsibilities | Escalation |
|------|------------------|------------|
| **Primary On-Call** | First responder for alerts; triage; initial fix or escalate | Escalate to Architect if >30 min |
| **Secondary On-Call** | Backup if primary unavailable; review PRs; run verification | Escalate to Owner if >1 hour |
| **Architect (Claude)** | Final authority on fixes; implements merges; decides trade-offs | Owner |
| **Owner** | Final authority on promotions, scope, priorities | — |

---

## 3. Rotation Schedule

| Week | Primary | Secondary | Notes |
|------|---------|-----------|-------|
| Week 1 | TBD | TBD | |
| Week 2 | TBD | TBD | |
| Week 3 | TBD | TBD | |
| Week 4 | TBD | TBD | |

**Rotation:** Weekly, Monday 00:00 UTC. Handoff via `COUNCIL-BULLETIN.md` message.

---

## 3. Alert Triggers & Response Times

| Alert Type | Detection | Response Time | Escalation |
|------------|-----------|---------------|------------|
| **Build Break** (`node --check` fails) | CI / manual | 15 min | Architect |
| **Merge Conflict** | Git push rejection | 30 min | Architect |
| **Mobile Regression** (390px overflow) | `phone.js` / `post-merge-smoke.mjs` | 1 hour | Primary On-Call |
| **Build Break** (E2E gate fails) | `post-merge-smoke.mjs` exit ≠ 0 | 2 hours | Architect |
| **Mobile Regression** (layout break) | `phone.js` / `cdp-phone-check.mjs` | 1 hour | Primary On-Call |
| **Data Corruption** (hash mismatch) | Hash gate failure | 30 min | Architect |
| **Archive Recovery** | Missing file/hash | 24 hours | Owner |
| **Archive Recovery** | Missing file/hash | 24 hours | Owner |
| **Merge Conflict** | Git push rejection | 30 min | Architect |

---

## 4. Runbooks

### 4.1 Build Break (Syntax Error)
```bash
# 1. Identify failing file
node --check "NFL Draft Simulator.html"
# 2. Locate syntax error
# 3. Fix in candidate branch (merge/v20-donor)
# 5. Push fix
# 6. Re-run node --check
```

### 4.2 Merge Conflict
```bash
# 1. Identify conflicting files
git status
# 2. Resolve conflicts (prefer donor for math, v20 for visual)
# 3. git add <resolved>
# 6. git commit -m "Resolve merge conflict: <reason>"
```

### 4.3 Mobile Regression (390px Overflow)
```bash
# 1. Run mobile lint
node tests/phone.js "candidate.html"
# 2. Identify overflowing elements
# 3. Fix CSS (override fixed widths, add @media 390px)
# 7. Re-run phone.js + post-merge-smoke.mjs
```

### 4.4 E2E Gate Failure
```bash
# 1. Run smoke test
node _agents/minimax/tools/post-merge-smoke.mjs candidate.html
# 2. Check exit code & JSON receipt
# 3. Diagnose: A (report crash), B (overflow), C (errors), D (incomplete)
# 7. Fix root cause in candidate branch
# 8. Re-run smoke test
```

### 4.5 Data Corruption (Hash Mismatch)
```bash
# 1. Verify hash gate
node tests/funcdiff.js candidate.html donor.html --hashes
# 2. Identify drifted function
# 3. Restore from donor (math core) or v20 (visual)
# 9. Re-run hash gate
```

### 4.6 Archive Recovery
```bash
# 1. Identify missing file/hash
# 2. Check CHRONICLE.md for last known good hash
# 3. Restore from git history or mirror
# 4. Verify with sha256
```

---

## 5. Communication

### Alert Channels
| Channel | Purpose |
|---------|---------|
| `COUNCIL-BULLETIN.md` | All alerts, status updates |
| `CHRONICLE.md` | Incident timeline |
| Owner relay | Direct to Architect (Claude) |

### Handoff Template (End of Shift)
```
**Handoff: <Date> <Time> UTC**
**Outgoing:** <Name> | **Incoming:** <Name>
**Active Alerts:** <list>
**Open Issues:** <list>
**Pending Verifications:** <list>
**Context:** <any relevant context>
**Next Check:** <time>
```

---

## 6. Escalation Matrix

| Level | Trigger | Action | Owner |
|-------|---------|--------|-------|
| L1 | Single alert, auto-resolved | Log & monitor | Primary |
| L2 | Recurring (>2 in 1 hour) | Investigate & fix | Primary → Architect |
| L3 | User-facing impact | Immediate fix + postmortem | Architect → Owner |
| L4 | Data loss / corruption | Emergency freeze + recovery | Owner |

---

## 6. Postmortem Process

After any L3/L4 incident:
1. **Incident logged** in `INCIDENT-LOG.md` within 1 hour
2. **Root cause analysis** within 24 hours
3. **Prevention** added to `PREVENTION.md` (new file) or `INCIDENT-LOG.md`
3. **Postmortem** shared in `COUNCIL-BULLETIN.md` within 48 hours

---

## 7. Contact Matrix

| Role | Agent | Contact Method |
|------|-------|----------------|
| Owner | User | Bulletin relay |
| Architect | Claude | Owner relay |
| Verifier | Assigned per round | Bulletin |
| Primary On-Call | Rotating | Bulletin + Chronicle |
| Secondary On-Call | Rotating | Bulletin + Chronicle |

---

## 8. Rotation Rules

1. **Volunteer first** — sessions opt in
2. **Round-robin** — if no volunteers, rotate alphabetically by agent name
3. **No back-to-back** — minimum 1 week off between shifts
4. **Swap allowed** — with mutual agreement, log in `COUNCIL-BULLETIN.md`
4. **Coverage** — at least one session on duty at all times (UTC coverage)

---

## 9. Tools & Access

| Tool | Access | Purpose |
|------|--------|---------|
| GitHub repo | Architect + Owner | Push, tag, rename |
| MCP Server | Architect | GitHub read/write |
| Playwright | Verifier | E2E testing |
| Node.js | All | Syntax check, funcdiff, lint |
| COUNCIL-BULLETIN.md | All | Communication |

---

## 9. Activation Criteria

This rotation becomes **active** when:
- [ ] ≥ 4 active advisory sessions
- [ ] Owner declares "on-call active"
- [ ] At least 2 sessions volunteer for primary/secondary

Until then, **the Architect (Claude) handles all incidents directly** via Owner relay.

---

## 10. Review & Update

- **Quarterly** — Review rotation effectiveness
- **After each L3/L4 incident** — Update runbooks
- **Annually** — Full rotation policy review

---

*This document becomes active when the Owner declares the on-call rotation active. Until then, the Architect handles all incidents directly via Owner relay.*