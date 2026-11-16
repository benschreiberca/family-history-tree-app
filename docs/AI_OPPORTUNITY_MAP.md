# AI opportunity map

2026-11-16 · Source-reviewed proposals, not an implementation claim or model benchmark.

The product's AI advantage should be **less work to build a trustworthy family tree**. Do not turn every opportunity into an additional control. Build on the memory dock, person profile and Sources flow; let the design system decide how the task is exposed.

## Current implementation and evidence limits

| Surface | Present in code | Material gap |
|---|---|---|
| Family chatbot | LLM selects a strict lookup; code validates exact candidate IDs and renders kinship from current graph | Full names required; no broad biography/document queries; valid-but-wrong intent is possible; no qualified live-model result |
| Voice memory | Browser ASR, finalized-text queue, strict people/link JSON, quoted evidence, live draft, explicit identity/link review | No durable draft recovery; no dates/place extraction; literal quotes do not prove links; same normalized names grouped provisionally; real 1/5/10-minute behavior unverified |
| Source research | Official archive links, logged query, manual reference/finding attachment, acceptance into person timeline | No automatic external query submission, results retrieval, identity matching or complete immutable decision ledger |
| Biography | Static illustrative or new-person recorded-memory text; per-person events and JSON export | No maintained source-linked narrative revisions; existing-person memory visibility and claims need a unified store |
| Documents / local AI | Architecture and eval specifications | No ingestion, OCR/chunks/retrieval, desktop secret broker, encrypted vault or local model adapter |

Grounding code and mock tests are important safeguards, not measured ASR accuracy, historical truth or model quality. The existing default model ID is an experimental configuration, not an endorsement. Evaluate exact requested/returned model and provider versions before qualification.

## Priority and delivery sequence

| Order | Opportunity | User outcome | First useful increment |
|---|---|---|---|
| 1 | Reliable live memory → reviewed tree | Keep talking without losing words or approving a wrong connection | Durable segmented draft, visible coverage/failure ledger and correction/review loop |
| 2 | Family identity and spelling memory | Correct a family name once and reuse it appropriately | Reviewed, vault-scoped aliases with explicit same-name disambiguation |
| 3 | Sourced record discovery | Find plausible birth/landing evidence without manually retyping everything | One authorized provider adapter returning source candidates, never automatic family facts |
| 4 | Canonical biography projection | Read a coherent life story whose statements can be checked | Deterministic event summary first; optional cited prose with revision diff |
| 5 | Local document evidence library | Drop a document, identify its people and recover its evidence | Local storage + extraction + page-aware full-text retrieval, before embeddings |

Orders 3–5 depend on source/claim IDs and transactional review storage. Do not bolt private documents onto localStorage or make generative text the canonical database. The local-first and encrypted-sync roadmap remains a separate infrastructure dependency, not something a small model fixes.

## 1. Reliable live memory → reviewed tree

**Job.** Record an uninterrupted family narrative, see additions emerge, correct the interpretation and keep all unprocessed material recoverable.

**Data flow.** Audio → ASR adapter → immutable transcript segments with speaker/time references where available → bounded evidence packets → named-person/relationship proposals → identity/conflict review → accepted transaction. Preserve original segment text and correction revisions separately. The current browser may send audio to its ASR vendor and finalized text to OpenRouter/provider; a future local adapter changes recipients, not the expected contract.

**Narrow tool boundary.** `propose_memory_claims(segment_id, segment_revision, context_ids)` returns review-only proposals. Code verifies source spans, permitted predicates, IDs and direction, then checks graph invariants. Add `commit_reviewed_changes(review_token, expected_revision)` only as a separate user-authorized transaction. A quotation containing two names is insufficient proof that one is the other's parent.

**Provenance and uncertainty.** Each proposal points to the exact segment and quote. “I think,” negation, corrections, uncertain parentage and unnamed people must become uncertainty/clarification, not silently accepted links. Context may resolve references only through explicit candidate IDs; it is not new evidence.

**Model-agnostic eval.** Frozen fictional narratives with labelled claims, omissions, negations, corrections, duplicate names and cross-segment references. Score named-person/relationship interpretation against reviewed labels; separately report schema violations blocked by code, coverage gaps and erroneous proposals. Replay exact transcripts to compare LLMs; test ASR independently against human transcriptions. Then run real 1/5/10-minute recordings on supported devices. A blanket empty result must not pass supported extraction cases.

**Latency/cost.** Timestamp audio finalization, queue entry, request start/end, draft paint and review/save. Report queue lag and end-to-end draft latency separately from model request time. Count retries, calls, context tokens and actual billed usage if returned; unknown cost is unknown, not zero. Use observed context capacity and workload to select segmentation, not a universal claim count.

**Rollback.** Pin adapter/prompt/schema versions. Disable the new extractor without deleting audio/transcripts or old reviewed facts. Preserve failed/deferred segments for replay. Reprocessing creates a new draft revision; old approval cannot apply to the changed draft.

