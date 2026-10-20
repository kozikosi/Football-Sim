#!/usr/bin/env python3
"""Print a small ranked batch of open Owner questions from the JSON catalog."""

import argparse
import json
from pathlib import Path
import sys


DEFAULT_CATALOG = Path(__file__).resolve().parent.parent / "owner-questions.json"


def load_questions(path):
    try:
        with path.open("r", encoding="utf-8") as stream:
            payload = json.load(stream)
    except (OSError, json.JSONDecodeError) as error:
        raise ValueError("Could not read question catalog: {}".format(error)) from error

    if not isinstance(payload, dict) or not isinstance(payload.get("questions"), list):
        raise ValueError("Catalog must be an object with a questions list.")

    questions = payload["questions"]
    for item in questions:
        required = ("id", "project", "priority", "status", "question",
                    "recommended_default", "cost_if_wrong")
        if not isinstance(item, dict) or any(key not in item for key in required):
            raise ValueError("Each question must include: {}".format(", ".join(required)))
    return questions


def main():
    parser = argparse.ArgumentParser(
        description="Print the next open conceptual questions for the Owner."
    )
    parser.add_argument(
        "--project",
        default="all",
        help="Project key such as nfl-current, nfl-all-time, nba-current, nba-all-time, soccer, or all.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=5,
        help="Maximum number of questions to print (default: 5).",
    )
    parser.add_argument(
        "--catalog",
        type=Path,
        default=DEFAULT_CATALOG,
        help="Optional path to a different JSON question catalog.",
    )
    args = parser.parse_args()

    if args.limit < 1:
        parser.error("--limit must be at least 1")

    try:
        questions = load_questions(args.catalog)
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2

    selected = [
        item for item in questions
        if item["status"] == "open"
        and (args.project == "all" or item["project"] == args.project)
    ]
    if args.project == "all":
        project_order = {
            "nfl-current": 0,
            "nfl-all-time": 1,
            "nba-current": 2,
            "nba-all-time": 3,
            "portfolio": 4,
            "soccer": 5,
        }
        selected.sort(
            key=lambda item: (
                project_order.get(item["project"], 99),
                item["priority"],
                item["id"],
            )
        )
    else:
        selected.sort(key=lambda item: (item["priority"], item["id"]))
    selected = selected[:args.limit]

    if not selected:
        print("No open questions found for project '{}'.".format(args.project))
        return 0

    print("# Owner questions: {}".format(args.project))
    print()
    print("Choose a default, revise it, or defer the decision. These are recommendations, not existing behavior.")
    for index, item in enumerate(selected, start=1):
        print()
        print("## {}. {} — {}".format(index, item["id"], item["area"]))
        print()
        print("**Question:** {}".format(item["question"]))
        print()
        print("**Recommended default:** {}".format(item["recommended_default"]))
        print()
        print("**Cost if wrong:** {}".format(item["cost_if_wrong"]))
        print()
        print("**Your answer:**")
        print()
        print("**Applies to / version / exceptions:**")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
