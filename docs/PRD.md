# Family History Tree App — product requirements

Version 0.3 · 16 November 2026 · Status: evolving prototype, not a production release.

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

The maintained name/spelling library, richer date/place extraction, long-session recovery and complete canonical reconciliation remain requirements for subsequent work. Do not present them as current capabilities.

## Scope and acceptance contract

| ID | Priority | Required behavior | Observable acceptance |
|---|---|---|---|
| EX-01 | Core | Immersive graph exploration | People and connections remain the foreground; controls follow the adopted action hierarchy on phone-width and desktop views |
| EX-02 | Core | Recoverable camera and scope | Tap, pan and zoom do not trap the user; the contextual escape restores the intended complete graph or fitted current view without a data write |
| EX-03 | Core | Consistent selection | Person IDs remain stable across charts, profile and geography; a relative link selects the same recorded person |
| EX-04 | Core | Deterministic kinship | Comparison uses recorded graph edges and explains the connecting path; missing evidence does not become a fabricated relationship |
| DS-01 | Release constraint | Design-system conformance | Registered surfaces, semantic tokens and component rules pass their executable checks; visual/task findings have an explicit disposition |
| AX-01 | Release constraint | Accessible interaction | Primary actions and exits are keyboard reachable; focus, names and states are meaningful; reduced motion and touch access remain usable |
| VO-01 | Core | Progressive voice/text draft | Finalized input can process while recording continues, with visible proposals and truthful pending/failure state; typed input follows the same review boundary |
| VO-02 | Release constraint | Reviewed commit | Only the exact reviewed identities and checked relationships persist; stale review, self-links and parent cycles are rejected |
| ID-01 | Next | Persistent identity/spelling correction | An approved correction becomes an explicit family-scoped name variant; later extraction does not silently replace it with a conventional spelling |
| BI-01 | Core / evolving | Structured person life story | A stable person record links narrative, events, relationships and sources; JSON preserves precision and provenance |
| BI-02 | Next | Canonical maintained biography | Reviewed claim changes produce a versioned, inspectable update with evidence references and human correction retained |
| SR-01 | Supporting | Search and source provenance | A search attempt records its query/provider/time separately from findings; accepted findings identify exactly which timeline changes they produced |
| ED-01 | Next | Manual editing and conflict handling | People, relationships and events can be corrected with validation, an understandable diff and a recovery path |
| IM-01 | Next | Genealogy import | GEDCOM or authorized provider import previews unsupported fields, duplicates and errors; retains source provenance and never silently loses data |
| AR-01 | Tier two | Documents and photographs | Local/drop upload preserves originals, supports multiple person tags and exposes extraction/retry status before reviewed claims are created |
| AR-02 | Tier two | Retrieval with citations | Local extraction/chunking and search retrieve traceable evidence; RAG distinguishes accepted facts, unreviewed claims and unresolved conflicts |
| OW-01 | Next foundation | Complete backup and restore | Versioned structured data and permitted attachments restore into a clean instance; per-person export alone is not a full backup |
| OW-02 | Planned production | Local-first distribution | A downloadable package provides a local vault and explicit local/cloud modes with verified handling and recovery; release claims match actual implementation |
| CO-01 | Later | Private synchronization/sharing | Permissions, encrypted sync, concurrent conflicts, revocation and recovery are verified before production privacy claims |

Detailed protocols live in the linked eval and architecture documents. These are not statements that every row is implemented.

## Current implementation and evidence limits

The static ES-module prototype includes fictional people, graph layouts, kinship calculations, navigation, profile timelines/sources, person JSON export, browser-local reviewed additions and research, memory proposals/review and a narrowly grounded connections chatbot. Current layout changes are evaluated against the design system; this list is not a blanket visual-quality certification.

The voice and model integration has been exercised with mocked speech/provider responses. Actual microphone quality, reliable long recordings and physical-device performance remain unqualified. Deterministic test counts do not certify those properties. The chatbot's model routes a limited intent contract; factual relationship answers come from graph code, not unconstrained model prose.

There is no implemented encrypted vault, desktop installer, complete backup/restore, GEDCOM import/export, uploaded-document ingestion, OCR/chunking, document RAG, automated archive collection, family-wide corrected-name lexicon or private multi-device collaboration. Birth/landing research currently opens official archive entry points and stores manually attached findings. The separate earlier real-family experiment is not integrated into the public fictional dataset.

## Data handling and architecture

Current prototype data is held in tab memory and browser localStorage as implemented. Browser-local persistence is not application-level encryption or a durable backup. The hosted site's access gate is not an implemented family-data account/role system.

When explicitly enabled, AI requests go directly from the browser to OpenRouter and the selected provider. Speech recognition may independently use the browser vendor's cloud service. Current provider configuration denies data collection and disables fallback; it does not establish zero retention or an offline/private inference guarantee. Keys remain in tab memory in the prototype. Do not publish a broader security promise than the implementation and provider behavior support.

The target local-first product uses a native boundary for local storage, secret handling and constrained model tools, with optional encrypted sync. It is documented in LOCAL_FIRST_PRODUCT.md and remains planned. Keep graph, source and review logic reusable; do not introduce a production framework or service merely to make the prototype look complete.

Public code, test fixtures and portfolio evidence must not contain private family exports, credentials, uploaded media or precise household details. Imports use permitted exports or authorized supported interfaces. No CAPTCHA bypass, unrestricted world-tree access or automatic identity match is assumed.

## Evaluation and release evidence

Every visible change needs the relevant state/task checks and expert visual review from DESIGN_EVALS.md, including mobile and desktop evidence. Automated token/control checks enforce declared invariants; they cannot determine taste by themselves. Record failed or unassessed anchors explicitly rather than averaging them into a synthetic quality score.

Measure task completion, mistaken taps, recovery effort, draft acceptance/corrections, processing lag and source support against real baselines. Set targets from task impact and observed evidence; do not invent trial quotas, rendered-node caps or model-accuracy percentages. A scale/performance claim must name the tested dataset, device and conditions.

Release reports identify the reviewed revision, changed behavior, checks performed, failures and unverified behavior. Distinguish source tests, mock integration, responsive browser checks, physical-device runs and user research. Prototype publication is not production qualification. Privacy, accurate provenance, reviewed writes and recoverability must not regress to pass a cosmetic review.

## Delivery and non-goals

Delivery order follows PRODUCT_CHARTER.md: stabilize the design system and explorer/memory loop; establish real voice/correction/recovery evidence; deliver local persistence and complete portable backup/restore; add documents and reviewed source research; then consider private collaboration.

First-release non-goals: public social network, AI-invented family history, unrestricted automated Geni scraping, public-by-default profiles, billing and native mobile distribution. Original code remains MIT-licensed; third-party assets and family data retain their own rights. Source availability does not license user content or guarantee a secure release.


## Competitive discovery and candidate requirements

Agent 05 owns permitted research of Geni, Ancestry and comparable products, with evidence and candidate mini-PRDs in [COMPETITIVE_RESEARCH.md](COMPETITIVE_RESEARCH.md). The role is defined in [05-competitive-researcher.md](agents/05-competitive-researcher.md).

Candidates remain proposed, deferred or rejected until Product records adoption against the charter and Design validates the interaction home. A proposed addition includes dated source references, observed/documented/inferred labels, user job, expected value, dependencies, acceptance cases and data/AI evaluation consequences. Usage and popularity require their own evidence. Accepted candidates retain their evidence IDs in the active requirement; rejected ideas retain rationale to prevent rediscovery churn. Research does not itself authorize implementation, data import or deployment.
