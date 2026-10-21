#!/usr/bin/env python3
"""Generate a qualitative council contribution ranking from an audited ledger.

This script discovers speakers and formats reviewer judgments. It does not infer
merit, compute personality scores, or rank members automatically.
"""
from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LEDGER = ROOT / "council" / "scorecard" / "events.jsonl"
OUTPUT = ROOT / "COUNCIL-SCORECARD.md"
CONFIDENCE = {"higher", "moderate", "low", "unassessed"}
EVIDENCE_STATUS = {"VERIFIED", "REPORTED", "INFERRED", "UNKNOWN"}


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
        for key in ("event_id", "event_type", "date"):
            if key not in event:
                raise SystemExit(f"{LEDGER}:{line_number}: missing {key}")
        if event["event_id"] in ids:
            raise SystemExit(f"{LEDGER}:{line_number}: duplicate event_id {event['event_id']}")
        ids.add(event["event_id"])
        if "ratings" in event or "score" in event:
            raise SystemExit(
                f"{LEDGER}:{line_number}: numeric rating found; v2 uses qualitative evidence only"
            )
        if event["event_type"] == "ranking_snapshot":
            members = event.get("members")
            if not isinstance(members, list) or not members:
                raise SystemExit(f"{LEDGER}:{line_number}: ranking snapshot needs members")
            names: set[str] = set()
            ranks: set[int] = set()
            for member in members:
                for key in ("speaker", "rank", "confidence", "strengths", "limits", "assignment_fit"):
                    if key not in member:
                        raise SystemExit(f"{LEDGER}:{line_number}: ranking member missing {key}")
                if member["speaker"] in names:
                    raise SystemExit(f"{LEDGER}:{line_number}: duplicate ranked speaker {member['speaker']}")
                names.add(member["speaker"])
                if not isinstance(member["rank"], int) or member["rank"] < 1:
                    raise SystemExit(f"{LEDGER}:{line_number}: rank must be a positive integer")
                if member["rank"] in ranks:
                    raise SystemExit(f"{LEDGER}:{line_number}: duplicate rank {member['rank']}")
                ranks.add(member["rank"])
                if member["confidence"] not in CONFIDENCE - {"unassessed"}:
                    raise SystemExit(f"{LEDGER}:{line_number}: invalid ranking confidence")
            if ranks != set(range(1, len(ranks) + 1)):
                raise SystemExit(f"{LEDGER}:{line_number}: ranking must use consecutive ranks")
        elif event["event_type"] in {"task_observation", "forwarded_excerpt"}:
            for key in ("speaker", "task_id", "assessment_status", "assessment", "source", "evidence_status"):
                if key not in event:
                    raise SystemExit(f"{LEDGER}:{line_number}: observation missing {key}")
            if event["evidence_status"] not in EVIDENCE_STATUS:
                raise SystemExit(f"{LEDGER}:{line_number}: invalid evidence_status")
        else:
            raise SystemExit(f"{LEDGER}:{line_number}: unsupported event_type {event['event_type']}")
        events.append(event)
    if not any(event["event_type"] == "ranking_snapshot" for event in events):
        raise SystemExit("ledger has no ranking snapshot")
    return events


def discover_speakers() -> set[str]:
    """Find exact SPEAKER names in contributor-owned Markdown reports."""
    found: set[str] = set()
    agents = ROOT / "_agents"
    if not agents.is_dir():
        return found
    for path in agents.rglob("*.md"):
        try:
            first_line = path.open(encoding="utf-8").readline().strip()
        except (OSError, UnicodeError):
            continue
        match = re.match(r"^SPEAKER:\s*(.*?)\s*\|\s*ROLE:", first_line)
        if match and match.group(1).strip():
            found.add(match.group(1).strip())
    return found


