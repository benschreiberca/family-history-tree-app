# Release and maintainability contract

Reviewed 2026-11-16. This contract applies to the current buildless static prototype and defines additional gates for future local-first releases. A contract is not evidence that its gates have been implemented or passed.

## Baseline audit (before this change)

Source inspection found:

- `package.json` initially exposes only `npm test`; the existing suite covers graph/model, navigation, profile and AI adapter contracts. It does not establish visual quality, real speech reliability or model accuracy.
- `scripts/package-source.py` copies selected documents to `dist/docs` and recursively includes non-ZIP files from selected directories in the source ZIP. Its “public-safe” description is an intention, not a secret scan or archive-content guarantee. Temporary HTML harnesses or personal files in those directories could be packaged.
- `.gitignore` excludes common private artifacts, but Python packaging does not consult it. A real document, credential or fixture placed under an included directory can still leak.
- `docs/VALIDATION.md` contains older test counts and interaction descriptions. Historical evidence needs a date and revision; it must not serve as the current release report.
- No dependency or build framework is needed for the present static code. More infrastructure would not solve the immediate UX problem.
- The hosted Sites source history and public GitHub history are distinct delivery records. A release must identify both or document why only one was updated; equal branch names do not prove equal content.

## Required candidate gates

| Gate | Evidence | Blocks release when |
|---|---|---|
| Scope and status | Current charter/PRD acceptance cases, changed-path summary, Agent 01 disposition | The change contradicts the agreed user job, silently widens scope or mislabels planned behavior as implemented |
| Functional contracts | `npm test` result on exact candidate; directly relevant regression cases | Required graph, review, storage, privacy or gesture cases fail |
| Design rules | `npm run check:design` output and rule version | An implemented hard design rule fails without a documented, bounded exception |
| Browser behavior | Changed-state walkthrough with viewport/runtime, expected behavior and evidence | A primary task is broken, a user gets trapped, controls obscure the graph, or a changed state is asserted without being checked |
| Taste and hierarchy | Agent 02's anchored review against `DESIGN_EVALS.md`, including rejected/removed alternatives | The interface competes with the tree, adds duplicate action surfaces, or fails the qualitative criteria; automated scores cannot overrule this |
| Data/AI boundaries | Fixture/live distinction, source traceability, provider payload and mutation checks when affected | Unsupported information is presented as fact, unrelated content is sent, writes bypass review or evidence is fabricated |
| Public artifact hygiene | File inventory, denied-pattern/secret scan and manual inspection of changed fixtures | Secrets, actual family content, temporary test harnesses or private runtime state appear in publishable output |
| Packaging provenance | Exact source revision, archive inventory and SHA-256; docs/schema synchronization result | Build output does not correspond to the reviewed source or the artifact changed after verification |
| Deployment and recovery | Exact destination/audience, terminal status, prior known-good version and rollback route | Audience is wrong, deployment failed/uncertain or a material data migration lacks a recovery path |

A design-rule script checks only rules it implements. A green result must list its coverage; it must not imply complete accessibility, visual, security or usability certification. An exception records rule ID, exact scope, reason, approving decision, owner and review condition. It cannot erase an unauthorized write or data disclosure.

## Evidence classes

Use explicit labels on every claim:

- **Source reviewed:** behavior inferred from implementation, without runtime confirmation.
- **Deterministic fixture:** a known graph/text/document with asserted expected output.
- **Mocked integration:** simulated browser speech/provider/storage response exercising the pipeline.
- **Browser checked:** real UI interaction in a named browser/viewport, with fixture/mocked data disclosed.
- **Live provider:** actual model/API response with model/provider/prompt versions, policy configuration, cost/latency and the permitted data used.
- **Physical device:** named device/OS/browser, actual input method and observed result.
- **Not assessed:** no evidence yet.

Do not promote an iframe layout check to an iPhone touch test, a simulated speech event to transcription accuracy, or a model contract test to a model-quality qualification. A deployment success verifies publication; it does not verify every flow.

## Minimal CI and packaging

