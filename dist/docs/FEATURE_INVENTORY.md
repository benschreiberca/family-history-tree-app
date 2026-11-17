# Family History Tree App — feature inventory

Reviewed 2026-11-17. This is a prototype, not a production release. **Implemented** means present in the current code; **Partial** means usable but with material gaps; **Planned** means not built. Validation is stated separately. No actual private family records are bundled in the public project.

## UX priority update

[UX_PRIORITIES.md](UX_PRIORITIES.md) ranks the complete product capability groups and defines the immersive interaction model. The default explorer now uses a full-viewport tree, floating compact toolbar, on-demand search/tools and on-demand full-height profile side panel.

## Explore and visualize

| Feature | Status | What exists / user value | Next implementation work |
|---|---|---|---|
| Focus timeline | Implemented | Vertical page scroll selects generations; closer relatives are larger and central | Test long trees, unusual dates and additional devices |
| Constellation network | Implemented | Drag nodes, pan, zoom, highlight immediate connections | Collision-aware labels, large-tree performance |
| Pedigree | Implemented | Selected person below recorded ancestors | Multi-path ancestry/pedigree collapse visual explanation |
| Descendants | Implemented | Selected person above descendants | Branch expand/collapse |
| Horizontal generations | Implemented | Left-to-right parent hierarchy with cards | Improve crossing minimization; generation is graph-derived, not age |
| Kinship rings | Implemented | Distance from selected person measured in parent/partner edges | Density-dependent labels; distinguish ancestry distance from general kinship distance |
| Ancestor fan | Implemented | Semicircular ancestor-depth bands; no invented ancestors | A graph fan, not a binary pedigree-slot chart; shared ancestors appear once |
| Lifespans | Implemented | Birth/death horizontal spans; unknown birth lane and open death stubs | Date ranges and uncertainty representation |
| Relationship arcs | Implemented | Birth-ordered nodes and curved connections | Ordering options; spacing is ordinal, not a time scale |
| Hourglass | Implemented | Ancestors above and descendants below selected person | Collapse distant branches |
| Visual style picker | Implemented | Ten visible quiet text choices in a scrollable strip; keyboard focus and explicit activation; preferred style saved locally | Per-family layout preferences and saved camera positions |
| Smooth transitions | Implemented | Animated node position changes, hover highlights, reduced-motion support | Edge interpolation and responsive label collisions |
| Comparison | Implemented | Select two people, plain-English cousin/removal results and evidence path | Multiple common-ancestor paths; explicit adoptive/step/half relationships |
| Comparison scroll | Implemented | Focus timeline continues scrolling while pair stays selected | Broader touch and keyboard regression tests |
| Person/name search | Implemented | Search known people; branch filter | Alias search, transliteration and ambiguous-match UI |
| Earth view | Partial | Horizontal rotation; city-level birth/last-recorded-residence points | Replace schematic land; add sourced migration journeys |
| Globe in each biography | Planned | Requested compact interactive map inside profile | Reuse globe renderer, source-aware per-person events |
| Responsive/accessibility support | Partial | Keyboard controls, focus styles, reduced motion, responsive CSS | Screen-reader and mobile device audit; dense-chart alternatives |

## Voice, people and life stories

| Feature | Status | What exists / user value | Next implementation work |
|---|---|---|---|
| Build with voice workspace | Implemented | In-place Add a memory dock; drafts grow in main canvas; transcript/settings on demand; review side panel | Real-user task testing; simplify AI setup further |
| Incremental voice tree | Partial | Final speech segments queue while recording continues; extraction updates graph between segments | Real microphones and 1/5/10-minute runs; queue lag and restart resilience |
| Processing feedback | Implemented | Recording clock, listening/processing status, counts, per-segment activity and retry | Keep failed-state context across stop/start and disk recovery |
| Live transcript | Partial | Browser speech recognition, interim text, editable after stop | Local ASR engine for private/offline desktop; speaker attribution |
| Text fallback | Implemented | Paste or edit narrative, process into draft | Segment long pasted stories based on actual model context |
| Name/identity review | Partial | New/existing/skip choices; verbatim evidence; explicit relationship checkboxes | Split same-name people; fuzzy candidate matching with abstention |
| Relationship commit checks | Implemented | Self-link/cycle validation; stale-review guard; storage write before mutation | Transactional database, actor and full undo history |
| Remember corrected spellings | Planned | No persistent family-wide alias/lexicon yet | Scoped NameVariant records; approved corrections feed ASR and extraction |
| Extract dates and places from voice | Planned | Current voice parser extracts named people + parent/partner links only | Independent sourced claims and uncertainty review |
| Recorded memories | Partial | New people's quotes saved as biography text; prior bios not overwritten | Link stories to existing people visibly; retain chronology and speaker |
| Canonical maintained biography | Planned | Current biography is static/recorded text | Versioned projection from accepted claims, paragraph citations and approval diff |
| Per-person timeline | Implemented | Base events plus explicitly accepted documentary events | Shared event store; propagate to maps/chart dates after conflict resolution |
| Sources tab | Implemented | Search attempts, references, URLs, findings, acceptance/rejection and resulting event | Full immutable review ledger; edits, deletion and richer source previews |
| Birth/landing research | Partial | Official archive entry links and logged query; manually attached findings | Provider-specific search adapters and identity review; no automatic scraping today |
| Structured person export | Implemented | Versioned JSON + schema including events, relationships and sources | Validated import, migrations and whole-family bundles |
| GEDCOM interoperability | Planned | Mapping documented, no implemented .ged import/export | GEDCOM 7 validator and round-trip fixtures |
| Manual tree editor | Planned | Voice review can add people/links; no complete standalone editor | Add/edit/remove/reconcile events and relationships with undo |
| Geni import | Not integrated | Separate earlier real-family experiment; current app ships fictional data | Authorized import adapter with source IDs, deduplication and permission checks |

