# Family History Tree App — working agreement

Read the current product charter and design system before changing the app. The user's latest instructions govern scope and override these defaults. Never infer private-data publication or message-sending permission from this file.

## Four review roles

Use these roles for substantive changes, with explicit bounded assignments. If subagents are available, dispatch the relevant roles independently; the coordinator integrates their findings. With one worker, perform the same reviews sequentially and label them role reviews, not separate agents. These files are reusable operating instructions, not installed services or autonomous scheduled jobs.

1. **Product / scope** — `docs/agents/01-product-scope.md`: user job, PRD, scope, priority and status honesty.
2. **Design steward** — `docs/agents/02-design-steward.md`: interaction hierarchy, design components, mobile/desktop evidence and refinement.
3. **AI / development** — `docs/agents/03-ai-engineer.md`: bounded implementation and grounded AI opportunities with evals.
4. **Release / maintainability** — `docs/agents/04-release-engineer.md`: verification, packaging, provenance, drift, rollout and rollback.

The coordinator owns shared app code and publication. Give workers distinct file ownership; no concurrent writes to the same file. Reviewers must not silently expand scope or claim approvals for one another. A reviewer disagreement is resolved against the user job and evidence, with the trade-off documented.

## Before implementation

Read `docs/PRODUCT_CHARTER.md`, `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/DESIGN_EVALS.md` and the relevant feature/eval docs. State the problem, intended user outcome, explicit non-goals, current data/privacy limits and affected UI states. New features must name an existing interaction/component home; a new top-level button requires product rationale and design review.

## Implementation rules

- The tree is the workspace. Do not turn the default explorer into toolbars, cards and panels.
- Keep chart choices visible as a quiet selection component. Keep search/chat/zoom utilities inside More. Profiles open on demand.
- Register changed governed action families in `design/contract.json`; use the dedicated token/component layer. Do not add a registration just to make a failing check pass.
- One contextual recovery action handles scope or camera changes. It must update after pan, pinch, chart change and filter change.
- Memory input shows the current action, not disabled future steps. Original words, draft status and explicit approval are retained.
- Model output is untrusted. Relationship facts come from graph code; generated changes remain proposals. Preserve citations, uncertainty, corrected spellings and source conflicts.
- Use fictional fixtures. No keys, recordings, exports or real family files in code, public reports or release archives.
- Prefer small cohesive modules and removal of obsolete paths over appended override layers. Record legacy debt instead of claiming it is migrated.

## Before completion/publication

Run `npm test` and `npm run check:design`. For packaging run `python3 scripts/package-source.py` and `npm run check:package`. Inspect affected browser states on narrow and desktop layouts. Apply the UX tasks and expert anchors in DESIGN_EVALS; do not equate a source check or model-generated opinion with usable or tasteful design. Record PASS / FAIL / NOT RUN / BLOCKED and supporting observations. Real touch, real audio, real model quality and security claims need their own evidence.

No automatic model/prompt promotion or self-deployment based only on an LLM score. Publish only within existing task authorization and preserve the site's audience. Report the exact source/artifact revision, meaningful tests, known limits and rollback route. Never describe planned privacy or storage features as implemented.
