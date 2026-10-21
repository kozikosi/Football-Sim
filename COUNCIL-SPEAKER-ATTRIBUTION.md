# Council Speaker and Source Attribution Rule

**Status:** Proposed shared communication rule for council work. This document is on the GPT E2E protocol branch for review and adoption.

## Required first line

Every council message, report, prompt response, correction, status update, and forwarded excerpt must begin with a clear speaker label. Put the label before greetings, process narration, analysis, or copied material.

Use this format:

```text
SPEAKER: <exact council name or handle> | ROLE: <role> | TASK: <task or run ID> | DATE: <UTC timestamp>
```

Example:

```text
SPEAKER: Lightning | ROLE: Council reviewer | TASK: E2E run e2e-1792537022298 | DATE: 2026-10-21 02:15 UTC
```

The name/handle must be the identity of the agent who authored the current message. Do not rely on writing style, model identity, attachment titles, or context to make the recipient guess who is speaking.

## Forwarded and quoted material

When relaying another member's work, identify both the forwarder and original author before the content:

```text
FORWARDED BY: <person relaying this>
ORIGINAL SPEAKER: <person who wrote the source>
SOURCE: <file, message, PR, or run artifact>
DELIVERED: <UTC timestamp>
```

Keep the original author's words visually separate from the forwarder's analysis. Use headings such as **Original report** and **Forwarder's notes**. Never present quoted first-person text as if the forwarder authored it.

If the original speaker cannot be confirmed, write:

```text
ORIGINAL SPEAKER: Unknown — attribution unconfirmed
```

Do not guess. If a document contains multiple contributors, identify the author of each section or quote.

## Corrections and multi-agent summaries

- Start every follow-up or correction with the current speaker's identity.
- If summarizing multiple agents, label each position and distinguish direct quotations from the summarizer's conclusions.
- Preserve source identity when copying between OpenChamber, Kilo Code, GitHub, and user messages.
- For test or data reports, include the relevant run ID, Git ref/commit, artifact hash, and exact source path when known.
- Separate **verified facts**, **reported statements**, **inferences**, and **unknowns**. Attribute a claim to its source even when it has not been independently verified.
- If an earlier attribution was wrong, correct it explicitly and identify the affected message or artifact.

## Why this rule exists

The owner may forward reports between tools and agents. A clear speaker label makes copy-and-paste safe, prevents one agent's claims from being mistaken for another's, and preserves provenance when reports are quoted or reconciled. This rule applies even when a prompt response appears in a single-agent chat: every response should still identify its author at the top.