The default branch should have a pull-request workflow that runs `npm test`, `npm run check:design`, syntax/import checks, packaging validation and generated-copy drift checks using fictional content. Pin action versions and the chosen Node/Python environment. Do not provide production credentials to untrusted pull-request code. If dependencies are later introduced, commit their lockfile and use the corresponding immutable install command.

Recommended repository artifacts:

- `AGENTS.md` and `docs/agents/*`: role routing and handoff contracts.
- `docs/DESIGN_SYSTEM.md`, `docs/DESIGN_EVALS.md` and a versioned machine-readable design policy.
- `scripts/check-design.*`: implemented static rules with coverage and actionable failures.
- `.github/workflows/quality.yml`: required deterministic gates, with no production secrets needed.
- `scripts/check-package.*` or equivalent packaging validation: allowlisted roots, private/temporary path rejection, fixture provenance and secret-pattern findings.
- Per-release report/manifest: candidate revision, check results, asset/archive hashes, source/destination provenance and limitations. Keep generated reports free of keys, private prompts and family data.

Avoid publishing a repository-specific output ZIP with private documents. Exporting a user's family vault is a separate application operation, with explicit user selection and its own encryption/privacy policy. Software source bundles contain fictional demonstration assets only.

Keep documentation's canonical copy under `docs/`; generated `dist/docs` copies must match. Package only after current docs, tests and rule files are finalized. Inspect archive entries, reject path traversal/symlink surprises, and prevent `_qa.html`, `_mobile.html`, recordings, raw documents, data dumps and credential files from entering source or deployment archives. Secret-pattern scanning can miss unknown secrets; retain human review and fictional-only fixtures as separate controls.

## Performance and code health as features grow

Measure before setting budgets. Keep a versioned fixture corpus representing ordinary and dense family graphs, long names, repeated ancestry, unknown dates, disconnected branches, document pages and long narratives. Record render/pan/zoom latency, memory, transferred asset size, extraction queue lag and actual model cost on declared environments.

A proposed target must cite a baseline, user impact and supported device context. Compare like with like. A change that substantially worsens a primary interaction must be explained and mitigated before release; do not average it away with unrelated improvements. Avoid claiming a supported tree size until the corresponding fixture and device results exist.

Maintainability review looks for duplicated state owners, CSS override chains, hidden side effects, stale contracts, missing schema migrations and unnecessary dependencies. File bounded cleanup work with a measurable purpose. Use behavior-preserving refactors and regression checks; do not rewrite the architecture solely because features were added.

## Deployment, rollback and compatibility

The release coordinator packages/pushes the exact reviewed candidate and preserves the current site audience. It waits for a terminal deployment result and checks the highest-risk changed user flow where access allows. Retain the previous deployed version ID/source revision and the platform's supported rollback operation. If a publication result is uncertain, reconcile it before starting another deployment.

Current browser storage is local to a browser and is not a server backup. A code rollback does not necessarily revert local data. Future storage changes need versioned migrations, pre-migration export/snapshot, interrupted-migration tests and an explicit compatibility policy. Do not ship a destructive or unreadable migration under a “UI-only” label.

Future desktop installers, encrypted vaults and sync require extra gates: signed build provenance, dependency/license review, clean-device install and restore, corruption/recovery tests, network-egress checks, key handling and independent security review proportionate to the claim. They remain planned until implemented and verified.

## Release report template

```text
Candidate / revision:
Source repository and deployed revision mapping:
User problem / accepted scope:
Changed states and surfaces:
Deterministic gates (command, version, result):
Design/browser review (viewport, input, evidence):
AI evidence class and model/prompt versions, if applicable:
Artifact inventory / SHA-256 / hygiene findings:
Destination / audience / deployment result:
Previous known-good version and rollback steps:
Data/schema compatibility and recovery:
Unverified behavior / accepted exceptions / follow-up owner:
Disposition: ready | blocked | not assessed
```

Store truthful reports alongside the release or change. These instructions do not create a recurring job or autonomous publication service. “Self-improving” means detect regressions, propose bounded changes, validate them and retain rollback—not silently rewrite and deploy production.
