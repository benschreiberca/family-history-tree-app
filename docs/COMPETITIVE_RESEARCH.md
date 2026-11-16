# Competitive research and candidate PRD backlog

Owner: [Competitive research agent](agents/05-competitive-researcher.md). Product decisions: [Product lead](agents/01-product-scope.md).

This register connects external evidence to candidate requirements. It is not a feature-parity roadmap. Keep the tree-first core loop and existing priorities; candidates require Product disposition before entering adopted scope.

## Initial evidence pass — 2026-11-16

**Question:** Which documented patterns from Geni and Ancestry could improve reviewed identity, conflicting facts and traceable family history?

**Method:** public official help retrieved through web search/open; no account login, member-tree scraping, full-site crawl, paid records, actual workflow test or usage study. Evidence below is documentation-level only. Device/plan details are recorded where the source states them; absence of such detail is unknown availability. Article dates are not retrieval dates.

| ID | Product / source | Retrieved / article date | Evidence and limits |
|---|---|---|---|
| E-GENI-001 | [What are data conflicts and how do I resolve them?](https://help.geni.com/hc/en-us/articles/229705487-What-are-data-conflicts-and-how-do-I-resolve-them), Geni Help Center | Retrieved 2026-11-16; published 2011-02-25, updated 2016-02-23 | Documents review of conflicting merged-profile fields and selection of the displayed value, subject to edit permission. Plan/device not established; current UI not tested. Older workflow guidance needs live confirmation before copying interaction details. |
| E-GENI-002 | [How To: Use Revisions on Profiles](https://help.geni.com/hc/en-us/articles/229704007-How-To-Use-Revisions-on-Profiles), Geni Help Center | Retrieved 2026-11-16; published 2011-04-20, updated 2026-04-02 | Documents timestamped authorship, field comparison, restoration with edit permission, and narrative revision comparison. Plan/device not established; not a tested recovery flow. |
| E-ANC-001 | [Ancestry Hints](https://help.ancestry.com/hc/en-us/articles/53933288454291-Ancestry-Hints), Ancestry Help | Retrieved 2026-11-16; article date not exposed in retrieved text | Documents candidate records, explicit accept/reject/later decisions and review of individual facts/people before saving. Website and app differ: some member-tree hints are website-only. Record access depends on membership/free collections. No claim that matches are correct or widely used. |
| E-ANC-002 | [Managing Facts, Events, and Sources in Trees](https://help.ancestry.com/hc/en-us/articles/53933348187923-Managing-Facts-Events-and-Sources-in-Trees), Ancestry Help | Retrieved 2026-11-16; article date not exposed in retrieved text | Documents attaching sources/media to facts/events and reusing a source for additional people. Specific record access and device coverage not verified. No document acquisition or portability claim is established by this source. |

These are concise original summaries, not copied documentation. No evidence supports adoption rates, ease of use or mobile task completion. A provider's description of intended use is not observed behavior.

## Initial feature aggregation

| User job | Documented pattern | Existing app / transferable opportunity | Recommendation |
|---|---|---|---|
| Decide whether two reports refer to the same fact/person | Geni field-conflict review; Ancestry fact/person comparison before save | Existing voice identity/link review and source acceptance can host one consistent field-level decision model | Adapt within current review, subject to Product scope |
| Leave an uncertain match unresolved without losing it | Ancestry accept/reject/later decisions | Current provisional voice proposals need durable undecided state; do not force a name match or infer a relationship | Adapt after draft persistence/recovery dependencies |
| Understand why a biography changed and undo a mistake | Geni profile/narrative revision comparison and restoration | Canonical bio maintenance is planned; use linked revisions instead of silent generated overwrites | Candidate design now; defer implementation until canonical profile storage contract |
| Use a family document as evidence for several people | Ancestry source/fact links and source reuse | Sources already exist; uploaded document storage/RAG is tier two. One source object should support multiple reviewed person/event links | Adapt in the tier-two schema; defer new upload UI |

These recommendations are this app's hypotheses. They do not assert that a competitor's design is better or that a feature will improve retention.

## Candidate PRD entries

### CR-001 — One evidence comparison step for proposed facts

- **Status / decision:** candidate; Product not yet adopted. **Recommendation:** adapt the current review flow.
- **Sources:** E-GENI-001, E-ANC-001. **User/job:** a family contributor deciding what a memory or discovered record should change.
- **Current gap:** prototype review resolves identities/links and source conflicts, but there is no universal reviewed claim-to-canonical-biography reconciliation contract. Confirm exact existing behavior before implementation.
- **Proposed behavior:** show the current value, proposed value, original quote/source and affected person together. Choose keep current, accept candidate, preserve an alternate or decide later. Relationship changes retain explicit link approval; contradictory claims are retained with provenance.
- **Non-goals:** automated truth selection, competitor-style match dashboard, automatic profile merge or new top-level explorer button.
- **UI home:** existing memory review or person Sources side panel; Design chooses one shared comparison component.
- **Acceptance:** an unresolved identity never writes a canonical fact; every accepted/rejected/deferred decision retains source and person IDs; an alternate survives export; revisiting a deferred item preserves its context; changing a choice does not silently approve unrelated facts/links.
- **Data/dependencies:** stable claim IDs, revision-aware review and durable draft persistence; decisions refer to input revision so stale review cannot commit.
- **AI/evals:** deterministic commit validation; models may extract candidates only. Extend conflict, unsupported-claim, spelling and approved-diff evals; UX-09/10 and trust-state design review.
- **Benefit hypothesis / next evidence:** reduces repeated re-reading and forced guesses. Test with fictional conflicting birth dates and same-name relatives; observe mistaken approvals and recovery rather than inventing a success target.
- **Handoff:** Product deduplicates against EVALS/LIVE_VOICE requirements and bounds the change; Design reviews narrow/desktop comparison; AI engineer supplies exact approved-diff fixtures.

### CR-002 — Traceable canonical biography revisions

- **Status / decision:** candidate; Product not yet adopted. **Recommendation:** design with canonical bio work, defer shipping until its storage/revision contract exists.
- **Source:** E-GENI-002. **User/job:** understand what changed in a person's story and restore an earlier interpretation without losing sources.
- **Proposed behavior:** each reviewed biography revision points to the accepted claim set and prior revision. On demand, show an understandable before/after and reason; restore by creating a new revision rather than erasing history.
- **Non-goals / UI home:** no history dashboard or automatic rewrite; profile Life & sources contains contextual history.
- **Acceptance:** generated sentences resolve to accepted evidence; unresolved conflicts remain explicit; changing wording never creates new family facts; restoration preserves prior history and references; profile export retains revision/source identifiers.
- **Dependencies/data:** canonical profile format, transactional revision storage, provenance links and backup/restore semantics. No existing full-history implementation is claimed.
- **AI/evals:** factual sentence support, conflict retention, unsupported additions, round-trip export and deterministic revision restoration. Human-readable diff reviewed on mobile/desktop.
- **Benefit hypothesis / next evidence:** makes generated stories correctable and accountable. Test a fictional revision that changes a birth year, spelling and narrative interpretation; verify the reader can identify and reverse the change.
- **Handoff:** Product aligns with canonical bio scope; AI engineer defines claim-to-sentence evidence; Design keeps history secondary.

### CR-003 — Reusable source, multiple reviewed person/event links

- **Status / decision:** candidate; Product not yet adopted. **Recommendation:** adapt in tier-two document design; defer ingestion UI.
- **Source:** E-ANC-002. **User/job:** attach one arrival record or photograph to everyone it supports without duplicate uploads or invented relationships.
- **Proposed behavior:** store the source once; link selected people/events through separate reviewed citations, each with locator and extracted quote when available.
- **Non-goals / UI home:** no mass import, inferred family connections or new explorer toolbar; existing profile Sources and planned document-drop flow.
- **Acceptance:** one source ID can support several person/event IDs; rejecting one link preserves the others; removing access to a document shows unavailable evidence rather than fabricated content; portable exports retain locators and link IDs.
- **Dependencies/data:** document storage, deduplication, extraction/chunking and per-file access rules; assess retention/deletion before implementation.
- **AI/evals:** extraction evidence must resolve to page/region/chunk; same-name people remain ambiguous; retrieval cannot leak an unauthorized document; graph writes require approval.
- **Benefit hypothesis / next evidence:** less repetitive attachment work while retaining individual evidence decisions. Test a fictional passenger list naming an unrelated person alongside a family group.
- **Handoff:** Product reconciles with DOCUMENT_RAG_PLAN; AI engineer defines citation/link contracts; Release reviews deletion/export integrity.

## Reusable evidence template

```text
Evidence ID / product / user job:
Source title / publisher / canonical URL:
Retrieved date / published or updated date / recheck reason:
Evidence class: documented | directly observed | user-reported | inferred | unverified
Access / plan / region / version / device:
Supported finding (brief original summary):
Workflow: entry → action → decision → recovery → outcome
Actual usage evidence and method, or unknown:
Contradictions / gaps / successor source:
Fictional observation artifact, if any:
```

## Reusable candidate template

```text
Candidate ID / status / source IDs:
User / job / current gap / existing requirement links:
Recommendation: build | adapt | defer | reject (reason):
Proposed behavior / non-goals / acceptance cases:
Existing UI home / affected DESIGN_EVALS tasks:
Dependencies / data, provenance, access and portability effects:
AI necessity / deterministic alternative / model-agnostic evals:
Benefit hypothesis / risks / next validation:
Product decision / Design disposition / owner / date:
Adopted PRD section and implementation issue, if accepted:
```

## Initial research-quality review

CR-01/02/03/04: PASS for documentation traceability, evidence labels, known availability context and explicit absence of usage claims. CR-05/06/08: candidate-level requirements supplied; Product/Design decisions remain open. CR-07: PASS for this limited public-document lookup; no crawl/account/member data. CR-09: Geni's older conflict guidance explicitly marked for recheck. CR-10: PASS; active scope has not been changed by these proposals.

Direct desktop/mobile competitor tasks, participant interviews, actual adoption evidence, full competitive coverage, permitted crawl configuration and automated research-check execution: **NOT RUN**. These protocols are not yet executable gates.