**Design handoff.** One recording action in the existing memory surface. Status explains whether words are heard, queued, proposed or not processed; review does not appear to certify historical truth. Do not add a separate AI dashboard to the tree.

## 2. Family identity and spelling memory

**Job.** A corrected spelling such as a family-specific given name is reused by the next contributor without merging different people who share it.

**Data flow.** User-reviewed correction → `NameVariant` record tied to stable person/vault IDs, language and provenance → deterministic alias lookup → candidate identities supplied to ASR/extraction or review UI. An alias is a spelling relationship, not proof two people are identical.

**Narrow tool boundary.** `resolve_people(text, allowed_scope)` returns ordered candidate IDs and ambiguity. `propose_name_variant(person_id, spelling, evidence_id)` is a draft. Human review alone approves a preferred display name or alias. Never expose every private person's name to a cloud model merely to improve one transcript.

**Provenance and uncertainty.** Keep original spelling, approved correction, reviewer and revision. Do not silently normalize “unusual” names to common names. Same-spelling different-person cases stay separate; pronunciation hints are scoped, optional and user-provided.

**Model-agnostic eval.** Unicode names, accents, transliterations, homophones, repeated common names and deliberately similar spellings. Test correction persistence across sessions/contributors after storage exists, wrong-person rejection and no unrelated-name payload disclosure. Grade candidate retrieval separately from LLM disambiguation. No uncalibrated model confidence number authorizes a merge.

**Latency/cost.** Local alias lookup time and candidate-review effort; compare extraction correction rate before/after with the same labelled corpus. Count extra context tokens/calls introduced by hints. Keep one-time lexicon computation out of per-segment model calls when ordinary lookup suffices.

**Rollback.** Aliases are versioned/revocable; withdrawal invalidates derived hints. Restore the prior display name without deleting source spellings or silently relabelling historical evidence.

**Design handoff.** Reuse the existing identity review. “Remember this spelling” belongs with an actual correction, not as a new permanent explorer button.

## 3. Authorized public-record discovery

**Job.** Find candidate birth registrations, immigration/landing manifests or other permitted public records for a selected person, with references and an explanation of why they might match.

**Data flow.** User-confirmed person/query scope → provider capability/authorization check → explicit API/export search adapter → normalized candidate metadata → identity evidence review → source/claim proposal → accepted timeline event. Start with one provider and one supported record class. The current archive-link directory is not a retrieval implementation.

**Narrow tool boundary.** `search_records(provider_id, approved_query, cursor)` calls only registered destinations with an allowed schema. `fetch_record(provider_id, record_id)` retrieves a permitted record, not an arbitrary model-provided URL. Record provider errors, unavailable coverage and pagination explicitly. Never bypass authentication, CAPTCHA, paywalls or a provider rejection; do not invent an unofficial scraping fallback.

**Provenance and uncertainty.** Source entry retains provider, collection/reference, stable record ID, canonical URL, retrieval time, rights/access status, query and original transcription/image reference where allowed. A same-name hit is a candidate. Dates, relatives, places and event types provide reviewable match evidence; “no results” is not proof of nonexistence. Every added event links back to the source and review decision.

**Model-agnostic eval.** Use licensed/fictional provider responses with true matches, near matches, duplicate names, conflicting dates, empty pages, pagination, restrictions and injected instructions. Grade retrieval completeness against the fixture response set; grade identity interpretation against reviewed labels. Verify no record is marked found merely because a link opened, and no candidate becomes an accepted fact without review. Live adapter conformance is a separate test using permitted access.

**Latency/cost.** Provider query/fetch latency, page/request counts, throttling and any paid data charges; model matching latency/tokens separately. Avoid re-fetching unchanged records or calling a model to copy structured metadata. Cache only within provider terms and the user's configured retention policy.

**Rollback.** Disable the adapter independently. Retain permitted source metadata and prior reviewed records; mark unavailable evidence as such. Withdraw proposed matches without deleting historical review decisions. Search and model matching versions remain replayable.

**Design handoff.** A contextual research task inside Sources; proposed matches are a review list, not a new always-on search engine panel. Automatic background collection requires an explicit user scope, budget and schedule—it is not implied by installing the app.

## 4. Canonical biography projection

**Job.** Maintain one readable life story per person without rewriting family memories into unsupported facts.

**Data flow.** Accepted claims/events + unresolved conflict groups + source references → deterministic chronological outline → optional prose adapter → paragraph-to-claim validation → before/after review → `BioRevision`. Original oral accounts and authored text remain independent records.

**Narrow tool boundary.** `compose_bio(person_id, claim_revision_ids, style)` receives only authorized evidence. It cannot create claims, pick a “true” conflicting birth date or write the canonical bio. `preview_bio_revision` shows changed passages and citations; commit requires a fresh review token.

