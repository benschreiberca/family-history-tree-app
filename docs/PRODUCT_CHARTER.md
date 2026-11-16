# Family History Tree App — current product charter

Adopted direction: 2026-11-16. This charter consolidates the product intent after the user rejected the growing number of controls and inconsistent interaction design. It governs prioritization; it does not claim that planned capabilities exist. The feature inventory records implementation status.

## Product promise

Turn family recollections and source material into a family tree that people can understand, inspect and correct. The tree is the main workspace. Stories and evidence explain the connections. People retain control of their data and of changes to family truth.

The product is open-source and intended for any family. The public project uses fictional fixtures. An open repository is not permission to publish family records.

## The core loop

**Recall → see a draft connection → resolve identities → approve what is correct → explore the growing family → inspect the story and its evidence.**

A voice note is an easy input, not an excuse to expose a complex transcription workbench. AI helps propose and retrieve; it does not decide who belongs in a family or silently rewrite accepted records. Typed input remains a meaningful alternative.

## Ranked outcomes and interface consequences

| Rank | Outcome | Product implication | Interface implication |
|---|---|---|---|
| 1 | Understand people and their connections | Relationship correctness, readable people and recoverable navigation are fundamental | The immersive tree owns the main surface; touch and pointer exploration work without opening utility panels |
| 2 | Build the tree from natural recollection | Voice/text creates visible, reviewable proposals while work continues | One promoted creation action; recording and review reveal only controls needed in that state |
| 3 | Trust and correct the family record | Identities, uncertainty, conflicts and provenance survive review | Drafts differ from saved records; important uncertainty appears where a decision is made |
| 4 | Learn a person's life and evidence | Biography, dated events, sources and family links share a stable identity | A useful side panel opens on demand and can be closed without losing tree context |
| 5 | Choose the clearest perspective | Chart styles and relationship comparison answer different questions | Chart choice stays discoverable as one selection component; compare is contextual rather than a permanent dashboard |
| 6 | Keep and reuse the family archive | Portable structure, backup/restore and local ownership are product foundations | Data management lives in deliberate settings/export flows; no false claim that browser storage is a durable encrypted vault |
| 7 | Extend evidence intelligently | Documents and authorized public-source research can enrich reviewed records | Retrieval and matching create candidates with citations, not automatic canonical facts or a collection of new top-level buttons |
| 8 | Improve and distribute the product reliably | Reproducible checks, clear release evidence and maintainable structure enable open-source adoption | Evaluation and deployment tooling stay out of the family-exploration experience |

Privacy, accessibility, data integrity and recoverability constrain every rank. Their lower or absent visual prominence never lowers their release importance.

## Active scope and honesty

| Capability | Current position | What must not be claimed |
|---|---|---|
| Tree exploration, multiple charts, deterministic kinship | Present in the prototype, with continuing interaction refinement | That many available charts prove the core interaction is good or that dense real families have been usability-tested |
| Voice/text proposals and explicit review | Present as a prototype; prior browser checks used mocked speech/provider responses | Production speech quality, reliable long recordings or physical-device performance |
| Profiles, timelines, sources and person JSON export | Present in the prototype | Complete canonical biography maintenance, full-vault backup/restore or GEDCOM interoperability |
| Grounded connection chat and model-independent contracts | Partially implemented | Universal language understanding, qualified model accuracy or autonomous truth maintenance |
| Corrected family-name lexicon and conflict inbox | Planned | That a corrected spelling is already remembered across contributors |
| Document storage, OCR/chunking and family RAG | Planned, tier two | Working file ingestion or cited document retrieval today |
| Authorized archive discovery and automatic record collection | Research direction; current archive workflow logs searches and manually attached records | Automatic birth/landing retrieval, proven matches or unrestricted source access |
| Downloadable encrypted local vault, local AI and private sync | Planned architecture | Available installers, end-to-end encryption, zero data egress or working collaboration |

Consult code and verification reports before changing a status. This charter is not a substitute for testing.

## Interface constitution

- The default screen should communicate “family tree,” not “control panel.” The graph receives space before panels, titles or utility chrome.
- Visual prominence follows the current job, not the number of implemented features. Promote one primary creation action; make supporting actions quieter and contextual.
- Chart selection must remain easy to try. Use a coherent selection component and meaningful state, not separate dominant calls to action for every layout.
- Recovery is part of the main interaction. A person must be able to return from a focused branch or enlarged view without guessing which similarly named control undoes what.
- Selecting a person and opening a biography are separate actions. A profile must not hijack the whole exploration flow or trap scrolling.
- Name search is a secondary utility. Tapping people, following links and changing perspectives are the core exploration model.
- Voice reveals a family, not a form. Show draft growth, truthful processing state and an intelligible review step. Keep setup, diagnostics and exports behind deliberate disclosure.
- Never hide essential actions merely to reduce a button count. Consolidate redundant mechanisms, explain state and retain keyboard/touch access.
- More features do not entitle the app to more permanent controls. Every change must map to an existing workflow or justify a new one and identify what is consolidated.

## Scope rules

Before implementation, define the user job, state transitions, acceptance cases and data consequences. Prefer the smallest complete end-to-end workflow. Preserve a clear boundary between:

- accepted records and unreviewed suggestions;
- source claims and established family data;
- deterministic behavior and model judgments;
- working prototype behavior and planned production architecture;
- source tests, mocked integration checks, actual device checks and user research.

Do not use invented metrics to imply certainty. Establish performance, usability and AI targets from measured baselines, task impact and explicit product decisions. A polished screenshot does not establish usability; a deterministic test suite does not certify visual taste or speech accuracy.

## Current audit and priority decisions

**2026-11-16 — control accumulation.** The source currently distributes graph navigation, recovery, chart selection, memory creation, profile disclosure and chat across several floating groups. The latest user feedback says the amount of buttons is unacceptable. Treat this as a failed information-hierarchy evaluation, not a request to restyle each button.

**Decision:** stabilize the interaction model before adding another feature surface. Review the default explorer, selected person, focused/zoomed state, active recording and review as a connected sequence. Consolidate redundant recovery and navigation affordances by state. Preserve chart discoverability and a clear route back to the complete family. Keep research, model settings, diagnostics and project links secondary.

**Documentation debt:** the active PRD and UX priorities contain historical requirements and appended reversals. The product agent should maintain a single current contract and move superseded decisions to history. No new control should be justified by obsolete wording.

## Delivery order

1. Adopt and enforce the design system and task-level UX/UI evaluation contract.
2. Refine the explorer and memory-to-review loop on mobile and desktop, including recovery from zoom/focus and interruption.
3. Establish real voice, identity-correction and no-loss evidence before expanding the AI experience.
4. Deliver local persistence, complete portable backup/restore and explicit data-handling modes.
5. Add documents and source research through the same reviewed-claim workflow.
6. Add private synchronization only with working recovery, conflict handling and verified access boundaries.

## Evidence required for a release claim

A change report identifies the intended user outcome, implemented behavior, exact checks performed, unresolved failures and verification limits. Mobile and desktop interaction evidence is required for visible UI work; use a physical-device claim only after a physical-device check. AI work additionally identifies provider/model, fixtures, actual inputs, observed failures and whether results were mocked. No unqualified “self-improving,” “private” or “accurate” claim is permitted without evidence for that specific property.
