# Four-role product team

The four roles were used to review this design-system change and are stored as reusable instructions. `AGENTS.md` routes future contributors through them. They are not four permanently running bots, and no schedule, hosted agent service or model-provider subscription was created.

| Role | Owns | Must return | Handoff |
|---|---|---|---|
| [Product and scope](agents/01-product-scope.md) | Charter, PRD, priorities, feature status | User problem, scope/non-goals, acceptance evidence and trade-offs | Design and engineering receive a bounded job |
| [Design steward](agents/02-design-steward.md) | Design system, state hierarchy, mobile/desktop refinement | Component placement, affected states, UX tasks and visual judgment with evidence | Engineering receives interaction contract; release receives review findings |
| [AI engineering](agents/03-ai-engineer.md) | Implementation and AI opportunity proposals | Smallest viable approach, data flow, provenance, evals, cost/latency evidence and rollback | Product prioritizes; design embeds it in existing flows; release verifies |
| [Release engineering](agents/04-release-engineer.md) | Checks, maintainability, packaging and release | Exact source/artifact identity, gate results, gaps and recovery route | Coordinator integrates and publishes within task authorization |

## Running the team on a change

Ask your coding assistant: “Use the four roles in AGENTS.md to deliver [specific outcome]. Give each worker a distinct scope and integrate their reviews. Do not publish private family data.” The coordinator should load each role's file, pass the same change brief and assign file ownership. The agent runner and models are intentionally not hard-coded; the same roles can be used in different coding tools. Without a multi-agent runner, perform the roles in sequence with the same output contracts.

Every change uses one shared brief: user job, problem evidence, priority, scope, non-goals, affected states, data flows, acceptance tasks and source baseline. A handoff includes exact files/revision, findings with severity, evidence, unknowns and next owner. Reviewers do not need four separate rewrites of the feature.

## Enforcement layers

1. **Source contract:** `npm run check:design` checks registered UI surfaces/actions, token use in the new stylesheet, initial hidden states, duplicated IDs and removal of named redundant controls. It reports exactly what it cannot certify.
2. **Rendered contract:** `dist/design-audit.js` exports `auditDesign(contract)` for browser review. It checks visible registered action families, duplicate action families, permitted variants, measured standalone target dimensions and utility disclosure. It does not contact a model or send telemetry.
3. **Task review:** run the affected DESIGN_EVALS tasks on desktop and narrow layouts, including recovery and failure states. Physical touch/audio remain separate.
4. **Visual review:** a design reviewer records ACCEPT / REVISE / UNASSESSED for the taste anchors with specific evidence. An unexplained score is not accepted.
5. **Release:** tests + source gate + package validation run in CI. Browser and expert checks remain explicit review evidence; CI does not certify them automatically.

## Current evidence

See `docs/reviews/2026-11-16-design-system.md`. The earlier app had accumulated competing control groups and contradictory historical documentation. Product and design agreed on a tree-first composition; AI engineering identified voice reliability and identity correction as higher-value next work than new AI buttons; release engineering found packaging and stale-evidence risks.

Future “always improving” behavior means these roles run at the relevant change/release boundary. Running them repeatedly while nobody is changing the app would require an explicit scheduled workflow, budget and review policy. It must not silently create work, promote models or deploy itself.