**Provenance and uncertainty.** Every factual passage maps to accepted claim IDs. Disputed facts are disclosed or omitted with an explanation. A pleasing transition must not invent a motive, trip, relationship or event between documented dates. Preserve “circa,” incomplete dates and source disagreement; do not turn family recollection into a government-record claim.

**Model-agnostic eval.** Claim-to-paragraph support labels, citation validity, omitted important claims, conflict disclosure, unsupported connective text and preservation of human-authored passages. Compare optional prose against the deterministic outline baseline. Include record withdrawal and new evidence reopening a disputed claim. Judge style separately from factual support; a fluent hallucination fails.

**Latency/cost.** Rebuild only affected sections after a reviewed change. Measure revision generation time, changed-claim coverage, token use and review corrections. No background regeneration on every camera pan, page render or unrelated family edit.

**Rollback.** Immutable prior revisions and paragraph claim references permit restoring the last reviewed narrative. Source deletion/withdrawal flags affected passages for review rather than silently keeping them “verified.” Model/prompt changes never rewrite all biographies automatically.

**Design handoff.** A restrained revision diff within the person's existing biography, with plain source links. No separate permanent “generate bio” control when no relevant claims changed.

## 5. Local document evidence library and retrieval

**Job.** Add a PDF, scan or photograph, tag relevant people, and retrieve exact supporting evidence while retaining ownership of originals.

**Data flow.** Explicit drop/import → validated local storage → document metadata/content hash → PDF text extraction or OCR adapter → page/region text → versioned page-aware chunks → local full-text retrieval → cited evidence packet → proposal/answer → review when writes are requested. Images without readable text retain captions/tags; do not force a vision model to invent identities.

**Narrow tool boundary.** `extract_document(document_id, version)` reads only the authorized object. `retrieve_evidence(query, person_scope, source_scope)` returns source/page/chunk IDs and excerpts. It never hands the LLM filesystem paths, unrestricted SQL or arbitrary files. Add embeddings only after a retrieval comparison demonstrates useful improvement over local full-text search.

**Provenance and uncertainty.** Original bytes, extraction engine/version, OCR errors, user corrections, page/region offsets and chunk versions are retained separately. Retrieval ranking is not truth. Answers distinguish accepted family facts from unreviewed source assertions and conflicting oral accounts. Every citation must resolve to accessible evidence in the active vault.

**Model-agnostic eval.** Extraction against human transcriptions; retrieval recall for labelled evidence at the actual context budget; citation page/offset validity; answer support and missing-evidence abstention. Test cross-vault isolation, same-name people, injected instructions, extraction failure, deletion/reindex and revoked document access. Separate extraction, retrieval and generation errors; no AI judge alone certifies itself.

**Latency/cost.** Time upload/import, extraction, indexing, first retrieval and answer separately. Measure document bytes/pages, OCR usage and actual token/embedding bills if cloud processing is enabled. Original text makes re-chunking/reindexing reproducible without repeated OCR. Owner-configured resource limits derive from device capacity and selected models.

**Rollback.** Originals remain available if OCR/index/model versions are rolled back. Rebuild derived indexes from retained extraction revisions. Document withdrawal removes its chunks/vectors/cache and marks dependent claims/paragraphs as source-withdrawn for review. Encrypted backup/restore must be tested before calling the library durable.

**Design handoff.** Drop onto a person or open the contextual document library. Show filename, tags, progress and a recoverable error; do not expose chunk/token/embedding internals in normal family browsing.

## Common experiment record and release decision

Each experiment records the user job, code/prompt/schema/fixture versions, requested and returned model/provider, workflow configuration, actual input scope, labelled expected outcome, observed result, safeguard result, stage latency, usage/cost or unknown, and rollback version. Private source content stays out of public benchmark reports; use consented or fictional equivalents.

Compare the same evidence packets across adapters. Keep a held-out fixture set and report transport failures, invalid output and appropriate versus unnecessary refusal separately from semantic accuracy. Choose thresholds from observed baselines and failure costs before qualification; do not retroactively redefine success or impose fabricated claim-summary counts.

Any observed unauthorized accepted write, wrong-person merge, unsupported family fact presented as known, cross-vault disclosure or loss of required source evidence blocks release. Other quality/latency targets require measured baselines and product decisions. A blocked malicious output is a successful safeguard and a failed model proposal—record both.

## Handoff for the next build

1. Product agent: approve a narrow **durable voice draft + correction** milestone and clarify whether browser-only persistence is sufficient for its alpha.
2. Design Steward: define one clear recording/review flow and evidence for the no-loss/uncertainty states; eliminate duplicate controls before adding more AI.
3. AI Engineer: implement segment revisions, coverage ledger and approved name variants behind the existing contract; run transcript fixtures before real audio.
4. DevOps: supply storage migrations, recovery tests, secret/payload checks and rollback package; then test real supported-device recordings.

Do not start public-record crawling or a large RAG stack while the primary voice workflow still loses drafts or cannot distinguish interpretation failures from successful processing.
