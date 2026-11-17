# Family History Tree App — product requirements

Version 0.4 · 17 November 2026 · Status: evolving prototype, not a production release.

This is the current requirements contract. It replaces historical year controls, persistent biography columns, competing navigation islands and earlier voice-workspace layouts. Requirements describe intended behavior; implementation claims and verification limits are recorded separately.

## Product intent and authority

Make a trustworthy family tree easy to create, explore and correct. People and their connections are the primary product surface. Stories, documents and sources explain those connections. AI can propose or retrieve information; it must not silently decide family identity or rewrite accepted facts.

Use these documents together:

- [PRODUCT_CHARTER.md](PRODUCT_CHARTER.md): current outcomes, scope and priority.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): action hierarchy, components, semantic tokens and surface rules.
- [DESIGN_EVALS.md](DESIGN_EVALS.md): deterministic checks, task protocols and expert visual-review anchors.
- [FEATURE_INVENTORY.md](FEATURE_INVENTORY.md): implemented, partial and planned capabilities.
- [LOCAL_FIRST_PRODUCT.md](LOCAL_FIRST_PRODUCT.md): proposed downloadable/local-first architecture and precise data-handling boundaries.
- [EVALS.md](EVALS.md): model-independent family-data evaluation requirements; [CHATBOT_EVALS.md](CHATBOT_EVALS.md) and [LIVE_VOICE.md](LIVE_VOICE.md) cover the present AI prototypes.

Explicit user direction takes precedence. The charter frames product decisions, this PRD defines required behavior, and the design system governs its presentation. Do not use a superseded implementation note to justify a new control.

## Users and jobs

| User | Job |
|---|---|
| Family explorer | Follow people and understand their relationships, lives and recorded places |
| Family contributor | Speak or type a recollection and see understandable draft connections |
| Family curator | Resolve identities, inspect evidence, correct conflicts and approve changes |
| Local user / self-hoster | Retain usable data, export it and understand what leaves the device |
| Open-source contributor | Extend behavior without weakening the core interaction or factual boundaries |

## Product priorities

1. Explore readable people and meaningful connections with recoverable navigation.
2. Create a family from voice or text, with visible draft growth and explicit review.
3. Preserve identity, uncertainty, provenance and correction history.
4. Inspect a useful biography, dated timeline, sources and family links on demand.
5. Choose a chart or comparison that answers the current relationship question.
6. Retain ownership through portable data, reliable backup/restore and the local-first direction.
7. Extend evidence through documents and authorized source research.
8. Ship a maintainable, inspectable application with honest evaluation and release evidence.

Privacy, accessibility and data integrity constrain every priority. They do not need permanent buttons to be release-critical.

## Interaction requirements

### Explorer

The tree occupies the main workspace. The default composition promotes one creation action and uses muted, visible text tabs for chart selection. More groups supporting utilities. Do not keep search, chat or a zoom toolbar permanently competing with the tree. Essential keyboard and explicit zoom actions remain available through the appropriate secondary surface.

Selecting a person focuses their connections and updates shared selection; it does not automatically open the biography. Life & sources is contextual to that person. Return from a scoped branch or changed camera is a conditional, clearly named action: scope recovery and camera fitting must not be ambiguous. Closing a panel retains the selected person and returns keyboard focus to its invoker.

Pan, pinch, tap and keyboard navigation must cooperate. Dragging over a person pans rather than accidentally moving or selecting them; touch drift is tolerated. A cancelled or multi-pointer gesture must not commit a selection. Chart switching preserves identity and orientation where the chart's meaning allows it. A rooted chart may intentionally show a subset; that scope must remain understandable and escapable.

Ten chart styles are currently available as perspectives on the same recorded graph. Their prominence is one coherent navigation component, not ten promoted calls to action. Retain discoverability without adding carousel decoration or duplicate mechanisms that do not help the task.

Focus timeline supports chronological exploration and emphasis by family distance. Unknown dates stay unknown; proximity in time is not proof that someone was alive at a particular date. No live-year background, year slider or globe zoom/rotation buttons are required. Earth is supporting context under More: horizontal/equatorial exploration of recorded birthplaces and dated residences. “Last recorded residence” must never be labelled as a verified current address.

### Person profile

