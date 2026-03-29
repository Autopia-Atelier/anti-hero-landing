---
name: Anti Hero product marketing context
description: Core product positioning, audience, value props, and copy direction for Anti Hero / Stewie
type: project
---

Anti Hero is an adversarial AI Agent red-teaming platform. The mascot/agent is named Stewie.

**Why:** Hackathon project targeting AI Agent developers who need to validate their agents before production.

**How to apply:** All landing page copy, CTAs, and feature descriptions should align with this context.

## One-liner
Adversarial AI Agent red-teaming. Proof Payload in your own system — not in our dashboard.

## Core value props (v1)
1. Reproducible PoC — `[HARMLESS MARKER]` written to user's own audit log / Agent interface
2. Diff Gate — CI/CD integration, only tests what changed, 2-minute hard limit
3. MCP + Skills supply chain visualization — exposes hidden instruction layer in MCP tool descriptions; scans SKILL.md for embedded shell commands

## Target audience
Primary: AI Agent developers (pre-production validation + CI integration)
Secondary: Enterprise security teams
Tertiary: AI platform providers

## Key pain points
- "I added system prompt constraints, I should be fine" — false assumption
- MCP tool descriptions have two layers: user-visible vs LLM-received (hidden directives)
- SKILL.md is plain text — no schema, no signature, no sandbox. 36.82% of public Skills have security flaws (Snyk ToxicSkills 2026)
- 88% of orgs report AI Agent security incidents; only 34% have dedicated controls

## Pitch (30-second version)
"Your Agent is live. You don't know how it fails under adversarial conditions."
"88% of orgs have reported AI Agent security incidents. Only 34% have any controls."
"Even Anthropic's own Git MCP Server had 3 chained RCEs — patched 6 months after disclosure."
"We tell you before it fails."

## What we explicitly don't do
- Compliance reports / PDF exports for CISOs
- Generic LLM scanning (that's Garak)
- Fix or harden the AI (that's the system owner's job)
- Destructive production operations

## CLI commands
```
stewie init
stewie run
stewie run --diff
stewie scan --mcp
stewie scan --skills
stewie replay <run-id>
stewie status
```

## Tone
Technical, direct, confident. No buzzwords. Show the attack, don't describe it. The copy should feel like it was written by a security engineer, not a marketing team.
