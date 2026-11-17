# Journey PRD intake — review and release evidence

Reviewed 17 November 2026 by Agent 04, Release/Maintainability. **Disposition: ready for documentation publication; not an application release.**

## Candidate and scope

Base and previous known-good source: [`059ace4deec849efb31b0805743fae9aa235b5e2`](https://github.com/benschreiberca/family-history-tree-app/commit/059ace4deec849efb31b0805743fae9aa235b5e2). The candidate is an isolated copy of that source plus the documentation changes listed below. The resulting commit ID belongs to the coordinator's publication record; this pre-publication report cannot contain its own future commit hash.

The user requested that the researched family-history journeys be added to the PRD using the project roles. PRD v0.4 adopts seven complete journeys and CR-001–CR-006 as planned requirements, with evidence, acceptance criteria, dependencies, recovery and phased delivery. All 19 prior acceptance IDs are retained within 31 unique requirement rows. G01–G30 preserve the audited coverage and evidence limits. MaxDiff has an authored instrument but no responses or measured ranking.

Changed canonical files: [PRD](../PRD.md), [product charter](../PRODUCT_CHARTER.md), [feature inventory](../FEATURE_INVENTORY.md), [competitive register](../COMPETITIVE_RESEARCH.md), [dated Geni audit](../research/2026-11-16-geni-audit.md), and this report. Packaging refreshes the generated PRD, charter and inventory copies under `dist/docs`; other required mirrors remain identical. Runtime application code, fixtures, schemas, design rules, dependencies and tests are unchanged from the base. No family-data migration or Geni operation occurs in this change.

Destination is the existing source repository and its source package. The coordinator owns publication. **No hosted-site deployment, audience change, invitation or message is part of this release.**

## Role review evidence

| Role | Actual review and disposition |
|---|---|
| Agent 01 — Product/scope | Authored PRD v0.4; adopted all six research candidates; retained seven journeys plus cross-journey recovery; preserved prior IDs, current gaps and later/out-of-scope dispositions. Final isolated PRD frozen and CLEAR for documentation. |
| Agent 02 — Design steward | Reviewed contextual interaction homes, action hierarchy, interruption/recovery and accessible review requirements. Final text CLEAR; no rendered UI or device acceptance was claimed. |
| Agent 03 — AI/development | Reviewed shared identity/claim/provenance dependencies, typed relationships, uncertain dates, transactions, source boundaries and implementation-status language. Final text CLEAR for documentation; no new runtime functionality qualified. |
| Agent 04 — Release/maintainability | Reviewed cross-document mappings, phase alignment, retained IDs, evidence/status honesty, local links and artifact hygiene; ran the gates below on the isolated candidate. |
| Agent 05 — Competitive Research | Consolidated the existing read-only audit into sanitized G01–G30 evidence and CR-001–CR-006 adoption mapping. No new competitor session or empirical preference study was conducted. |

The source-research and role findings are planning evidence. New acceptance criteria are specifications, **not tests passed**. Existing implemented/partial/planned statuses remain separate in the inventory. Research questions are consistently P2; P4/Later denotes optional conveniences. No unresolved role disagreement remains for this documentation scope.

## Verification

Environment: Darwin 27.2.0 arm64; Node v26.8.2; npm 11.19.1; Python 3.9.6. Source gates ran 2026-11-17 at approximately 23:00:57 UTC against the isolated candidate. Evidence is the command output from this review and the summaries below.

| Gate | Result | Evidence and limits |
|---|---|---|
| `npm test` | PASS | Exit 0; 40 tests, 40 passed, 0 failed/skipped. Existing deterministic fictional fixtures and mocked contracts cover graph/layout, kinship, navigation, review validation, provider boundaries, profile projections and design checks. No live model, microphone or user study. |
| `npm run check:design` | PASS | Exit 0; `design-source-contract` v1.0.0, no failures. Checks governed actions/surfaces, selected markup invariants, token/component source rules and required contract files. It does not certify visual taste, browser task success, full legacy CSS migration or accessibility conformance. |
| Documentation structure and traceability | PASS | 31 unique requirement definitions; all 19 baseline IDs retained; JY-01–JY-07 complete; G01–G30 each present in evidence register. Six CR mappings reviewed against PRD. Local Markdown links and code-fence balance checked; final report link verified after creation. |
| `python3 scripts/package-source.py` | PASS | Exit 0; 77 source files plus the generated manifest. Canonical/generated documents synchronized; allowlisted path/type and known-credential-pattern checks passed. Final report changes were repackaged before handoff. |
| `npm run check:package` | PASS | Exit 0; 77 files verified against their hashes and current source; required document/design-contract mirrors match. The final archive checksum is recorded in the coordinator handoff. |
| Browser/mobile, UX-01–UX-12 and UI-01–UI-10 | NOT RUN | This candidate changes documentation only. No changed runtime surface or new rendered acceptance claim. Earlier reports remain historical evidence for their own revisions. |
| New journey implementation acceptance | NOT RUN | Import, durable drafts, full restore, shared claims, typed relationships, original-document ingestion, research lifecycle and private collaboration remain unimplemented or partial as documented. |
| Real voice, live AI/provider quality, physical device, security and participant MaxDiff | NOT RUN | Not needed to validate this documentation edit; no qualification is inferred from source tests or role opinions. |
| Deployment verification | NOT RUN | No site deployment is included. The coordinator records the eventual source commit separately. |

## Artifact integrity and limits

The source archive is `dist/family-history-tree-app-source.zip`. Its embedded `SOURCE_MANIFEST.json` records every included source path, byte count and SHA-256. Inventory: 28 canonical documentation files, 29 `dist` source/mirror files, seven tests, three scripts, one schema, one design contract, one workflow and seven root files; 77 source files total. The final archive checksum is emitted by packaging and returned to the coordinator outside this packaged report to avoid a self-referential checksum. The immutable published commit and its archive checksum identify the final artifact together.

The package checks cover allowlisted UTF-8 source types/roots, path traversal, symlinks, temporary/runtime/private path patterns, known credential patterns, per-file hashes, source equality and required generated-copy equality. Manual review of the changed documents found no private Geni person names/IDs, record values, messages, screenshots, recordings or family exports. Person routes are placeholders; sources are brief original summaries. Public documentation describes product workflows, not a copied member dataset.

Known-pattern scans are not proof that arbitrary personal information or unknown secrets are absent. Runtime fixtures and source assets are unchanged. No test harness, browser capture or temporary log is added under package roots. Software source export is distinct from a user's future family-vault backup.

## Recovery and follow-up

Rollback is a later documentation revert of the published intake commit, followed by `python3 scripts/package-source.py` and `npm run check:package` to restore canonical/generated consistency. Preserve unrelated later changes; do not reset the branch to the baseline blindly. This candidate changes no stored family data, schema or deployed site, so no data migration or site rollback is required.

Product owns implementation sequencing and later empirical priority validation. Design and Engineering own future task/device and contract fixtures for each implemented journey; Release requires fresh evidence on those future revisions. Planned production privacy, archive restore and collaboration claims remain gated by their dedicated contracts.
