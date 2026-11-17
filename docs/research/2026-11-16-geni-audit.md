# Geni audit — evidence for family-history journeys

Inspection: 16 November 2026. PRD intake: 17 November 2026. Research owner: Agent 05, Competitive Research.

## Question, baseline and method

Which Geni workflows help a family create, understand, correct, research and preserve its history, and which belong in Family History Tree App?

This note distills the existing `geni-product-audit-2026-11-16.md` report; it is not a new inspection. The source report was reread for this intake. The inspected environment was the user's existing signed-in **Chrome / Geni Basic / desktop** session. Navigation and representative screens were inspected without changing fields, submitting forms, merging records, importing/exporting files, sending messages, issuing invitations, changing settings or publishing sharing. The tab was returned to Home. Ordinary navigation can still trigger the site's own session or analytics updates.

The app comparison used [GitHub baseline 059ace4](https://github.com/benschreiberca/family-history-tree-app/commit/059ace4deec849efb31b0805743fae9aa235b5e2), its charter/PRD/inventory/design contracts and relevant source. Code inspection is not fresh execution testing. This is representative information-architecture research, not a complete site/database scrape or recovered implementation. No mobile, paid-plan, save/merge/restore or permission-boundary behavior was tested. Empty collections prove their displayed structure, not successful ingestion. The poster route exposed only a shell.

No private names, identifiers, record values, messages, credentials or screenshots are included. Person routes use placeholders. All evidence below was retrieved **16 November 2026**, published by **Geni**; product-page publication/update dates were not exposed unless stated. `O` means directly observed UI, `L` an entry point only, `D` official documentation, and `P` partial visual/shell coverage. Availability beyond the inspected account remains unverified.

## Site structure and complete inspected coverage

| Area | Pages and capability coverage | Evidence |
|---|---|---|
| Home/account | Activity, revisions, notifications, matches, completeness, statistics, recent-online relatives, Pro promotion; profile, invite, settings/privacy/language/help/logout entry points | G01–G02 |
| Tree | Person cards, connectors, portraits/dates, missing-parent placeholders, zoom/recenter/directional controls, minimap/print icons and match explanation | G03 |
| Person hub | Overview/About, facts, immediate family, manager/creator context; Activity, Media, Timeline, Discussions, Sources, Revisions and DNA tabs; action/family/history entry points | G04–G07 |
| Record maintenance | Basic editor, names/languages/aliases, date qualifiers, per-field citations, places/custom-information entry; inconsistency categories, duplicate/tree conflicts and field-value comparison | G08, G10, G15 |
| Match research | Matches, Requested Merges, Tree Conflicts, Data Conflicts; ownership scopes, tree/record/smart/free-record filters and summaries of what a match adds | G09–G10 |
| Documents/private research | Document collection/ownership/privacy filters and sort; documented Pro notes, to-dos, projects, linked profile/page context, tags/favorites and deleted-item recovery | G11, G17 |
| Import/portability | GEDCOM landing, staged branch import explanation, match pauses, focus conditions, export limits; Create a Branch entry point | G02, G12 |
| Tables/search/directories | Focused relatives lists, attributes/events/columns, profile/revision modes, saved-list/quick-edit entry points; advanced name/family/date/place/status search; family surname index, public surname and profile discovery | G13, G24, G26–G27, G30 |
| Time/place/statistics | Person and family timelines, scopes/date ranges/type filters, own/relative/undated events and age; geographic location modes, legends and missing-place prompts; aggregate family statistics | G06, G14, G18, G20 |
| Media | Recent photo/album modes, ownership and author context, organizer/upload entry points; empty video collection and upload entry | G21–G22 |
| Sharing/community | Invite, limited read-only publish/embed and GEDCOM entry; calendar/greetings; public/family/followed discussion scopes and thematic projects | G16, G19, G23, G25 |
| Ancillary | DNA partner storefront, poster page shell, Pro promotions; footer About/terms/privacy/cookies/conduct/blog/World Family Tree/help/language links | G01–G02, G17, G28–G29 |

The profile is the observed navigation hub: tree, lists, timeline, sources, matching and revisions link to people. Structural conflicts, field conflicts, possible matches and rule-based inconsistencies are distinct queues. The inspected conflict comparator distinguishes proposed corrections from owner approval. These observations do not establish every permission rule or Geni's physical architecture. A conceptual model of people, relationships, events, sources/citations, revisions, candidate matches and private research notes is an **inference**, not a recovered database schema. The map visibly used Google Maps; no programming-language, hosting, matching-algorithm or AI-stack claim follows.

## Evidence register

| ID | Source / canonical route | Supported finding and limits |
|---|---|---|
| G01 | [Home](https://www.geni.com/home) | O: activity/revisions, notifications, matches, completeness, statistics, recent-online modules and Pro promotion. Private inbox/request destinations not inspected. |
| G02 | [Home navigation](https://www.geni.com/home) | O menus: Family, Research and account destinations. L: account/privacy/language/logout, invite, Create a Branch, Pro trial and footer destinations; no settings or subscription actions. |
| G03 | [Tree](https://www.geni.com/family-tree), `/family-tree/index/{person}` | P/O visual inspection: cards/connectors/control icons and match explanation. MyHeritage subscription message observed; paid workflow and interaction success not tested. |
| G04 | `/people/{slug}/{person}` | O: facts, immediate family, About, eight tabs, manager/creator context. L: Activity/Media/Discussions/DNA and actions; outcomes untested. |
| G05 | Person `#/tab/source` | O empty Sources: document-to-fact explanation. L: View Facts and Source Conflicts. No citation created or conflict resolved. |
| G06 | Person `#/tab/timeline` | O: own/family events, age, undated event, date range and birth/wedding/death/burial/divorce/education/occupation/other controls. Event detail not tested. |
| G07 | Person `#/tab/revision` | O: actor/action/date log. L: field comparison at `/revisions/history/{record}`. Restore not executed. |
| G08 | [Consistency Checker](https://www.geni.com/inconsistencies) | O: categories, reasons, tips, autofix/ignore and conflict entry points. Examples include implausible chronology and same-name siblings; none corrected or ignored. |
| G09 | [Match Center](https://www.geni.com/list/matches) | O: four queues, relative/followed/managed/collaborator scopes, match types and value-added summaries. External destinations not followed. |
| G10 | [Tree Conflicts](https://www.geni.com/list/tree_conflicts), [Data Conflicts](https://www.geni.com/list/data_conflicts), `/merge/resolve/{person}` | O: structural versus field conflicts, main/alternate comparator, creator/manager context and owner-approval explanation. No choices changed or correction sent. |
| G11 | [Documents](https://www.geni.com/documents) | O empty collection: Birth/Census/Death/Immigration/Marriage/Military/Newspapers/Other, followed/uploaded, public/private and date/title sorting. Upload/reuse not tested. |
| G12 | [GEDCOM](https://www.geni.com/gedcom) | O landing/D workflow: gradual branch import pauses on possible matches; existing-person/new-branch focus and export limits explained. `/gedcom/import` and `/gedcom/export` execution untested. |
| G13 | [Lists](https://www.geni.com/list) | O: focus/group/attribute/event filters, custom columns and profile/revision modes. L: saved-list and quick-edit operations. |
| G14 | [Map](https://www.geni.com/map) | O rendered Google Map: current/birth/death/burial modes, living/deceased/in-law legend and missing-location prompts. Accuracy of recorded locations not assessed. |
| G15 | `/profile/edit_basics/{person}` | O form only: multilingual names, birth surname, aliases/display name, citation icons, exact/before/after/between/circa dates, places, custom-information entry and Save controls. No field changed. |
| G16 | [Share Your Tree](https://www.geni.com/family-tree/share) | O: Invite, limited read-only publishing/embed and GEDCOM entry. No access granted or publication created. |
| G17 | [New! Organize Your Research with the Geni Pro Workspace](https://www.geni.com/blog/new-organize-your-research-with-the-geni-pro-workspace-113284.html) | D only: official announcement by Amanda, **4 March 2026**. Private notes/to-dos/projects, linked profile/page context, tags/favorites, recent activity and deleted-item recovery. Pro-only functionality not exercised. |
| G18 | [Statistics](https://www.geni.com/statistics) | O: family/blood/ancestor scopes and age/lifespan/children/birth-month/name statistics. Calculations and missingness treatment not audited. |
| G19 | [Calendar](https://www.geni.com/calendar/upcoming) | O: upcoming birthdays/anniversaries, greetings and full-year link. No greeting sent. |
| G20 | [Family Timeline](https://www.geni.com/timeline/family) | O: chronology, pagination/reverse order, people scopes, date range and event-type filters. |
| G21 | [Photos](https://www.geni.com/photo/recent_albums) | O index: recent-album/photo modes, me/family filter, author/update context. L: organizer/upload/detail. |
| G22 | [Videos](https://www.geni.com/video/recent_videos) | O empty index: me/family filter and upload entry. Playback/ingestion untested. |
| G23 | [Projects](https://www.geni.com/projects) | O: theme collections, my/all projects, search and recommended project. Creation/follow not executed. |
| G24 | [Advanced Search](https://www.geni.com/search/advanced) | O: name variants/flexible matching, family context, date/place/status filters. No query submitted. |
| G25 | [Discussions](https://www.geni.com/discussions) | O public index: public/family/followed scopes and topic/author/message/latest columns. No private inbox inspection or posting. |
| G26 | [Surnames](https://www.geni.com/surnames) | O: surname search and popular surname list. Detail pages not inspected. |
| G27 | [Last Names Index](https://www.geni.com/search/surname_index) | O: alphabetized family surname directory and counts. |
| G28 | [DNA Tests](https://www.geni.com/dna-tests) | O storefront: partner tests and purchase/detail links. No genetic results or purchase workflow inspected. |
| G29 | [Chart entry](https://www.geni.com/family-tree/poster), `/family-tree/poster/{person}` | P: shell only. Printed/downloaded artifact not verified. |
| G30 | [Popular Profiles](https://www.geni.com/people) | O: public-profile discovery index and ancestor-search entry. |

## Transferability and source-verified gaps

The main transfer is knowledge maintenance: explain proposed changes, connect sources to individual facts, preserve competing claims, make errors actionable, retain revisions and keep private research theories outside accepted history. The app should adapt this value into its existing tree, memory review and person panel, not reproduce Geni's navigation or monetization.

| Current implementation evidence | Consequence / existing scope |
|---|---|
| `dist/voice-core.js` permits only parent/partner links and excludes dates from extraction | Typed relationship semantics, uncertain dates and richer event extraction remain requirements; deterministic kinship must not imply biological parentage. |
| `dist/voice.js` groups equal normalized names; no identity split control or persistent alias lexicon | ID-01/ED-01 need explicit split/merge decisions, multilingual/birth/alias variants and matching that can abstain. |
| Voice drafts/queue/audio are session-scoped; reviewed additions and research use localStorage | Durable drafts, complete portable backup/restore and transactional recovery remain foundations. Existing session/person downloads are not a complete archive. |
| `dist/profile-core.js` projects accepted documentary events separately from base person/chart/map fields | CR-005 requires one accepted event/claim model to drive all views; it does not claim Geni uses a particular backend. |
| `dist/profile.js` saves per-person searches/findings and overwrites review status | Preserve current candidate/accepted/rejected workflow; extend it with immutable decisions, fact citations and research-question lifecycle. |
| Existing-person stories are saved but not maintained as visible cited biographies | BI-02/CR-002 need linked original recollections and reviewed narrative revisions. |
| Manual editor, GEDCOM import, original-document ingestion, whole-family restore and private sharing are documented as planned | These are actual completion gaps, not missing entry-point labels. This research does not change implementation status. |

Date semantics must preserve exact/before/after/between/circa/unknown meaning, precision and original source wording; no invented midpoint or exact age. Name variants require stable identity plus sourced display/birth/former/nickname/original-script/transliterated forms where supplied; identical names never establish identity. Import should pause on unresolved matches, retain checkpoints and report unsupported fields. Research notes should link questions, hypotheses, attempts, evidence and next actions without promoting a theory to fact.

All audited coverage has a disposition in the [PRD](../PRD.md). High-fit journeys include import/create, voice capture, correction/recovery, evidence/media, research, exploration and controlled contribution. Lists, family-context timelines, event/place filters, surname navigation, albums/video, printing, statistics, calendars and deliberate sharing are supporting/later journeys, with their dependencies explicit. Social greetings/gifts, broad public discovery/projects/forums, DNA commerce and competitor paywall parity are recorded for traceability rather than silently becoming first-release obligations. The six adopted planned research requirements and original evidence history are in [COMPETITIVE_RESEARCH.md](../COMPETITIVE_RESEARCH.md).

## Usage, priorities and research quality

Observed friction: the tree is a separate visual surface with sparse accessible text and an onboarding overlay; maintenance tasks span multiple tabs and queues; record viewing mixes subscription/social prompts. These are session observations and design judgments, not measured failure rates, accessibility certification, adoption or retention evidence.

The audit's expert order was integrity/recovery as gates, then existing-tree import, richer voice capture, originals/evidence, contradiction review, maintained life stories, remote contributions and automated discovery. The user subsequently authorized PRD intake of the journey features; that instruction changes requirement disposition, not the strength of this preference evidence. **No empirical MaxDiff responses or winner exist.** The authored seven-outcome instrument uses DEFG, BCFG, BCDE, ACEG, ACDF, ABEF, ABDG: each item appears four times and all 21 pairs twice. It compares import, voice-to-history, contradiction resolution, media preservation, external discovery, remote contribution and sourced biographies. No synthetic answers are research evidence; implementation sequencing also respects dependencies.

| Review | Disposition and boundary |
|---|---|
| CR-01/02/03 | PASS for retained source/date/class/context; link-only and documented behavior are not relabelled tested tasks. |
| CR-04 | PASS: no fabricated usage, confidence, consumer-preference or statistical results. |
| CR-05/06/08 | Candidate contracts preserve job, existing requirement, UI home, acceptance/dependency/non-goal and validation; Product/Design intake is a planning review, not implemented UX validation. |
| CR-07 | PASS for sanitized read-only evidence; no member-data publication or new Geni action in this intake. |
| CR-09 | PASS within fixed inspection baseline; no new freshness claim on 17 November and no absence inferred from unvisited pages. |
| CR-10 | Scope adoption is recorded separately in the register/PRD; implementation remains unbuilt or partial as documented. |
| End-to-end competitor mutations, mobile/paid plans, participant research | NOT RUN. |
| Full-site/backend reconstruction | NOT AVAILABLE from this inspection. |

Next implementation validation uses a fictional imported family with two same-name people, an approximate birth date, a passenger list and a conflicting spoken recollection. Review differences, preserve alternatives, accept a correction, verify consistent projections, undo it, and restore the complete archive in a clean instance. Product owns delivery priority; Design owns interaction placement; Engineering owns shared contracts; Release owns demonstrated recovery and no-loss evidence.