Open a nonmodal side panel when requested. It must provide readable identity, narrative, recorded places, timeline events, source findings and clickable family links. Desktop can resize/expand it; narrow layouts use available space deliberately. The panel must scroll independently and retain reachable close/navigation controls without moving the tree behind it.

A canonical biography is the intended versioned view of reviewed claims, not an uncontrolled generated paragraph. Preserve original recollections, conflicts and citations separately. The current static/recorded-memory biography is an interim implementation, not complete canonical-biography maintenance. A compact per-person Earth view remains planned.

### Memory creation

Voice is the primary easy input, with a genuine typed alternative. Keep the tree visible as completed speech produces draft people and relationships. Show real listening, processing, queue, failure and stopped states. Do not imply recording, completed processing or successful saving when those actions have not happened.

Use one stateful Speak/Stop control for the active recording step. Transcript, model setup, diagnostics, downloads and retry appear contextually rather than as a wall of controls. Setup explains recipients and consent before external processing. A sample must be clearly fictional, make no model/microphone request and be blocked from saving as real family data.

Review waits for a stable draft revision. Each proposed name resolves to a new record, existing record or explicit skip; uncertain links are not pre-approved. Show the quoted words and conflicts beside the decision. Validate self-links, duplicate edges and ancestry cycles before transactional persistence. Never overwrite an existing person's biography just because a new story mentions them.

The maintained name/spelling library, richer date/place extraction, durable session recovery and canonical reconciliation are adopted planned requirements below. They are not current capabilities.

## Adopted journey scope and priority

The 16 November Geni audit informs these requirements; it does not establish our users’ preferences, Geni’s internal architecture or implementation in this app. The [evidence note](research/2026-11-16-geni-audit.md) retains observations G01–G30; [COMPETITIVE_RESEARCH.md](COMPETITIVE_RESEARCH.md) retains candidate contracts CR-001–CR-006. Product adopts all six as planned adaptations on 17 November in response to the request to add the journey features. Existing requirement IDs remain valid.

The seven value journeys below correspond to outcomes A–G in the proposed MaxDiff exercise. **No responses have been collected and there is no measured MaxDiff ranking.** The delivery sequence is an expert judgment about utility and dependencies; it can change with observed task evidence. Correctness, accessibility, privacy and recovery are foundations, not optional choices in that exercise.

| Priority | Release placement |
|---|---|
| P0 | Protect the existing explorer/memory loop and establish integrity, accessible review and no-loss recovery gates before expanding writes |
| P1 | Complete the local foundation, manual curation, existing-tree import and richer recollection |
| P2 | Preserve documents and media, organize research questions, produce maintained stories, broaden family context and portable presentation |
| P3 | Enable private remote contributions and authorized automated discovery only after their storage, permission and review dependencies pass |
| P4 / Later | Retain a scoped opportunity; no first-release commitment or implementation claim |

A row with two priorities has a minimum safety contract in the earlier phase and an explicitly broader workflow later. Priority is not interface prominence. This PRD authorizes planned product scope; it does not itself implement features or qualify a release.

### Shared foundations and acceptance

All mutation journeys use the same identities, claims, review and history. A separate import, document or collaboration subsystem must not maintain a second version of family truth.

