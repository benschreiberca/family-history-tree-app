# Competitive research and candidate PRD backlog

Owner: [Competitive research agent](agents/05-competitive-researcher.md). Product decisions: [Product lead](agents/01-product-scope.md).

This register connects external evidence to requirements and retains their decision history. It is not a feature-parity roadmap. Keep the tree-first core loop and existing priorities; candidates require Product disposition before entering adopted scope.

## Current disposition — 2026-11-17 journey PRD intake

The user explicitly requested adding the researched journey features to the PRD using the project roles. Product has adopted **CR-001 through CR-006 as planned requirements**, with the mapping below. This is requirement adoption, **not implementation**, a deployment, evidence of user preference, or authorization to change Geni data. Existing implemented/partial/planned statuses remain separate in the feature inventory. The seven journey requirements are in [PRD.md](PRD.md); all thirty Geni evidence groups and complete inspected feature coverage are preserved in the [dated audit](research/2026-11-16-geni-audit.md).

| Research requirement | Current decision / Product mapping | Journey / delivery dependency |
|---|---|---|
| CR-001 — evidence comparison and what changes | Adopted planned → VO-02, ED-01 | JY-02 voice and JY-03 correction; basic exact-reviewed-diff integrity is P0 |
| CR-002 — recoverable profile/narrative history | Adopted planned → ED-02, BI-02, OW-01 | JY-03 correction and JY-07 life story; P1 history after revision/persistence contract |
| CR-003 — reusable source with independent citations | Adopted planned → AR-01, AR-02 | JY-04 media/evidence; P2 document citations after durable originals and stable facts |
| CR-004 — explained consistency review | Adopted planned → ED-03 | JY-03 correction; P1 basic checks, P2 advanced curator workflow |
| CR-005 — accepted facts agree across views | Adopted planned → BI-03 | JY-01 import and JY-07 exploration/life story; P1 shared facts, foundational to other inputs |
| CR-006 — private research questions/next actions | Adopted planned → SR-02 | JY-05 research; P2 research workflow, later integrations reuse it |

Product owns these dispositions and phased priorities; Design owns placement and interaction acceptance. This register records the evidence/contract handoff and does not claim rendered Design validation. JY-01 existing-tree onboarding, JY-02 voice, JY-03 correction, JY-04 media, JY-05 research, JY-06 contribution and JY-07 life stories together cover the adopted journey scope. Supporting and later competitor capabilities have explicit PRD disposition rather than becoming unqualified first-release promises.

### Current evidence and requirement extensions

- **CR-001 / sources:** add G05, G09 and G10 to E-GENI-001/E-ANC-001. In existing Review/Sources, summarize new people, links, facts, conflicts and unchanged information; show current/proposed values and original evidence. Compute the summary deterministically from the actual diff. Accept, keep alternate, defer or reject separately. Summary and commit must agree exactly; unchecked links never commit; cancellation produces no canonical change; stale review cannot save; deferred context survives restart. Proposal, awaiting approval and accepted states remain distinct when collaborative permissions exist. No automated merge, separate Match Center dashboard or unnecessary single-user approval layer. Stable claims, source/person IDs, revisions and durable drafts are dependencies. Validate conflicting birth dates and same-name identities under UX-09/10 and UI-09.
- **CR-002 / sources:** add G07. Contextual history includes actor, timestamp, affected field, source, reason and previous revision. Restore appends a revision and shows downstream effects; it does not erase earlier history or original recollections. A name/date correction can be reversed without losing citations; restoring prose invents no facts; history and source IDs survive full backup/restore. Transactional storage and accepted claims precede generated narrative. No social feed or silent rewrite. Validate a multi-step correction/restore task in the person panel and narrow/desktop history states.
- **CR-003 / sources:** add G05/G11. Preserve one original with independently reviewed person/event citations and page/region locators. Rejecting one link preserves the others; opening a fact reveals its relevant evidence; originals and links/locators survive restore. Co-occurrence never creates a family relationship automatically. Document durability, access/deletion semantics and extraction provenance precede richer retrieval. Use existing Sources/document flow, not a new explorer control. Validate a passenger list with a family group and an unrelated person sharing a surname.

### CR-004 — Explained consistency review

- **Status / decision:** adopted planned; ED-03. **Recommendation:** adapt into existing person/review context, consolidated access under More only where needed.
- **Sources / user:** G08/G10; a curator finding damaging inconsistencies without opening every profile. Existing EVALS specifies checks; runtime shape/cycle validation is not a complete persistent curator workflow.
- **Behavior:** show impossible chronology, duplicate candidates and missing essential context with the affected facts, a reason, rule/version and explicit review state. Re-evaluate when underlying facts change.
- **Acceptance:** unknown dates are not errors; approximate dates retain ranges; an issue exposes supporting facts; no autofix without a reviewed diff; dismissal records rationale/version; changed evidence invalidates stale decisions. Same first names or different surnames are possible patterns, not proof of an error.
- **Non-goals / UI:** no fake confidence, universal tree-completeness percentage or automatic truth selection. Keep issues in Review/person context; UI-09 and UX-09/10 govern truthful decisions and recovery.
- **Dependencies / data:** unified accepted claims, date precision, typed relationships, stable issue/fact IDs, revisions and deterministic hard-rule checks. Duplicate matching can abstain.
- **AI / evals:** AI is unnecessary for hard chronology rules; suggestions remain candidates. Test explicit false positives and true positives, uncertain dates, changed evidence, stale review and absence of unapproved writes.
- **Benefit hypothesis / next validation:** more real mistakes found with fewer misleading alarms. Observe a curator resolve the fictional issue set and preserve an intentional unusual family pattern. Product/Design review does not substitute for that task test.

