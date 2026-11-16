# Tree-first UX priorities

Current contract · 2026-11-16. This replaces the accumulated historical layout notes. Detailed rules live in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md); [PRD.md](PRD.md) defines scope and [FEATURE_INVENTORY.md](FEATURE_INVENTORY.md) defines implementation status.

Feature importance determines screen prominence, not whether truth, privacy or recovery are optional.

| Priority | User job | Interaction home |
|---|---|---|
| Core | Explore people and understand connections | Immersive tree, direct selection and pan/pinch; deterministic relationship graph |
| Core | Create a trustworthy tree from memories | Add a memory dock in the tree; original words, live drafts and explicit review |
| Core | Recover orientation | One contextual Whole family action for scope, or Fit view for a moved complete graph |
| Supporting | Try the chart suited to a question | Ten visible, quiet text choices; horizontal scrolling and explicit keyboard activation |
| Supporting | Understand a person's life and evidence | Life & sources on demand; full-height side panel, including narrow screens |
| Supporting | Correct uncertain identity and relationships | At the review step, with quotes, ambiguous matches and explicit approval |
| Supporting | Compare people, find a name, explore geography, ask a question | More; these tools do not accumulate permanent launchers |
| Evidence expansion | Search archives and attach discoveries | Sources in the relevant profile; record searches, references and accepted changes |
| Future foundation | Canonical bios, corrected-name library, durable drafts | Existing profile/review flow; not new explorer buttons |
| Tier two | Documents, extraction, chunking and retrieval | Planned local document library and contextual profile ingestion |
| Ownership | Export, restore, encrypted storage and private sync | Explicit data settings; planned encryption/sync must not be implied today |
| Maintainer tools | Models, evals, project docs and diagnostics | Options, More and repository documentation |

## State hierarchy

Default explorer has the tree, chart choices, Add a memory, More and selected-person disclosure. No unsolicited profile/search/chat panel. Selection updates emphasis; disclosure opens the biography. Profile close restores focus without changing identity or data.

A scoped branch offers Whole family. A complete graph with a moved camera offers Fit view. A fitted complete graph needs no duplicate recovery. Accessible explicit zoom controls remain in More alongside gestures and keyboard navigation.

Memory idle offers Speak; recording offers Stop; stable proposals expose Review. Options holds setup, transcript/text alternative, diagnostics and sample. The fictional sample is labelled, unsavable and clearable. No idle row of disabled future steps.

The chart strip remains visible and scrollable. Arrow keys move between choices without unexpectedly activating another chart; activation is explicit. Views preserve selected identity and make scope meaningful.

## Quality and limits

Use the task protocols and expert anchors in [DESIGN_EVALS.md](DESIGN_EVALS.md). Current evidence is recorded in [the design-system review](reviews/2026-11-16-design-system.md). Deterministic checks catch registered rule violations; they cannot establish taste or physical-device usability. Dense graph readability and real voice reliability still need dedicated work.