| ID | Priority / current gap | Required behavior and observable acceptance | Dependencies |
|---|---|---|---|
| EX-01 | P0 / existing, device coverage incomplete | People and connections remain the foreground on phone and desktop; supporting work opens contextually and does not add persistent dashboards | DS-01, AX-01 |
| EX-02 | P0 / existing, broader device checks needed | Whole family clears branch scope; Fit view reframes current scope; neither writes family data. Cancelled/multi-pointer gestures do not select a person; closing a panel restores focus separately | DS-01, AX-01 |
| EX-03 | P0 / existing | A relative link, chart, list, profile and map resolve the same stable person ID; switching views preserves selection where meaningful | Stable person IDs |
| EX-04 | P0; typed extension P1 / partial | Kinship is computed from recorded, typed paths. Show the path and ambiguity; do not infer biological, half or full kinship from generic parent links | RL-01 |
| DS-01 | Release constraint / source checks exist | Registered surfaces, semantic tokens and component rules pass their checks; affected visual/task anchors have explicit findings and dispositions | DESIGN_SYSTEM, DESIGN_EVALS |
| AX-01 | Release constraint / partial | Keyboard can enter, operate and exit every journey with meaningful names/states and restored focus; no essential hover-only action. Reachable controls, independent panel scrolling, touch and reduced motion remain usable | Task/device evidence |
| ID-01 | P1 / planned | Approved family-scoped spelling corrections persist and inform later extraction without silently replacing the approved form | ID-02, review history |
| ID-02 | P1 / planned extension | Preferred, birth, married/former, nickname, original-script and transliterated names retain type, language/script where known, source and stable person ID. Alias search finds that person; same spelling creates candidates, never an automatic merge. A reviewer can split conflated mentions | Stable IDs, ED-01 |
| DT-01 | P1 / partial exact-date support | Preserve original date text, exact partial precision, circa, before, after, between and unknown. Dates round-trip without invented January 1 dates or midpoints. Ages, ordering and conflicts respect intervals and distinguish precision from confidence | Shared claim schema, migration/export mapping |
| RL-01 | P1 / generic parent/partner only | Represent biological, adoptive, step, guardian, unknown-type and partner relationships explicitly with evidence and direction/symmetry. Edit without silently converting types; validate relevant ancestry cycles, self-links and endpoints without treating non-ancestral care links as biological ancestry | ED-01, EX-04 |
| VO-02 | P0; richer comparison P1 / partial | Show deterministic additions, changed/unchanged fields and conflicts with quotations. Accept, retain alternate, defer or reject independently. Commit only the exact reviewed revision; reject stale review, invalid endpoints, self-links and ancestry cycles. Failed persistence changes no accepted data; repeated save applies once | Stable draft/claim IDs, durable transaction; CR-001 |
| ED-01 | P1 / planned standalone editor | Add/edit/remove people, typed relationships, dates, places and events through shared Review. Preview affected records and dependents; deletion detaches/tombstones deliberately. Merge shows survivorship, relationships, citations and external IDs; split separates identities without losing originals. Cancel changes no accepted facts; stale review refreshes; interrupted save resolves committed versus not committed | ID-02, DT-01, RL-01, VO-02, ED-02 |
| ED-02 | P1 / planned; current review overwrites status | Append actor, time, source, reason, prior revision and decisions. Restore/undo appends a compensating revision, preserves original evidence and unrelated later work, and updates all affected projections. A restart retains deferred decisions and revision history | Transactional storage, BI-03, OW-01; CR-002 |
| ED-03 | P0 validation; P1/P2 richer checks / partial graph checks | Deterministic, versioned checks explain suspect chronology, duplicates and missing context using claim IDs. Unknown is not false; compatible ranges are not contradictions. Acknowledge with reason/checked revision; relevant evidence changes reopen review. Never silently auto-fix, merge or invent a completeness/confidence score | DT-01, RL-01, BI-03, ED-02; CR-004 |
| BI-03 | P1 / planned shared store | Accepted, alternate, deferred, rejected and withdrawn claims remain distinguishable. One accepted claim/event ID feeds profile, timeline, lifespan, map, queries, export and biography inputs; correction/withdrawal/undo changes every dependent view coherently. Unresolved alternatives never silently select a truth | Stable claim/event/source IDs, exact revision transactions; CR-005 |
| OW-03 | P0/P1 / drafts currently session-scoped | Persist draft inputs, segment/revision coverage, decisions and job checkpoints. Close preserves work; discard is explicit. After reload, show saved versus unsaved/failed work, resume the failed step without duplicates and recover from quota/write errors without claiming success | Transactional local storage; OW-01 |
| OW-01 | P1 foundation / planned | Complete versioned backup includes IDs, aliases, typed links, date precision, claims, decisions, revisions, questions, unfinished drafts and permitted original media. Restore verifies integrity, schema/migrations, references and counts in a clean target before replacement; corruption, wrong key or interruption leaves the prior archive usable. Person/subtree export and GEDCOM are labelled as different, potentially incomplete products | Storage/schema migrations, media manifest, recovery design |
| OW-02 | Planned production / not implemented | Downloadable local vault, secret handling and explicit local/cloud modes ship only with verified storage, no-egress where claimed, lock/key recovery and clean restore. Provider settings alone do not establish privacy | LOCAL_FIRST_PRODUCT, OW-01, platform/security qualification |