def escape(value: Any) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def make_report(events: list[dict[str, Any]]) -> str:
    snapshots = [e for e in events if e["event_type"] == "ranking_snapshot"]
    current = snapshots[-1]
    ranked = sorted(current["members"], key=lambda member: member["rank"])

    aliases: dict[str, str] = {}
    for member in ranked:
        for alias in member.get("aliases", []):
            if alias in aliases and aliases[alias] != member["speaker"]:
                raise SystemExit(f"alias maps to multiple speakers: {alias}")
            aliases[alias] = member["speaker"]

    def canonical(name: str) -> str:
        return aliases.get(name, name)

    observed_names: set[str] = set()
    for event in events:
        if event["event_type"] != "ranking_snapshot":
            observed_names.add(canonical(event["speaker"]))
            if event.get("forwarded_by"):
                observed_names.add(canonical(event["forwarded_by"]))
    discovered = {canonical(name) for name in discover_speakers()}
    ranked_names = {member["speaker"] for member in ranked}
    unassessed = sorted((observed_names | discovered) - ranked_names, key=str.casefold)

    rank_lines = [
        "# Council Contribution Assessment and Assignment Guide",
        "",
        f"**Snapshot date:** {escape(current['date'])}",
        "",
        "## What this is",
        "",
        "This is a provisional, evidence-informed assessment of demonstrated project contributions and likely assignment fit. It is not a measure of innate intelligence, character, honesty, loyalty, or sabotage risk. The ranking is subjective and updateable; confidence and evidence limits are shown because the samples are uneven.",
        "",
        "Primary receipts and independent reproduction outrank the ranking in every factual dispute. Use placement to help choose who should investigate a problem, never to decide which unsupported claim is true.",
        "",
        "The numeric 0–100 draft is withdrawn. Its numbers are not current standings.",
        "",
        "## Provisional comparative order",
        "",
        "| Rank | Contributor | Confidence | Demonstrated strengths | Limits / context | Best-supported assignment fit |",
        "|---:|---|---|---|---|---|",
    ]
    for member in ranked:
        rank_lines.append(
            "| {rank} | {speaker} ({role}) | {confidence} | {strengths} | {limits} | {fit} |".format(
                rank=member["rank"],
                speaker=escape(member["speaker"]),
                role=escape(member.get("role", "role not recorded")),
                confidence=escape(member["confidence"]),
                strengths=escape(member["strengths"]),
                limits=escape(member["limits"]),
                fit=escape(member["assignment_fit"]),
            )
        )

    rank_lines += [
        "",
        f"**Assessment basis:** {escape(current.get('basis', 'No basis recorded.'))}",
        f"**Assessor:** {escape(current.get('assessor', 'Not recorded.'))}. Independent review: {'yes' if current.get('independently_reviewed') else 'pending'}.",
        "",
        "## Emerging or unassessed contributors",
        "",
        "A narrow, useful contribution can be recognized without forcing a cross-project rank. UNASSESSED means insufficient comparable evidence, not poor performance.",
        "",
        "| Contributor | Standing | Latest evidence | Limits |",
        "|---|---|---|---|",
    ]
    for speaker in unassessed:
        speaker_events = [
            event for event in events
            if event["event_type"] != "ranking_snapshot"
            and (canonical(event["speaker"]) == speaker or canonical(event.get("forwarded_by", "")) == speaker)
        ]
        if not speaker_events:
            rank_lines.append(f"| {escape(speaker)} | UNASSESSED | No audited contribution event recorded yet. | No negative conclusion. |")
            continue
        latest = speaker_events[-1]
        if latest.get("forwarded_by") and canonical(latest["forwarded_by"]) == speaker:
            rank_lines.append(
                f"| {escape(speaker)} | UNASSESSED — forwarding event only | {escape(latest['assessment'])} | No technical contribution is scored from forwarding alone. |"
            )
        else:
            rank_lines.append(
                "| {speaker} | {status} | {assessment} | {limits} |".format(
                    speaker=escape(speaker),
                    status=escape(latest.get("assessment_status", "UNASSESSED")),
                    assessment=escape(latest.get("assessment", "")),
                    limits=escape(latest.get("limitations", "No limits recorded.")),
                )
            )

    observations = [event for event in events if event["event_type"] != "ranking_snapshot"]
    rank_lines += [
        "",
        "## Recent task observations",
        "",
        "| Speaker | Task | Evidence status | Observation | Source / limits |",
        "|---|---|---|---|---|",
    ]
    for event in observations:
        speaker = canonical(event["speaker"])
        if event.get("forwarded_by"):
            speaker += f" (forwarded by {canonical(event['forwarded_by'])})"
        rank_lines.append(
            "| {speaker} | {task} | {evidence} | {assessment} | {source} |".format(
                speaker=escape(speaker),
                task=escape(event["task_id"]),
                evidence=escape(event["evidence_status"]),
                assessment=escape(event["assessment"]),
                source=escape(event.get("limitations", event["source"])),
            )
        )

    rank_lines += [
        "",
        "## How to read and update this report",
        "",
        "- Confidence describes how much evidence supports the comparison, not a person's ability.",
        "- The initial order carries forward an earlier GPT assessment and awaits independent critique. Several entries rely on reported summaries rather than a fresh audit of every source file.",
        "- A later complete ranking snapshot may move contributors when comparable, attributable work justifies a change. The reviewer must state what new evidence changed the order.",
        "- New names appear automatically from exact SPEAKER headers in reports under _agents and from the event ledger. A reviewer adds evidence; no separate roster edit is needed.",
        "- Aliases are combined only when an explicit mapping is recorded in a reviewed ranking snapshot. Original event labels remain visible in the ledger.",
        "- Claude's Architect authority and the Owner's decision authority do not come from this ranking.",
        "",
        "## Superseded numeric draft",
        "",
        "The previous version's weighted 0–100 scores, neutral-prior formula, and numeric ranking threshold have been withdrawn. The old ledger is preserved separately for audit history and must not be used as current standing.",
        "",
    ]
    return "\n".join(rank_lines)


if __name__ == "__main__":
    events = read_events()
    report = make_report(events)
    if len(sys.argv) > 1 and sys.argv[1] == "--check":
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != report:
            raise SystemExit("contribution assessment report is stale; regenerate it")
        print("Contribution assessment matches qualitative event ledger.")
    else:
        OUTPUT.write_text(report, encoding="utf-8")
        print(f"Wrote {OUTPUT.relative_to(ROOT)}")