## AI and quality

| Feature | Status | What exists / user value | Next implementation work |
|---|---|---|---|
| Grounded family chatbot | Partial | Model routes intent; deterministic graph code supplies relationship facts | Broader query types, pronouns, ambiguous-name clarification |
| BYO OpenRouter key/model | Implemented | Tab-memory key, selectable model, free-only guard, no paid fallback | Desktop secret vault and native network broker |
| Model-independent contracts | Implemented | Strict routing and voice JSON validation; no raw model prose as graph truth | More provider adapters, local model endpoint and conformance suite |
| Runtime checks | Partial | Per-request validation and session counters | Persistent local evaluation ledger across edits and restarts |
| Model comparison runner | Partial | Nine fictional routing cases, downloadable results | Paired runs, held-out cases, statistical uncertainty; no qualified model claimed |
| Always-on conflict/missing-item evals | Planned | EVALS.md specification, not a background service | Event-driven jobs after each commit; deduplication and human review inbox |
| Voice semantic correctness | Partial | Verbatim quote and endpoint checks + human review | Entailment and speaker/negation tests; quoted words alone do not prove a link |
| Continuous self-improvement | Planned | No automatic prompt/model promotion | Reviewed corrections → regression fixtures → gated experiments → rollback |
| AI PM portfolio evidence | Partial | PRD, architecture, eval specs, tests and documented boundaries | Published baseline report, decision log, UX evidence, failure taxonomy and cost dashboard |

## Documents, storage, privacy and distribution

| Feature | Status | What exists / user value | Next implementation work |
|---|---|---|---|
| Browser-local persistence | Partial | Reviewed voice additions and research saved in localStorage | Migrate to transactional desktop vault; avoid treating browser data as durable backup |
| Transcript/audio downloads | Implemented | User downloads current transcript and recording | Durable draft autosave and recovery; recording export is session-scoped |
| GitHub source distribution | Implemented | Public source, docs, tests and downloadable source ZIP | Signed tagged desktop releases and release CI |
| Installable desktop app | Planned | No installer exists yet | Tauri shell; Mac/Windows/Linux builds; OS integration and signing |
| Local document library | Planned, tier two | Design documented; no upload/drop UI yet | Encrypted file vault + database metadata + person tags |
| PDF/images/photos drag-and-drop | Planned, tier two | No ingestion implementation | Quarantine, MIME checks, dedup, thumbnails, resumable jobs |
| Extraction/OCR and chunking | Planned, tier two | Page-aware contracts documented | Local PDF text + local OCR; correction/reindex flow |
| Family RAG | Planned, tier two | No document retrieval in chatbot | Local full-text first; optional embeddings; cited evidence and conflicts |
| Local AI / offline speech | Planned | Current AI uses OpenRouter; browser ASR may use cloud | Local ASR and model adapters; no-egress verification |
| Encrypted vault at rest | Planned | localStorage is not an application-encrypted vault | Database/file encryption, key recovery and lock behavior |
| Data handling dashboard | Planned | Current consent text explains providers; no outbound request inspector | Mode badge, payload preview, destinations and local request log |
| Private multi-device sync | Planned | No family synchronization service | Encrypted immutable changes/blobs; signed manifests and conflict review |
| Family RW/RO sharing | Planned | Hosted site access is not family-data sharing | Device/member keys, signed write permissions, revocation limits |
| Portable full backup / restore | Planned | Per-person JSON and source ZIP are not whole-vault backup | Encrypted bundle, independent restore validation and recovery UX |
| Product telemetry | Not implemented | No application analytics SDK in prototype | Default off in desktop; explicit opt-in redacted reports only |
| Hardened LLM tools | Planned | Current narrow validation helps, but key lives in JS memory | Native capability broker, no arbitrary SQL/files/shell/network |