The foundation recovery journey is **More → Backup/restore → choose contents/target → inspect compatibility and verification → confirm restore → compare restored records and return to the tree**. Interruption preserves the original archive and a resumable or safely restartable checkpoint; completion reports preserved, skipped and failed content and the verified recovery target. Native backup preserves full fidelity; portability exports disclose losses before download. These are OW-01 acceptance requirements, not existing functionality.

### Seven complete value journeys

Each journey has one contextual home and shares Review for proposed mutations. Closing a surface preserves saved draft work; discarding it is a distinct action. A single local user approves their own reviewed changes; an owner-approval workflow appears only when actual sharing permissions require it.

#### JY-01 — Bring an existing tree into the app (MaxDiff A)

**Entry and activity:** More → Import. Choose a permitted GEDCOM export or supported authorized provider input. Stage the original, select whole-tree or branch scope, inspect unsupported fields and errors, resolve identities and compare proposed people, relationships, facts and sources before accepting a batch.

**Interruption and recovery:** Save import digest/version, source IDs, decisions and checkpoint. Pause for a duplicate/match without accepting the rest implicitly; resume after restart without duplicate people or replayed commits. Cancelling an uncommitted batch leaves accepted data unchanged. Previously accepted batches remain visible in history and recoverable; the active batch never exposes a partly committed graph.

**Completion:** Report accepted/unchanged/deferred/rejected counts, preserved unsupported content and any loss; focus the imported branch or chosen person. Re-import of the same source version proposes only a real change or reports no change.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| IM-01 | P1 after foundations / planned | Preview fields, aliases, dates, relationships, provenance, duplicates and losses; preserve unsupported values in a recoverable sidecar. Commit only reviewed batches. Fictional round-trip fixtures cover partial dates, typed families, duplicate names, Unicode and invalid references; a failed/resumed import does not duplicate or partially apply a batch | VO-02, ED-01/02, BI-03, OW-01/03; G12, G14–G16 |

#### JY-02 — Turn a recollection into reviewed family history (MaxDiff B)

**Entry and activity:** Add a memory → Speak or type, with the tree still visible. Display truthful microphone and processing status while finalized segments produce proposals. Review people, quoted memories, historical events, dates, places and typed relationships; resolve existing/new/skipped people and split same-name mentions. Link a recollection to existing people without overwriting their biography.

**Interruption and recovery:** Stopping the microphone, pausing processing and closing the panel are distinct. Persist completed segments and processing coverage; identify any audio/text not saved. Resume queued work or retry just a failed segment after restart. Transcript correction invalidates affected proposals and review; retry cannot duplicate claims or hide unprocessed text behind an empty success.

**Completion:** Show precisely what was accepted, deferred or excluded, retain the original recollection and locate the resulting people/events. The reviewed accepted changes propagate through shared views; a memory remains accessible even when no new person is created.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| VO-01 | P0 existing flow; P1 expansion / partial | Progressive voice and typed input share Review. New event/date/place proposals cite the relevant segment and preserve uncertainty, negation and self-corrections. Cross-segment names are context, not evidence. Retry/restart and same-name split fixtures prove coverage and no duplicates; real microphone/ASR trials qualify live behavior separately | ID-01/02, DT-01, RL-01, BI-03, OW-03, VO-02 |

#### JY-03 — Correct identities and contradictory facts (MaxDiff C)

**Entry and activity:** Selected person → Life & sources → edit, review or history; More → People list for broad curation. Compare original/proposed values, supporting quotations and what each decision changes. Manually correct a fact, investigate a consistency warning, resolve a duplicate or restore an earlier decision through the same transactional review.

**Interruption and recovery:** Defer individual items with their evidence and next step. A stale revision requires an updated comparison while retaining the reviewer’s work. Cancel leaves accepted data unchanged. Undo or merge reversal is a new reviewed revision with relationship/source dependencies visible, preserving unrelated later changes.

