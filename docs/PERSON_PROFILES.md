# Person profiles, research sources and portable biographies

Status: prototype implemented; external archive retrieval and tier-two document processing are planned.

## Product contract

Each person has one stable identity and one profile: a narrative, a chronological event timeline, relationships, and a Sources tab. The narrative is a readable view, not the authoritative database. Keep the original voice memory, accepted claims and documentary evidence separate. Do not overwrite a person's name, birth date, relationships or story merely because a search returned a plausible match.

The prototype adds Timeline / Sources tabs and JSON export to every profile. Existing demo dates and places remain labelled illustrative. Voice biographies remain recorded memories. Unknown dates stay unknown. Reviewed records appear as sourced events in the timeline and export, including immigration / landing, birth, residence, death and other events. Existing biography text and graph relationships are not automatically rewritten. The chatbot currently answers relationships only; new documentary events are not yet available to it.

## Sources tab

The prototype records these distinct steps:

1. **Search opened**: archive, archive URL, exact research query, UTC timestamp, stable search ID. The archive opens in a new tab. Copy the query into its search form; this version does not submit it or capture external browsing. A logged attempt is not evidence that results were returned or viewed.
2. **Candidate attached**: record URL, reference (collection / volume / page or equivalent), transcription or findings, event type, date/place as recorded, optional originating search ID. A user supplies these details; no scraper or model invents results.
3. **Reviewed**: explicit accept, reject or retain-candidate decision, reason including identity evidence and conflicts, and timestamp.
4. **Added**: accepted records create an identifiable event in that person's timeline. The Sources tab states exactly what was added. Rejecting or returning a record to candidate removes that derived event. No duplicate event is appended on re-render. Previous facts remain visible.

Opening external links sends no API key or full tree. Archive searches may require an account or have restricted records. The initial directory includes FamilySearch plus Canadian birth and immigration research collections, not universal worldwide coverage. Links lead to official search entry points / guides; no availability or match is asserted.

Current persistence is browser-local. JSON export contains searches, candidates, findings and current review decision, not just accepted events. There is no import UI, multi-device synchronization, durable append-only review history, deletion UI or automatic record matching yet. Changing review status replaces its prior review note in this prototype; the production ledger below must retain the full history.

## Portable structure

The app defines a versioned UTF-8 JSON contract, `family-history-person`, version `1.0.0`, with JSON Schema at `schemas/person-profile.schema.json`. This is an **application format**, not a claim of GEDCOM compliance. Stable IDs allow future merging; person names are never primary keys. Relationship endpoints can reference people outside a single-person export.

- `person`: stable ID, display name, biography text, its kind and retained source quotes.
- `person.events`: stable event ID, event type, nullable ISO partial date (YYYY, YYYY-MM, YYYY-MM-DD), nullable literal place, review status, source IDs and optional description.
- `relationships`: directed parent or undirected partner links using stable person IDs.
- `research.searches`: provider, query, URL, time, search ID and opened status.
- `research.records`: original source details, candidate / accepted / rejected state, identity review note and timestamps.

Preserve date precision: 1902 must not become January 1, 1902. This first form accepts exact partial dates only. Approximate dates, date ranges, multiple calendars and uncertain identity assertions need explicit structured representations before adding them to ingestion. A blank date sorts after known dates.

For genealogy interoperability, the next adapter should support **FamilySearch GEDCOM 7**: birth → BIRT, immigration → IMMI, residence → RESI, death → DEAT, other → EVEN; biography → NOTE; records → SOUR with citations; attachments → OBJE; names / individuals / families use their native structures. Preserve conflicting assertions as separate sourced events. A JSON sidecar preserves research queries, review workflow, aliases and extraction provenance that do not map cleanly. Do not advertise GEDCOM export until a validator and import/export round-trip fixtures pass.

## Production bio approach

Use `Person`, `NameVariant`, `Claim`, `Event`, `Source`, `SearchRun`, `ReviewDecision` and `BioRevision` records. Each review is an immutable decision with actor, time, affected claim IDs and superseded decision ID. Event acceptance is not proof of truth. Conflicting sources stay linked to the same subject with an unresolved-conflict group until reviewed.

The canonical bio is a versioned projection of accepted, non-conflicting claims. Each paragraph retains claim IDs. Preserve hand-written passages and original voice memories separately. Rebuild affected sections on claim acceptance or withdrawal, offer a diff, and retain human approval and the previous revision. Do not let generation erase family spellings or invent transitions between undocumented events.

## Eval additions

- Search provenance: provider/query/time are recorded only on the user's search action; no invented result counts or findings.
- Traceability: every accepted documentary event resolves to a source with URL, reference and finding; every source states the actual change it produced.
- Identity: same-name results remain candidates; source acceptance requires an explicit reason. Automated matching, when added, must abstain on ambiguous identity.
- Conflicts: incompatible birth dates remain separate; accepting one must not silently replace another or mutate a relationship.
- Reversibility: accept → candidate / rejected withdraws only its derived event, keeping the record and original facts.
- Portability: export retains partial dates, Unicode names, source references, candidates and stable IDs; validate against the versioned schema. GEDCOM round-trip and schema migration tests are future release gates.
- Storage failure: blocked or full local storage must not report success or alter in-memory research.
- Safety: reject non-HTTP(S) source links; render imported/user text as text. Sources are untrusted content, never model instructions.

Deterministic tests cover candidate exclusion, accepted event derivation, reversal, reference retention, safe links and date validation. Live archive search and genuine identity matches have not been verified.

## Official references

- GEDCOM 7 specification: https://gedcom.io/specifications/FamilySearchGEDCOMv7.html
- FamilySearch search instructions: https://www.familysearch.org/en/help/helpcenter/find-birth-records-on-familysearch
- Canadian birth records and jurisdiction limits: https://www.canada.ca/en/library-archives/collection/research-help/genealogy-family-history/birth-marriage-death-records.html
- Canadian passenger lists 1865–1935: https://www.canada.ca/en/library-archives/collection/research-help/genealogy-family-history/immigration/passenger-lists-1865-1935.html