## Verification and priorities

The 2026-11-16 design-system checkpoint recorded 40 passing deterministic/mock tests and the scoped source design check. Its [historical review](reviews/2026-11-16-design-system.md) records browser evidence and limitations. The [2026-11-17 journey PRD review](reviews/2026-11-17-journey-prd.md) records the current documentation candidate's gates separately. Five reusable role contracts, source/rendered design checks and CI/package gates are implemented; human visual review and affected browser tasks remain required. Competitive research now feeds source-backed candidate PRDs through Product/Design review; no unattended competitor scraper or automatic feature rollout is installed. This does not install continuously running agents or branch protection.


Historical feature validation: 31 automated tests passed at the feature-expansion checkpoint. New layout tests cover valid IDs/geometry, ancestral vs descendant scope, unknown dates and cycle handling. Browser checks exercised all nine alternate modes, and a **mocked** two-segment voice run grew from two people/one link to three people/two links while recording remained active. Inline review opened after stopping. These are integration checks, not evidence of real transcription accuracy or provider reliability. Actual microphone use, long recordings, cloud model quality, multi-device sync and encrypted vault security remain unverified or unimplemented.

## Journey requirements adopted 2026-11-17

The Geni audit informed the expanded [PRD](PRD.md). Adoption means a requirement is approved for the stated delivery stage; it does not change implementation status. The PRD owns journey acceptance criteria and delivery order. [Research evidence](research/2026-11-16-geni-audit.md) distinguishes observations from inferred opportunities. No participant MaxDiff results exist; priorities are Product judgment.

| Journey / capability | Current status | Adopted work still required |
|---|---|---|
| JY-01 Bring an existing tree | Planned | GEDCOM mapping, preview, uncertain dates and names, duplicate resolution, resumable import and verified recovery |
| JY-02 Capture a recollection | Partial | Durable drafts, same-name splitting, scoped name variants, dated events/places and source-preserving review |
| JY-03 Correct identities and facts | Partial | Complete manual editing, merge/split, typed relationships, exact change preview, immutable revision ledger and compensating restore |
| JY-04 Preserve media and evidence | Planned | Original attachments, extraction jobs, independent person/event citations with page/region anchors and safe removal/retry |
| JY-05 Pursue a research question | Partial | Research question/hypothesis/next action, linked evidence, resolve/reopen history and authorized discovery adapters; search logs/manual findings exist |
| JY-06 Collaborate privately | Planned | Contributor proposals, permission enforcement, concurrency, revocation and recovery; hosted access alone does not supply these |
| JY-07 Understand a sourced life | Partial | Maintained biography, family-context events, uncertainty-aware places, source-linked printing and aligned views; current profile and charts are interim |
| Backup and interruption recovery | Planned / limited session exports | Complete archive/restore, checkpoints, attachments, stable IDs and explicit failure recovery; person JSON is insufficient |
| CR-001 Explain the exact change | Partial | Existing voice identity review expands to independent claim decisions, old/new/evidence, conflicts and stale revision handling |
| CR-002 Revision ledger and restore | Planned | Actor/time/field/evidence/reason history and append-only recovery; current review status is mutable |
| CR-003 One original, many citations | Planned | Independent links to multiple people/events; rejecting one proposed fact must preserve the original and other citations |
| CR-004 Explained consistency checks | Planned | Versioned deterministic rules, uncertainty-aware warnings, reasoned dismissals and reevaluation after relevant changes |
| CR-005 One accepted claim across views | Partial | Profile/export currently project accepted documentary events; shared claim/event IDs must also drive charts/maps without stale base dates |
| CR-006 Research question and next action | Planned | Private working theory remains distinct from accepted facts; compact contextual workflow within Sources |
| Historical date precision and multilingual identity | Planned | Exact/partial/circa/before/after/range dates; script/language/name variants; unknown and conflicting values stay explicit |
| Compact lists, family context and print | Planned | Accessible filtered list, contextual timeline/map and source-aware output; no automatic claim of current addresses or exact migration routes |
| Calendar, aggregate statistics, media organization | Planned, optional later | Separate later requirements; not prerequisites for the core genealogy loop |
| Public world tree/social feed, gifts, DNA, billing | Outside current scope | Audit accounted for these surfaces; no requirement to reproduce them in the current product |

Release sequencing and gates are maintained in [PRD.md](PRD.md) and [PRODUCT_CHARTER.md](PRODUCT_CHARTER.md), rather than an independent roadmap here. Real voice/device evidence, complete archive recovery, verified data handling and accessibility remain release gates for the capabilities that depend on them.

See [LOCAL_FIRST_PRODUCT.md](LOCAL_FIRST_PRODUCT.md) for architecture, privacy promises, tool boundaries and release gates.