**Completion:** Return to the affected person or filtered work list; accepted changes agree across views, retained alternatives remain available, and the history explains who decided what and why. A dismissed warning can reopen when its evidence changes. ED-01–ED-03, BI-03 and VO-02 are the acceptance contract.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| ED-04 | P1 / search exists, curator lists planned | A compact people list supports surname/name variants, branch/relationship scope and relevant date/place/missing-evidence filters, with clear result scope and accessible sorting/columns. Save a local view and reopen the same criteria; empty results explain filters. Opening a person preserves list position. Any edit still enters shared Review; no unreviewed bulk mutation | EX-03, ID-02, DT-01, BI-03; G13, G24, G26–G27 |

#### JY-04 — Preserve photos and documents beside their people (MaxDiff D)

**Entry and activity:** Life & sources → add source, or More → Media. Drop/select an authorized local original, inspect the preview and extraction status, then propose independent citations to people, claims and events using page/region or time locators. Show original text/image beside extracted content and preserve rights/access metadata.

**Interruption and recovery:** Durable jobs expose queued, processing, failed, reviewed and skipped states; retry extraction without duplicating the original. Correcting extraction keeps its revision and re-evaluates affected proposals. Rejecting one citation leaves other citations and the original intact; withdrawal flags dependent claims for review.

**Completion:** The original remains retrievable once with independently approved links, citations open the correct location and backup includes the actual file where permitted. Mere appearance in the same photograph/document never establishes kinship.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| AR-01 | P2 / planned | Preserve immutable originals and deduplicate by verified content identity without merging distinct source descriptions. Multi-person/event tagging requires independent approval; failed/partial extraction and missing files remain visible. Deleting/withdrawing a source previews dependent claims and preserves their audit trail | OW-01/03, VO-02, BI-03, rights/storage rules; CR-003; G05, G11, G21 |
| AR-02 | P2 / planned | Local full-text retrieval precedes optional embeddings; results cite source and locator. Answers distinguish accepted facts, candidate evidence and conflicts and abstain when unsupported. A cited source can be reopened; invalid locators, prompt injection in documents and source withdrawal cannot create accepted facts | AR-01, SR-01, reviewed claim schema; CR-003 |

#### JY-05 — Follow a research question to evidence (MaxDiff E)

**Entry and activity:** Selected person → Sources → Research. Record a question, hypotheses and next step, inspect prior attempts, open an authorized archive search or later provider adapter, and attach findings. Possible matches explain identity support, contradictions and the specific information they might add; review each claim independently.

**Interruption and recovery:** Keep private notes, provider/query/time, successful, empty and failed attempts and relevant source IDs. Use open/waiting/answered/abandoned states; resume a next step or reopen a question without erasing earlier work. Authentication, paywall, pagination and network failures remain distinct from a genuine no-result search.

**Completion:** An answered question links supporting evidence or an explicitly attributed recollection; an unresolved question retains hypotheses and a next step. Suggested queries, possible matches and AI theories never become accepted family facts automatically. Existing manual search/attachment remains usable without an automation provider.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| SR-01 | P1 extension / manual logs/findings exist | Search attempts and sources are separate records. Query, provider, time, URL/reference and outcome remain inspectable; accepting a finding shows the exact claims it changes, and later review appends rather than overwrites decisions | VO-02, ED-02, BI-03 |
| SR-02 | P2 lightweight organization / planned | Persist question, linked people, hypotheses, attempts, evidence, next step, status and history; restore unresolved work. Reopen an answered/abandoned question safely. Private notes remain distinct from future shared content. Optional AI next-question suggestions cite their basis and require a user choice | SR-01, OW-01/03, ED-02; CR-006; G17 documented only |
| SR-03 | P3 gated automation / planned | Supported API/export adapters preserve provider record ID/URL, retrieval/access context, pagination and match rationale. Explicitly show recipients before sending family context. Human-reviewed match acceptance, cancellation and retry cannot introduce duplicates; no-result does not mean no ancestor. No unrestricted scraper or access-control bypass fallback | SR-01/02, ID-02, VO-02, OW-02, provider authorization; G09, G24 |

#### JY-06 — Invite relatives to contribute and share deliberately (MaxDiff F)

**Entry and activity:** More → Share/contribute. Choose named audience, branch/content scope and reader/contributor/review authority before invitation. A relative adds a memory or correction as a proposal; the permitted reviewer compares it with the latest accepted revision. Read-only publication is a separate deliberate export/publish action, never an implicit result of inviting someone.

