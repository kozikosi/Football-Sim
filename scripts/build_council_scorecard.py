#!/usr/bin/env python3
"""Generate COUNCIL-SCORECARD.md from the append-only audited event ledger.

This is a transparent formatter and calculator, not an automatic evaluator.
A reviewer must create evidence-backed events; the script discovers speakers from
those events, so there is no separate member roster to maintain.
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LEDGER = ROOT / "council" / "scorecard" / "events.jsonl"
OUTPUT = ROOT / "COUNCIL-SCORECARD.md"

WEIGHTS = {
    "evidence_accuracy": 0.35,
    "technical_reasoning": 0.25,
    "practical_usefulness": 0.20,
    "delivery": 0.10,
    "provenance": 0.10,
}
RATING_KEYS = set(WEIGHTS)
NEUTRAL = 60.0
PRIOR_TASKS = 3


def discover_speakers() -> set[str]:
    """Find new contributors from the required first-line header in their own work folder."""
    found: set[str] = set()
    agents = ROOT / "_agents"
    if not agents.is_dir():
        return found
    for path in agents.rglob("*.md"):
        try:
            first_line = path.open(encoding="utf-8").readline().strip()
        except (OSError, UnicodeError):
            continue
        match = re.match(r"^SPEAKER:\\s*(.*?)\\s*\\|\\s*ROLE:", first_line)
        if match and match.group(1).strip():
            found.add(match.group(1).strip())
    return found


def read_events() -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []
    ids: set[str] = set()
    for line_number, line in enumerate(LEDGER.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError as exc:
            raise SystemExit(f"{LEDGER}:{line_number}: invalid JSON: {exc}") from exc
        for key in ("event_id", "speaker", "task_id", "event_type", "scorable"):
            if key not in event:
                raise SystemExit(f"{LEDGER}:{line_number}: missing {key}")
        if event["event_id"] in ids:
            raise SystemExit(f"{LEDGER}:{line_number}: duplicate event_id {event['event_id']}")
        ids.add(event["event_id"])
        if not isinstance(event["speaker"], str) or not event["speaker"].strip():
            raise SystemExit(f"{LEDGER}:{line_number}: speaker must be a non-empty exact label")
        if event["scorable"]:
            ratings = event.get("ratings")
            if not isinstance(ratings, dict) or set(ratings) != RATING_KEYS:
                raise SystemExit(f"{LEDGER}:{line_number}: scorable event needs exactly {sorted(RATING_KEYS)}")
            if any(not isinstance(v, (int, float)) or not 1 <= v <= 5 for v in ratings.values()):
                raise SystemExit(f"{LEDGER}:{line_number}: ratings must be numeric values from 1 to 5")
            if not event.get("assessor") or not event.get("domain"):
                raise SystemExit(f"{LEDGER}:{line_number}: scorable event needs assessor and domain")
        elif "ratings" in event:
            raise SystemExit(f"{LEDGER}:{line_number}: unscored event must not include ratings")
        events.append(event)

    superseded = {event["supersedes"] for event in events if event.get("supersedes")}
    known = {event["event_id"] for event in events}
    unknown = superseded - known
    if unknown:
        raise SystemExit("supersedes references unknown event(s): " + ", ".join(sorted(unknown)))
    return [event for event in events if event["event_id"] not in superseded]


def weighted_score(ratings: dict[str, float]) -> float:
    return 100 * sum(ratings[key] * weight for key, weight in WEIGHTS.items()) / 5


def adjusted(raw: float, task_count: int) -> float:
    return NEUTRAL + (raw - NEUTRAL) * task_count / (task_count + PRIOR_TASKS)


def dimensions(events: list[dict[str, Any]]) -> dict[str, float]:
    count = len(events)
    mean = {key: sum(e["ratings"][key] for e in events) / count for key in RATING_KEYS}
    raw = weighted_score(mean)
    reliability_raw = (mean["evidence_accuracy"] * 0.70 + mean["provenance"] * 0.30) * 20
    usefulness_raw = (
        mean["technical_reasoning"] * 0.40
        + mean["practical_usefulness"] * 0.40
        + mean["delivery"] * 0.20
    ) * 20
    return {
        "raw": raw,
        "adjusted": adjusted(raw, count),
        "reliability": adjusted(reliability_raw, count),
        "usefulness": adjusted(usefulness_raw, count),
        "reasoning": mean["technical_reasoning"] * 20,
    }


def make_report(all_events: list[dict[str, Any]]) -> str:
    speakers = sorted({e["speaker"] for e in all_events} | discover_speakers(), key=str.casefold)
    active_events = read_events()
    active_ids = {e["event_id"] for e in active_events}
    superseded_ids = {e["event_id"] for e in all_events} - active_ids
    rows = []
    for speaker in speakers:
        events = [e for e in active_events if e["speaker"] == speaker and e["scorable"]]
        process_events = [e for e in active_events if e["speaker"] == speaker and not e["scorable"]]
        task_ids = {e["task_id"] for e in events}
        if len(task_ids) != len(events):
            raise SystemExit(f"{speaker}: duplicate scored task; supersede the old event instead of double-counting")
        domains = {e["domain"] for e in events}
        independent = any(e.get("independently_reviewed") for e in events)
        eligible = len(events) >= 3 and len(domains) >= 2 and independent
        scores = dimensions(events) if events else None
        rows.append({
            "speaker": speaker, "events": events, "process_events": process_events,
            "scores": scores, "eligible": eligible, "domains": domains,
        })

    ranked = sorted(
        (r for r in rows if r["eligible"]),
        key=lambda r: (-r["scores"]["adjusted"], r["speaker"].casefold()),
    )
    unranked = sorted((r for r in rows if not r["eligible"]), key=lambda r: r["speaker"].casefold())
    ordered = ranked + unranked
    snapshot_date = datetime.now(timezone.utc).date().isoformat()
    lines = [
        "# Council Scorecard",
        "",
        f"**Snapshot date:** {snapshot_date} UTC",
        "",
        "Generated from council/scorecard/events.jsonl by scripts/build_council_scorecard.py.",
        "Purpose: observed contribution reliability and usefulness; this is not an intelligence or character ranking.",
        "Rule: primary evidence outranks scores. Provisional entries do not break ties.",
        "",
        "## Current standing",
        "",
        "| Member | Standing | Audited tasks | Composite (adjusted) | Evidence reliability | Practical value | Observed reasoning | Process events |",
        "|---|---|---:|---:|---:|---:|---:|---:|",
    ]
    for row in ordered:
        if row["scores"] is None:
            lines.append(
                f"| {row['speaker']} | UNASSESSED | 0 | — | — | — | — | {len(row['process_events'])} |"
            )
            continue
        s = row["scores"]
        standing = "RANKED" if row["eligible"] else "PROVISIONAL — NOT RANKED"
        lines.append(
            f"| {row['speaker']} | {standing} | {len(row['events'])} | "
            f"{s['adjusted']:.1f}/100 | {s['reliability']:.1f}/100 | "
            f"{s['usefulness']:.1f}/100 | {s['reasoning']:.0f}/100 | "
            f"{len(row['process_events'])} |"
        )
    lines += [
        "",
        "A ranked standing requires at least three distinct audited tasks across two domains and an independent review. A SPEAKER header under _agents/ or an event automatically creates a row; no member roster is maintained.",
        "",
        "## Evidence notes",
        "",
    ]
    for row in rows:
        lines.append(f"### {row['speaker']}")
        if row["scores"] is None:
            lines.append(f"- **Status:** unassessed; {len(row['process_events'])} unscored process event(s). No technical conclusion is drawn.")
        else:
            lines.append(
                f"- **Status:** {'rank eligible' if row['eligible'] else 'provisional'}; "
                f"{len(row['events'])} audited task(s), {len(row['domains'])} domain(s); "
                f"independent review {'present' if any(e.get('independently_reviewed') for e in row['events']) else 'pending'}."
            )
            for event in row["events"]:
                lines.append(f"- **{event['task_id']} ({event.get('date', 'date unknown')}):** {event.get('basis', '')}")
                lines.append(f"  - Assessment: {event.get('assessor', 'not recorded')}. Source: {event.get('source', 'not recorded')}")
                if event.get("limitations"):
                    lines.append(f"  - Limits: {event['limitations']}")
        for event in row["process_events"]:
            lines.append(f"- **Unscored event — {event['event_type']}:** {event.get('basis', '')}")
            lines.append(f"  - Source: {event.get('source', 'not recorded')}")
        lines.append("")
    if superseded_ids:
        lines += ["## Superseded entries", "", "Retained in the append-only ledger and excluded from current scores: " + ", ".join(sorted(superseded_ids)), ""]
    lines += [
        "## Reading this snapshot",
        "",
        "- GPT and Ultra each have one provisional, single-review E2E assessment with identical aggregate scores. They are not ranked; neither score determines whose factual account is accepted.",
        "- Lightning's forwarded excerpt is listed as an unscored provenance event. The original GPT speaker label was retained; the forwarder label was missing. This is not treated as impersonation or evidence of intent.",
        "- Claude is the Architect and is outside this initial advisor comparison. No conclusion about Claude is implied.",
        "- Other historical members are not assigned scores from folder presence or incomparable old reports. New contributors appear automatically when a report in their own _agents/ folder starts with the required SPEAKER header.",
        "",
    ]
    return "\n".join(lines)


if __name__ == "__main__":
    report = make_report(read_events())
    OUTPUT.write_text(report, encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT)}")
