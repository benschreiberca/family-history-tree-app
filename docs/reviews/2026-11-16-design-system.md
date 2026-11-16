# Design-system change review

2026-11-16 · Prototype disposition: ready for private prototype publication with the limits below. This is an internal implementation review, not user acceptance or production certification.

## Candidate identity and scope

Sites source baseline: `ec4ec5719a498a7c123e6090d0b7f25ddbcce63f`. Reviewed candidate: the working-tree changes for the four-role team, governed control surfaces, design checks and packaging. Component file hashes below bind the browser-checked UI to this report. The release commit and deployment identity are recorded by the publication result; this report does not invent them.

No family data/schema migration, new AI provider call, automatic public-record collector, desktop vault or agent daemon is part of this change.

## Findings and dispositions

| Review | Finding | Disposition |
|---|---|---|
| Product | Historical appended requirements contradicted current interaction direction | PRD and UX priorities consolidated; charter defines priority and non-goals |
| Design | Persistent zoom/chat/search/recovery islands competed with the tree; chart cards were too loud | Utilities grouped under More; quiet visible chart choices; one contextual recovery; stateful memory actions |
| AI engineering | More AI launchers would expand complexity before voice/identity trust is reliable | Opportunity map prioritizes voice resilience and corrected identities; proposed features require provenance, explicit approval and model-independent evals |
| Release | Recursive packaging could include temporary/private files; stale reports could imply current qualification | Path/type/known-secret checks, source manifest/hashes, generated-copy validation and CI added |
| Browser regression | Legacy `display:grid!important` squeezed chart choices to a 38px strip | Removed the override priority, restored the intended full chooser, added a rendered clipping check and rechecked click/keyboard selection |

## Evidence

| Check | Result | Scope |
|---|---|---|
| Functional and mutation tests | PASS: 40 tests | Existing deterministic/mock contracts plus five design-check mutation cases |
| Source design check | PASS | Registered surfaces/actions, variants, IDs, scoped tokens/literals, known redundant controls and initial voice states |
| Desktop browser, 1280 × 900 | PASS for affected tasks | Default hierarchy; visible chart strip; pan/zoom Fit view; scoped Hourglass → Whole family; keyboard movement/activation |
| Narrow browser, 390 × 844 | PASS for affected tasks | Default hierarchy; chart choice reachability; More utilities and target geometry; memory idle; recovery |
| Rendered contract audit | PASS: no failures in reviewed states | Default and memory idle after the CSS repair; checks visible registered controls and actual target dimensions. Graph-node hit targets are separate |
| Fictional sample walkthrough | PASS for sampled controls | Sample is accessed through Options, visibly fictional and unsavable; no live model/audio qualification |
| Real microphone / long narrative / live provider | NOT RUN | No transcription, extraction quality, latency or cost claim |
| Physical touch / screen reader / full contrast / larger text matrix | NOT RUN | Responsive iframes are not physical-device or full accessibility evidence |
| Dense family graph readability/performance | NOT RUN | Fitted narrow overview still needs semantic-zoom and dense-fixture work |
| Remote CI execution / required branch checks | NOT ASSESSED in this report | Workflow source provided; installed workflow is not branch-protection enforcement |

The temporary browser harness is removed before packaging. Browser data used fictional fixtures; no keys, private family records or audio are evidence artifacts. Packaging commands and final integrity output are rerun after the report is finalized.

## Internal visual anchors

| Anchor | Judgment | Basis / remaining work |
|---|---|---|
| UI-01 first read, UI-02 restraint, UI-03 coherence | ACCEPT for the changed control layer | Single promoted creation action; quiet chart strip; utilities disclosed; shared semantic tokens |
| UI-04 readable people | REVISE follow-up | Dense fitted overview remains small on narrow screens; this change does not claim graph readability solved |
| UI-05 continuity, UI-06 touch | PARTIAL / UNASSESSED beyond checked routes | Recovery and keyboard routes checked; physical touch and dense wrong-person activation need dedicated evidence |
| UI-07 biography | UNASSESSED this change | Existing side panel retained; no broad profile quality approval implied |
| UI-08 voice, UI-09 truthful states | ACCEPT for idle/sample control hierarchy only | Future actions hidden until meaningful; sample clearable and unsavable. Real recording/retry states unqualified this turn |
| UI-10 responsive intent | ACCEPT for sampled affected states | Chooser repaired at both sizes; narrow dock and More reviewed. Short screens/larger text remain unassessed |

These are internal judgments with bounded scope. User acceptance remains open. No visual average can offset a broken exit, hidden uncertainty or unintended canonical write.

## Release and recovery

Audience stays owner-private. Prior deployed version: `appgprj_6af0d39015c0819195c95f59eb3d8d19~appgver_665a574e627081918ab60cc08073fdc3`. Rollback uses the platform's saved-version deployment operation for that version. No storage format change is intended; code rollback is not a browser-data restore.

Follow-up owners: Design—dense readability, complete responsive/input matrix; AI—real voice recovery and identity library; Product—user task trials and priority; Release—remote CI evidence, future branch protection and broader artifact hardening.

## Browser-checked component hashes

- `dist/index.html`: `6e6080f560fadb43d9718a0e3a1fc9120f0ad947bcff0b32e1ce495dcfc0f565`
- `dist/styles.css`: `e53e88f22e00eefc681efac08690f7e34cc018dd26bf7d7ec95f67170c648e03`
- `dist/design-system.css`: `5f2c8e16dd311e9ea5961e0282d9a842dc60a9db9c4cb475b7f6db4d572a31a3`
- `dist/app.js`: `68ae8a0ea39fcdf7702289fcae82fd499d7ec80ab3666777c14173077ce709ef`
- `dist/charts.js`: `53bf610cdab1d32db692190549d8db20904a6de5c78cd1b1c4f7499e022382fb`
- `dist/navigation.js`: `1ddd8c5fa2171ee213382f5ab621e78082aa7427e66f7a1075133964f2b7eb25`
- `dist/style-picker.js`: `e5dd9a1d9847b4252d053f681f77b5d9e9a35d5ed86baf0ee9d6a5210163ef43`
- `dist/voice.js`: `d7a4e73bf165b8916045664905cdbcc682454ce18098692813d473dd0ce15920`
- `dist/design-audit.js`: `bb77185e4d9335b13ef9ce8f0e5af32965382039a428fb1480bbd182f6026917`
- `design/contract.json`: `3e72f53a72dec1dd9e68c973f8cd379ef39bac028734c2efd0dbb71beacb75c4`