**Interruption and recovery:** Drafts and pending proposals survive disconnect; replayed/out-of-order batches apply once. Concurrent conflicting work retains both versions for review instead of last-write-wins fact changes. Revocation reports its effective boundary and inability to recall already exported copies. Key/device loss follows the verified restore path.

**Completion:** Show invitation/proposal/sync status truthfully; an accepted proposal has attribution and a revision, a deferred proposal remains pending, and a reader cannot mutate the family. Return to the shared person or branch. No fake owner approval is introduced for a single local user.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| CO-01 | P3 / planned | Private-by-default sync/sharing enforces explicit read/write/review permissions, encrypted sync and conflict review. Permission tests, revocation tests, replay/interruption tests and key recovery pass before privacy or collaboration claims; living-person and sensitive-source access follow the audience scope | OW-01/02, ED-02, VO-02, privacy/security review; G10, G16 |
| SH-01 | P2 portable output; P3 revocable publishing / planned | Preview selected branch/person, content and living-person/source omissions before print, portable read-only HTML/PDF or GEDCOM export. Disclose unsupported fields and attachment exclusions; cancel produces no publication. Local output opens without editing authority. A later hosted link/embed requires deliberate publish, audience/access and revocation behavior distinct from downloaded copies | BI-03, EX-05, privacy projection; G16, G29 shell only |

#### JY-07 — Understand a person’s life in family context (MaxDiff G)

**Entry and activity:** Select a person → Life & sources. Read an approved life story, inspect its evidence, follow relatives and switch to timeline or recorded places. Family context can include relatives’ life events, with the event owner and relationship visible; expand scope through More without losing the focal person.

**Interruption and recovery:** Closing returns to the same selection and focus; reopening restores useful reading context. Filters and missing/undated events are discoverable. When evidence changes, show the affected narrative update for review; preserve authored text, original memories and prior approved biography versions.

**Completion:** The reader can trace a factual passage to a claim/source and a relative to the recorded path. Dates and places agree across views; uncertainty and unresolved alternatives remain visible. The next action is the relevant person, source or research question, not a separate dashboard.

| ID | Priority / current gap | Observable acceptance | Dependencies |
|---|---|---|---|
| BI-01 | P0/P1 / partial profile/timeline/export | Stable person identity links narrative, typed relationships, accepted events and source evidence. JSON preserves uncertainty/provenance, and existing-person recollections are visible without replacing authored biography | ID-02, DT-01, RL-01, BI-03 |
| BI-02 | P2 / planned | Build an accepted-claim outline; optional prose maps factual passages to claim IDs. New/withdrawn claims propose an affected-section diff rather than silently regenerating. Preserve uncertainty, authored corrections and original memories; approve or restore a version, with unsupported prose flagged for review | BI-03, ED-02, AR-02 where document-backed; CR-002 |
| EX-05 | P2 / individual timeline and basic Earth partial | Family timeline filters by focus/branch, event type and date interval, with an undated lane and relatives’ events distinguished. Maps filter recorded birth/residence/death/burial where sourced, show missing-place prompts and retain original place text. No inferred current address, exact age from an uncertain date or invented migration route; dated recorded transitions are distinguished from inferred travel. Back/close restores person/scope | BI-03, DT-01, RL-01, privacy projection; G06, G14, G20 |

### Later features and explicit dispositions

This table accounts for audit breadth without turning every Geni surface into a first-release requirement. Shared foundations above apply if a later feature is activated. Evidence details remain in the audit rather than duplicated here.

