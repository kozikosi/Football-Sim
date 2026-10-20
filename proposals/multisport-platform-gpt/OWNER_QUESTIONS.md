# Owner Concept Questions

**Purpose:** Give the Owner a manageable way to define concepts that affect simulation behavior. The attached generator prints up to five open questions for one project. It does not make decisions or modify the question catalog.

Question data lives in owner-questions.json. Run from the repository root:

    python3 proposals/multisport-platform-gpt/tools/generate_owner_questions.py --project nfl-current

Other examples:

    python3 proposals/multisport-platform-gpt/tools/generate_owner_questions.py --project nba-current --limit 3
    python3 proposals/multisport-platform-gpt/tools/generate_owner_questions.py --project all

Each question is meant to be answerable without reading a large technical document. It includes a recommended default and the cost of choosing incorrectly, so the Owner can answer with a short decision or ask for alternatives.

## Question quality rules

- Ask only questions that change product behavior, architecture boundaries, or data interpretation.
- Check existing code and documents before asking. Do not ask the Owner to rediscover facts available in the repository.
- Ask at most five per batch. Rank by urgency and decision dependency.
- Include a recommended default and the downside of being wrong.
- Separate facts from proposals. Label defaults as recommendations, not existing behavior.
- Offer a reversible path where possible.
- Bundle tightly related choices only when one answer genuinely determines the others.
- Keep detailed low-level questions in a later batch.
- When the Owner answers, record the answer as a decision with date, scope, and any follow-up. Update the question status rather than duplicating the question in another document.
- If the response is ambiguous, ask one focused follow-up and continue unrelated work.

## Initial high-value questions to review

The JSON catalog contains the fuller list. Start with the question generator’s top-ranked items. Particularly important decisions include:

### NFL flex and roster rules

- Which player positions can fill each flex slot?
- Are there limits on how many of a position group can occupy flex slots?
- Do flex slots change by formation, roster, or season mode?
- Should a flex player’s value use their listed position, the slot they occupy, or a role-specific contribution?
- Is the all-time roster built from player peak, career, or a defined prime?

These answers affect eligibility, replacement players, positional value, simulation outcomes, and how roster choices are presented.

### NBA roster and rotation concepts

- How many players are active, selected, and actually used in a game?
- Does the user draft a roster and then assign a five-player lineup, or should the engine select lineups and rotations?
- Should positions be fixed, multi-position, or modeled as skills/roles?
- What should minutes, fatigue, injuries, and usage contribute to the first simulation?
- Does the user prefer a historical or current ruleset for game and season structure?

### All-time rating concepts

- Is greatness measured by peak season, best multi-year prime, career value, or an explicit blend?
- How should era differences affect ratings and simulation rules?
- Are current players included in all-time pools by default? What qualifies as “top current”?
- Should the suggested minus-five adjustment apply to every rating dimension, an overall value, or a selected set?
- How should uncertainty and disputed player placement be represented?

### Soccer product concept

- What does a “draft season simulation” mean in a sport where roster acquisition is usually transfers, academies, and contracts?
- Should every eligible league use a shared transfer/draft concept or should the interaction model vary?
- Which season, country, club count, roster rules, and competition format are represented?
- Is the initial scope men’s domestic league tables only, based on the dated Opta ranking snapshot, or should women’s leagues and cups be separate future products?

## Answer format

The Owner can respond in plain language:

**Decision:**  
**Applies to:**  
**Effective version:**  
**Exceptions:**  
**Open follow-up:**  

The coordinator should then write a decision record, link the evidence or discussion, and update the relevant catalog entry to answered. Do not silently edit engine behavior just because an answer appears in chat; translate it into a reviewed task with acceptance criteria.
