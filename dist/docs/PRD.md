# Kin Atlas — Product requirements

Version 0.1 · 8 November 2026 · Status: proposal with interaction prototype

## Purpose
An open-source, self-hostable family tree web app that makes relationships understandable through time and place. Scroll through generations, follow a person across the Earth, and collect the evidence and stories behind the tree. Any family can use it; no family names or provider IDs are hard-coded into the product.

## Users and jobs
- Family explorer: understand who lived when, where they came from, and how people connect.
- Family curator: correct relationships, import records, document uncertain facts, attach sources.
- Family contributor: record a story or upload a document and tag the people it concerns.
- Self-hoster: run a private instance without paid services or proprietary identity dependencies.

## Product principles
1. Time, tree, and geography share one selection and one date.
2. Motion communicates a relationship or a change. Never hide essential information behind animation.
3. Source-backed facts, family recollections, and inferences are distinguishable.
4. Unknown is a valid value. Missing death dates never prove that someone is alive; missing location dates never prove current residence.
5. Open-source software does not mean public family data. Public demos use fictional people only.
6. One deployable application, one database, portable exports; no microservices.

## Interaction design
**Timeline:** Vertical scrolling advances the active year, oldest at the top. A fixed year marker and optional range control provide orientation. People within a 35-year birth cohort move into focus; earlier/later relatives remain as contextual nodes. A birth cohort is not a living-at-this-date filter. Lines draw between connected people, while restrained parallax separates background era text from the active tree. Clicking a person opens a persistent detail panel and provides a jump-to-birth action. Search and a branch filter offer direct navigation. Switching views preserves year, person and branch.

**Earth:** A draggable globe shows birth events up to the chosen year or latest dated residence known at that year. Current residence is a separately confirmed status with an as-of date. Distinct event labels prevent birthplace from being mistaken for residence. Person selection centres the globe; a location list provides a keyboard/screen-reader alternative. A later release adds dated migration arcs. Map coordinates represent towns/cities, never street addresses by default.

**Visual language:** Midnight blue, warm ivory, muted copper, large editorial year numerals, subtle contour textures and luminous connections. Photos and documents add depth when available. No fabricated portraits. Mobile keeps the timeline primary, with details beneath the visualization. Reduced-motion preference removes parallax and animated movement; all actions have visible keyboard focus.

## Scope and acceptance criteria
| ID | Priority | Requirement | Acceptance |
|---|---|---|---|
| T1 | P0 | Scrollable timeline | Scroll up/down updates active year monotonically; endpoints reachable; year control and previous/next decade work without scroll. |
| T2 | P0 | Family graph | Nodes display names/dates and selectable relationships; selected card is visually distinct; connections remain correct across years. |
| T3 | P0 | Shared state | View changes preserve selected person, year and branch. Clicking a relative selects that same ID in both views. |
| G1 | P0 | Earth explorer | Drag rotates globe; zoom buttons work; selected city is centred; accessible event list offers equivalent selection. |
| G2 | P0 | Honest time/location | Future births are excluded from historical map; latest dated residence at/before year is used; unknown locations stay absent with an explanation. |
| D1 | P0 | Portable data | Stable IDs, explicit relationship types, dated events, source references. Export/import round trip preserves data. |
| E1 | MVP | Edit people and relationships | Add/edit parent, adoptive parent, partner and sibling; reject self-links, duplicate edges and parent cycles; preview merge/conflict changes. |
| I1 | MVP | GEDCOM import | Preview counts, unsupported fields, duplicate candidates and validation errors before committing; preserve original source file; no silent data loss. |
| A1 | MVP | Stories and documents | Record or upload audio; type a story; upload JPEG/PNG/PDF; tag multiple people; see originals on each profile. |
| A2 | MVP | Voice-assisted additions | Optional transcription generates a reviewable draft; people/relationships never committed solely from a transcript. Typed input remains available. |
| P1 | MVP | Private installation | Authentication required by default; owner/editor/viewer roles enforced server-side for data and file endpoints. |
| P2 | MVP | Backup/export | Download versioned JSON and attachments; document and test restore to an empty instance. |
| Q1 | P0 | Accessibility | All primary actions keyboard accessible; visible focus; reduced motion; readable contrast; usable at 390px width. |

## What this prototype implements
Fictional multi-generation dataset; scrolling birth-cohort focus; relationship paths; search/branch selection; person biographies and relatives; linked globe with birth/residence filters, drag, zoom and location selection; reduced-motion styling. No server or credentials, no network requests for family data. The globe uses an original schematic land outline, not a geographic reference basemap.

The prototype intentionally does **not** implement user accounts, persisted edits, Geni integration, GEDCOM import, audio recording/transcription, media uploads, migration arcs or collaboration. Those features require the MVP data layer. The existing private family website is separate and unchanged.

## Data and privacy
Use fictional seed data in Git and the hosted prototype. Never commit real family exports, credentials, household addresses or uploaded media. Living-person dates and locations are private by default. Imports from Geni must use permitted exports or explicitly authorized supported interfaces; no CAPTCHA bypass or assumed access to the entire world tree. Imported source and manual corrections remain distinguishable. Names and family structures must accommodate adoption, multiple partnerships and uncertain parentage without gender assumptions.

## Success criteria and release gates
Prototype usability trial with five people: at least four can find a relative, navigate a generation and explain a location marker within two minutes without coaching. Evaluate motion comprehension before polishing animations. MVP target: 1,000 people, focus limited to 100 rendered nodes, p95 interaction response under 100 ms on a representative mid-range laptop; measure rather than claim. No accessibility-blocking keyboard issues; no personal data in public repo; restore test and authorization tests pass before private production use. Analytics are opt-in and off by default.

## Delivery sequence
1. Interaction prototype + public-ready source + this PRD (current deliverable).
2. MVP: persistent people/events, editing, GEDCOM preview/import, JSON backup/restore.
3. Family archive: tagged documents and audio; optional transcription with review.
4. Private collaboration and richer mapping: roles, conflict resolution, migration routes, performance at scale.

## Non-goals for first release
Native mobile apps; automated Geni scraping/sync; social network; AI-invented family history; global matching engine; public-by-default profiles; photorealistic Earth imagery; billing.

## Decisions and trade-offs
- Working name Kin Atlas; name/trademark availability not checked.
- MIT license for original code. Third-party assets retain their own licenses. Family data is not licensed by the software license.
- Dependency-free ES modules for the prototype keep it easy to inspect and host. A production UI framework is not required; add one only when complexity justifies it.
- Self-hosted Node service + SQLite + filesystem attachments for MVP; optional storage adapters later. This minimizes cost and infrastructure, but multi-instance deployments need a different database/storage configuration.
- Public code with private data is the default model. Hosted demo visibility is independent of repository visibility.
