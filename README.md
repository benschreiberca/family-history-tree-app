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
Planned: editing, GEDCOM import, private accounts, persistent storage, voice stories and tagged document uploads. No Geni integration or family-data migration has been performed.

## License
Original code is MIT licensed. The software license does not grant rights to any family's data. Public contributions must use fictional fixtures only.

To regenerate the downloadable source bundle and copied preview documentation, run `python3 scripts/package-source.py`.