| Capability / evidence | Disposition and scope boundary |
|---|---|
| Home feed, activity/revisions, alerts, match/merge queues, consistency, profile management (G01–G10) | Adapt into contextual Review, history, source comparison and explained checks: VO-02, ED-01–03, BI-03. No permanent activity/match dashboard or copied profile-completeness score |
| Dense lists, advanced search, surname/family indexes (G13, G24, G26–G27) | Adopt ED-04 for this family; no public surname discovery directory |
| Calendar, birthdays and anniversaries (G19) | Later opt-in utility under More. Consume accepted date precision, distinguish unknown/approximate dates, respect living-person visibility and allow reminder opt-out; no automatic greetings, gifts or external messages |
| Family statistics (G18) | Later under More if they answer a family question. State scope, denominator, missingness and date uncertainty; counts must reconcile with the filtered accepted dataset, never imply unsupported demographic conclusions |
| Albums, photos and videos (G21–G22) | Original photos/documents first via AR-01; later collection organization and video/audio playback with time-located citations, access controls, supported-format limits and original-file backup. Empty/error/retry paths required; no streaming/social-media service commitment |
| Print/poster, portable share and limited publish (G16, G29) | Adopt SH-01; readable accessible portable output first. Poster sizing/large-format output later with preview, clipping checks and scope/privacy review. Geni poster generation itself was not verified |
| Private project/research notes (G17 documented, G23) | Adopt person-linked SR-02; later cross-person thematic collections reuse those records. No separate project-management product, public curator network or public project membership in the first release |
| Family/public discussions, following, online activity, popular people (G01, G25, G30) | Contextual proposal comments may follow CO-01. Public forums, follow feeds, popularity and social discovery are outside current scope; no public world-tree merge obligation |
| DNA storefront/results integration (G28) | Outside current scope. No DNA interpretation, matching, health inference or commerce requirement; any future proposal needs a separate validated user job, consent and sensitive-data design |
| Pro upsells, partner subscription promotions, gifts and billing | Outside current scope. Competitor availability or monetization is not evidence of product fit |
| Complete genealogy ownership (G11–G12, G15–G16) | Adopt aliases/date/typed-family representation, import, media, native backup and portable export through ID-02, DT-01, RL-01, IM-01, AR-01, OW-01 and SH-01; no unrestricted access to Geni or another world tree |

### Competitive candidate traceability

| Candidate | Adopted requirement / release placement | Product decision |
|---|---|---|
| CR-001 · What this changes | VO-02, ED-01; P0 minimum / P1 full comparison | Extend existing Review with item-level evidence and outcomes; do not add a standalone match center |
| CR-002 · Recoverable history | ED-02, BI-02, OW-01; P1 history / P2 narrative | Append reversible decisions and versioned narrative; retain actor/source and unrelated subsequent work |
| CR-003 · Reusable citations | AR-01/02; P2 | Preserve one original with independently reviewed many-person/event links |
| CR-004 · Explained consistency | ED-03; P0 integrity / P1–P2 richer checks | Deterministic explanations and recoverable acknowledgement, not silent repair |
| CR-005 · Accepted facts agree | BI-03; P1 foundation | One shared accepted-claim projection precedes broad event ingestion |
| CR-006 · Research questions | SR-02; P2 | Private, resumable questions and next actions within Sources; hypotheses remain separate from facts |

## Current implementation and evidence limits

The static ES-module prototype includes fictional people, graph layouts, kinship calculations, navigation, profile timelines/sources, person JSON export, browser-local reviewed additions and research, memory proposals/review and a narrowly grounded connections chatbot. Current layout changes are evaluated against the design system; this list is not a blanket visual-quality certification.

The voice and model integration has been exercised with mocked speech/provider responses. Actual microphone quality, reliable long recordings and physical-device performance remain unqualified. Deterministic test counts do not certify those properties. The chatbot's model routes a limited intent contract; factual relationship answers come from graph code, not unconstrained model prose.

There is no implemented encrypted vault, desktop installer, complete backup/restore, GEDCOM import/export, uploaded-document ingestion, OCR/chunking, document RAG, automated archive collection, family-wide corrected-name lexicon or private multi-device collaboration. Birth/landing research currently opens official archive entry points and stores manually attached findings. Accepted documentary events currently appear in profile timelines and person export; they do not yet update the base birth/death/events consumed by charts and geography. Review status is overwritten rather than recorded in an immutable history. At the audited source baseline, the voice schema supports named people and parent/partner proposals; structured date/place/event claims, same-name splitting and durable draft recovery are missing. The separate earlier real-family experiment is not integrated into the public fictional dataset.

## Data handling and architecture

Current prototype data is held in tab memory and browser localStorage as implemented. Browser-local persistence is not application-level encryption or a durable backup. The hosted site's access gate is not an implemented family-data account/role system.

When explicitly enabled, AI requests go directly from the browser to OpenRouter and the selected provider. Speech recognition may independently use the browser vendor's cloud service. Current provider configuration denies data collection and disables fallback; it does not establish zero retention or an offline/private inference guarantee. Keys remain in tab memory in the prototype. Do not publish a broader security promise than the implementation and provider behavior support.

