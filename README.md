# Kin Atlas

An open-source family tree explorer through time and place. **Interaction prototype — not production genealogy software.** All included people and stories are fictional.

[Open the hosted prototype](https://kin-atlas-prototype.online9787.chatgpt.site) (currently owner-private; run locally to explore independently).

## Run

Requires Python 3 to serve files, or any static file server:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. No install, API keys or build step.

Tests require Node 20 or later:

```sh
node --test tests/*.test.js
```

## Try it
Scroll vertically to move through generations. The focal person stays central and largest; close relatives appear larger than distant ones. Select a person to recenter and inspect relatives. Switch to Earth: the year and selected person carry over. Drag left or right to rotate along the equator, use zoom buttons, and switch between birthplaces and dated residences. Search and branch filters work across both views. All records are fictional. Land outlines are schematic.

## Documentation
- [AI evaluation specification](docs/EVALS.md): seven model-agnostic evals, small-model contract, continuous checks, scoring and 36 scenario specifications (not yet implemented).
- [PRD](docs/PRD.md): scope, acceptance criteria and roadmap.
- [Architecture](docs/ARCHITECTURE.md): implemented prototype and proposed MVP.
- [Prototype plan](docs/PLAN.md): implementation and validation checklist.
- [Contributing](CONTRIBUTING.md) and [security](SECURITY.md).

## Status
Implemented: timeline, family graph, detail panel, globe, search, branch filtering and keyboard controls.
Implemented prototype additions: grounded family chat with a user-supplied OpenRouter key, model smoke evals, live voice draft extraction, explicit identity/link review, and browser-local saving. Live model and microphone performance are not yet verified. Planned: full editing, GEDCOM import, private accounts, server persistence, canonical biography reconciliation and tagged document uploads. No Geni integration or family-data migration has been performed.

## License
Original code is MIT licensed. The software license does not grant rights to any family's data. Public contributions must use fictional fixtures only.

To regenerate the downloadable source bundle and copied preview documentation, run `python3 scripts/package-source.py`.


## Grounded AI and live voice

- [Chatbot accuracy boundaries, model candidates and evals](docs/CHATBOT_EVALS.md)
- [Live voice draft workflow and evals](docs/LIVE_VOICE.md)

24 automated deterministic/mock tests pass. Model quality is unmeasured until live evals run with a user-supplied key. Never commit keys, real family transcripts, recordings or browser storage exports.

### Profile timelines and source research

Every profile now has Timeline / Sources tabs, logged archive search queries, candidate records with references, explicit review and portable JSON export. Accepted records appear as sourced timeline events; the original narrative and relationships are retained. This prototype opens external archive search pages and stores manually attached results locally; it does not retrieve archive results automatically.

- [Profile format and source workflow](docs/PERSON_PROFILES.md)
- [Versioned JSON Schema](schemas/person-profile.schema.json)
- [Tier-two document storage, extraction, chunking and RAG plan](docs/DOCUMENT_RAG_PLAN.md)

Validation: 27 automated tests pass, including source acceptance / withdrawal, conflicts, reference preservation and unsafe URL rejection.
