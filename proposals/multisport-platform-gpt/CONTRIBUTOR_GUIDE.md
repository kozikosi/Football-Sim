# Contributor Guide for the Multisport Work

Welcome to a long-running product effort. The goal is ambitious: make the current NFL simulator excellent, then add historical NFL and NBA experiences, and eventually expand the platform. You can make a meaningful contribution without touching the same code or files as another contributor. In this project, careful boundaries and reproducible evidence are a sign of speed, not bureaucracy.

This guide is a proposal. Follow the repository’s actual AGENTS.md, task instructions, and Owner decisions when they are more specific.

## Before starting

Read the task packet and confirm:

- Which product and workstream the task serves.
- Whether the task is research, a proposal, implementation, review, or data curation.
- The exact branch and allowed paths.
- Which files or constants are protected.
- What counts as complete and how the result will be checked.
- Who integrates the work and who independently reviews it.
- Whether the task depends on an Owner decision.

If the packet does not identify these, ask the task coordinator to clarify while doing independent read-only work.

## Safe contribution boundaries

- One contributor owns a file or dataset shard at a time.
- Claim the work before editing. Do not silently rewrite another contributor’s in-progress proposal.
- Use a separate branch for independent work. Keep branch names descriptive and identify GPT-authored work with GPT in the branch, commit, or document title when it is a separate proposal.
- Do not edit Claude’s simulator code under the co-architect arrangement. If a GPT implementation is explicitly requested, isolate it and identify it as GPT work for review.
- Never change protected constants, rules, player ratings, or product defaults without explicit approval.
- Do not mix research notes, accepted decisions, and implementation facts. Label each one.
- Do not overwrite source data. Preserve the input and record transformations.
- Keep unrelated formatting or cleanup out of a narrow task.

## Evidence expected

A good contribution states what it changed and how someone else can reproduce the conclusion. Include:

- The exact files inspected or changed.
- Commands or procedures used.
- Relevant output, hashes, screenshots, or data examples.
- The acceptance criteria that passed or failed.
- Any environment limitation or missing prerequisite.
- Assumptions and the cost if they are wrong.
- A concise unresolved-decision list.

For a code plan, inspect interactions with the markup/data it depends on. Function-level review alone is not enough when multiple functions form a user flow. Assemble the relevant artifact and exercise the complete path before calling a plan complete.

For data work, include source attribution, source date/version, transformation, rubric, contributor, and reviewer.

## Task packet template

**Task ID and title:**  
**Workstream and priority:**  
**Task type:** research / proposal / implementation / review / data  
**Accountable owner:**  
**Integrator:**  
**Independent reviewer:**  
**Branch:**  
**Allowed paths:**  
**Protected paths or values:**  
**Question being answered:**  
**Acceptance criteria:**  
**Required commands or evidence:**  
**Dependencies and Owner decisions:**  
**Definition of done:**  

## Completion note template

**Verdict:** pass / fail / partial, with the scope tested  
**Changed files:**  
**Evidence:** exact commands or review method and relevant outputs  
**Coupling or dependencies found:**  
**Assumptions and risk:**  
**Owner decisions still needed:**  
**Recommended next step:**  

## How to disagree productively

Raise a correction with the smallest evidence that resolves it. Say which fact is wrong, show the source or command, explain whether the consequence is local or cross-cutting, and offer a practical correction. Do not treat confidence, seniority, or a model’s fluent explanation as proof. Do not bury a critical disagreement in a general review summary.

The project benefits from the range of perspectives Claude, GPT, and other council members can provide. Keep critique specific and generous: protect one another’s time, preserve good work, and make the next action clear.