The target local-first product uses a native boundary for local storage, secret handling and constrained model tools, with optional encrypted sync. It is documented in LOCAL_FIRST_PRODUCT.md and remains planned. Keep graph, source and review logic reusable; do not introduce a production framework or service merely to make the prototype look complete.

Public code, test fixtures and portfolio evidence must not contain private family exports, credentials, uploaded media or precise household details. Imports use permitted exports or authorized supported interfaces. No CAPTCHA bypass, unrestricted world-tree access or automatic identity match is assumed.

## Evaluation and release evidence

For these journeys, acceptance evidence must exercise interruption as well as the happy path: stale/repeated/failed commits; restart/retry and draft coverage; duplicate merge/split and undo; Unicode and uncertain-date round trips; independently rejected citations; missing/corrupt media; restore into a clean vault; conflicting contributions; and unsupported or failed provider searches. Use fictional fixtures. Narrative/extraction/retrieval evaluations include negation, uncertain and conflicting evidence, wrong identity, fabricated facts and unsupported citations, with abstention where appropriate. Quoted words alone do not prove that a proposed relationship is entailed.

Every visible change needs the relevant state/task checks and expert visual review from DESIGN_EVALS.md, including mobile and desktop evidence. Automated token/control checks enforce declared invariants; they cannot determine taste by themselves. Record failed or unassessed anchors explicitly rather than averaging them into a synthetic quality score.

Measure task completion, mistaken taps, recovery effort, draft acceptance/corrections, processing lag and source support against real baselines. Set targets from task impact and observed evidence; do not invent trial quotas, rendered-node caps or model-accuracy percentages. A scale/performance claim must name the tested dataset, device and conditions.

Release reports identify the reviewed revision, changed behavior, checks performed, failures and unverified behavior. Distinguish source tests, mock integration, responsive browser checks, physical-device runs and user research. Prototype publication is not production qualification. Privacy, accurate provenance, reviewed writes and recoverability must not regress to pass a cosmetic review.

## Delivery and non-goals

Delivery follows dependencies rather than claiming every adopted feature belongs in the first release:

1. Protect the design system/explorer/memory loop; define stable names, typed relationships and uncertain claims; qualify real voice behavior and establish exact review, durable drafts and recoverable transactions.
2. Deliver the local storage/full-restore foundation, manual correction/history and shared accepted facts. Complete existing-tree import and richer voice events on that foundation; add compact curation lists.
3. Deliver original documents/photos, independent citations and retrieval, private research questions and next actions, maintained biographies, family timeline/geography and privacy-reviewed print/portable sharing.
4. Qualify private remote contributions and supported provider discovery only after restore, permission/conflict and provenance gates. Later calendar/statistics/media collections follow evidence of need, not feature parity.

This sequence separates a useful first release from the longer roadmap. A public production release still needs the platform, security, accessibility and real-device evidence in the linked release contracts. Adopting a requirement is not evidence that its gate has passed.

First-release non-goals: public social network, AI-invented family history, unrestricted automated Geni scraping, public-by-default profiles, billing and native mobile distribution. Original code remains MIT-licensed; third-party assets and family data retain their own rights. Source availability does not license user content or guarantee a secure release.

## Competitive discovery and candidate requirements

Agent 05 owns permitted research of Geni, Ancestry and comparable products, with evidence and candidate mini-PRDs in [COMPETITIVE_RESEARCH.md](COMPETITIVE_RESEARCH.md). The role is defined in [05-competitive-researcher.md](agents/05-competitive-researcher.md).

New candidates remain proposed, deferred or rejected until Product records adoption against the charter and Design validates the interaction home. This version records CR-001–CR-006 as adopted planned requirements with contextual homes reviewed by Agent 02 and data/AI dependencies reviewed by Agent 03; implementation and runtime design validation remain outstanding. A proposed addition includes dated source references, observed/documented/inferred labels, user job, expected value, dependencies, acceptance cases and data/AI evaluation consequences. Usage and popularity require their own evidence. Accepted candidates retain their evidence IDs in the active requirement; rejected ideas retain rationale to prevent rediscovery churn. Research does not itself authorize implementation, data import or deployment.