### CR-005 — Accepted facts agree across views

- **Status / decision:** adopted planned; BI-03, connected to BI-01/ED-01. **Recommendation:** build the shared claim/event contract before further projections.
- **Sources / user:** app `dist/profile-core.js` at audit baseline; G04/G06/G14 illustrate visible projections, not Geni's database. A family explorer must not see different accepted birth information in Timeline and the tree.
- **Current gap:** accepted documentary events are appended by `profileExport()` while base person/chart/map fields remain separate. The app already has Timeline and Sources; this is a consistency gap, not their absence.
- **Behavior / UI:** profile, timeline, lifespans, map and export consume the same accepted event/claim IDs. Review chooses accepted values while retaining conflicting alternatives and original evidence. No new top-level control or competing event store.
- **Acceptance:** a reviewed correction updates every relevant projection; unresolved contradictions stay alternate; unknown precision stays unknown; undo restores all projections; unrelated records do not change. Exact/before/after/between/circa dates retain meaning and source wording; no invented midpoint or falsely exact age.
- **Dependencies / data:** shared schema, stable IDs, source/citation links, precision semantics, migrations and revision transactions. Export/restore must preserve those semantics.
- **AI / evals:** no model required for projections or commit. Test a corrected birth date, approximate migration and unresolved competing claims across all consumers; UX-02/06 and UI-07/09 apply to displayed history.
- **Benefit hypothesis / next validation:** consistent interpretation of family knowledge. Execute one correction, undo and clean-instance restore and compare every projection to the accepted claim set.

### CR-006 — Private research questions and next actions

- **Status / decision:** adopted planned; SR-02. **Recommendation:** adapt a small Research notes area inside Sources.
- **Sources / user:** G17 documentation and current `dist/profile.js`; a researcher resuming an unresolved question without promoting a theory to fact. Current Sources stores searches/findings but no question/hypothesis/next-action lifecycle.
- **Behavior:** link a question to people, private hypotheses, search attempts, evidence and a next action. Support unresolved/resolved status, resume context, reopening and recoverable deletion; resolved answers link to their reviewed evidence. One search can inform several questions.
- **Acceptance:** a hypothesis never enters accepted biography/tree facts without explicit review; unsuccessful searches remain useful evidence of attempts; closure records rationale and evidence; reopening preserves history; restored notes preserve person/source links and status. Deleting a question does not silently delete shared sources. A candidate citation alone does not prove identity.
- **Non-goals / UI:** no general task dashboard, public project/forum system, automatic outreach or automated acceptance. Existing Sources/person flow hosts research context; apply UX-06 and UI-07/09.
- **Dependencies / data:** stable question/person/source IDs, durable storage, revisions and restore. Later collaboration keeps note audience separate from profile permissions and respects source access.
- **AI / evals:** optional next-question/query suggestions grounded in missing/conflicting evidence and labelled as suggestions. Deterministic storage is sufficient. Test that hypothetical wording cannot enter accepted facts or leak across note audiences.
- **Benefit hypothesis / next validation:** fewer repeated searches and lost leads. Pause an ambiguous immigration question, restore elsewhere and resume with its failed search, competing theory and next action intact.

### Intake quality and unresolved evidence

G01–G30 retain observed/documented/partial/entry-point labels, original retrieval date and Basic/desktop context. G07 directly refreshes revision-log presence, but does not prove restoration. G10 refreshes visible field-conflict comparison and one approval explanation, but does not prove a successful correction or universal permission rule. G17 remains Pro documentation only. Earlier sources below remain historical evidence rather than being overwritten by these observations.

CR-01–05/07/09/10: PASS for source traceability, evidence/context/usage honesty, deduplication, artifact hygiene, fixed freshness boundary and explicit planned adoption. CR-06/08: requirement-level homes, acceptance/dependencies/non-goals and Product handoff supplied; Design and implementation verification remain distinct. End-to-end Geni mutations, mobile/paid-plan tests, participant research and empirical MaxDiff: **NOT RUN**. No additional Geni access or new research was performed for this PRD intake.

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

## Historical candidate PRD snapshots — initial 2026-11-16 pass

The following initial status statements preserve the pre-adoption record. The current 2026-11-17 disposition and extensions above supersede them; their evidence, acceptance cases and non-goals remain relevant.

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
