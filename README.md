# Family History Tree App

An open-source, tree-first family explorer. **Interaction prototype, not production genealogy software.** Included people and stories are fictional.

[Open the prototype](https://family-history-tree-app.online9787.chatgpt.site/) (owner-private). Run locally to explore independently.

## Run and check

Serve `dist` with Python 3 or any static server:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. No install, key or build step is needed to explore. Tests require Node 20 or later:

```sh
npm run check
python3 scripts/package-source.py
npm run check:package
```

## Experience

The tree is the workspace. Try ten visible chart styles, select people, open Life & sources on demand, and use the contextual Whole family / Fit view action to recover. Search, compare, geography, zoom controls and grounded chat live in More. Add a memory opens a compact dock over the same tree; proposed people remain drafts until explicit review.

Voice extraction and chat require a user-supplied OpenRouter key. Browser speech recognition may use a cloud service. Reviewed additions and research use browser-local storage, which is not an encrypted vault or backup. The fictional sample makes no model or microphone request and cannot be saved.

## Product and quality contracts

- [Four-role team and how to run it](docs/AGENT_TEAM.md), with repository routing in [AGENTS.md](AGENTS.md).
- [Product charter](docs/PRODUCT_CHARTER.md), [PRD](docs/PRD.md) and [feature inventory](docs/FEATURE_INVENTORY.md).
- [Design system](docs/DESIGN_SYSTEM.md) and [UX/UI evals](docs/DESIGN_EVALS.md): registered actions, token checks, browser tasks and anchored human judgment.
- [Current design review](docs/reviews/2026-11-16-design-system.md) and [release contract](docs/RELEASE_CONTRACT.md).
- [Architecture](docs/ARCHITECTURE.md), [local-first product direction](docs/LOCAL_FIRST_PRODUCT.md) and [AI opportunity map](docs/AI_OPPORTUNITY_MAP.md).
- [Family-data evals](docs/EVALS.md), [chatbot boundaries](docs/CHATBOT_EVALS.md), [live voice](docs/LIVE_VOICE.md).
- [Portable person profiles and source research](docs/PERSON_PROFILES.md), [profile schema](schemas/person-profile.schema.json) and [tier-two document/RAG plan](docs/DOCUMENT_RAG_PLAN.md).

Forty deterministic/mock tests pass on the current candidate, alongside the scoped source design check. Narrow and desktop browser states were checked; physical-device gestures, real microphones, long recordings and live model quality remain unqualified. CI automates deterministic checks, not aesthetic approval.

## Status and contribution

Implemented prototype: ten charts, contextual camera recovery, on-demand biography with timeline/sources/family tabs, recorded archive searches and manually reviewed records, portable person JSON, grounded chat, incremental voice proposals and local saving. Archive search opens external pages; it does not automatically collect records. No Geni import or real-family migration is included.

Planned: canonical biography reconciliation, persistent corrected-name library, document ingestion/RAG, desktop installers, encrypted vaults, local AI and encrypted sync. See the inventory for gaps and priorities.

Original code is MIT licensed. That license grants no rights to family data. Contributions and public evidence must use fictional fixtures; never commit keys, recordings, transcripts or browser exports. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).
