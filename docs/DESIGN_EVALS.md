# UX/UI evaluations — Family History Tree App

Version 1 · 2026-11-16. These evals complement graph/model correctness tests. They are model-agnostic: deterministic checks do not use an LLM; browser tasks evaluate the product; expert or human review assesses hierarchy and taste using observable anchors. An LLM can flag candidates, but cannot certify accessibility, aesthetics, real-device gestures or task success by itself.

## Result contract and release gates

Every result is `PASS`, `FAIL`, `NOT RUN` or `BLOCKED`. Record commit/build, rule version, surface/state, viewport/device, input mode, actual fixture and artifact references. State explicitly whether evidence is source-only, simulated speech/provider, responsive viewport or physical device.

- **Source gate:** the design-system/action-registry check and existing functional suite pass. A static pass verifies only the rules it implements.
- **Task gate:** affected critical journeys complete with correct outcomes and reachable recovery. Unexpected writes, lost work, wrong-person activation, inaccessible exit or misleading recording/privacy state block release.
- **Visual gate:** the Design Steward reviews changed responsive states against the anchors below. Cosmetic findings are not offset by a numerical average; disposition each finding.
- **Evidence gate:** reports reference the actual reviewed revision. A prior screenshot or green test count does not validate a later change. Missing required evidence is NOT RUN or BLOCKED, never PASS.

Do not make a fictional model/voice fixture or source-only review sound like a live production qualification. Prototype publication can carry documented unverified behavior; production claims require the corresponding evidence.

## Deterministic / source checks

| ID | Invariant | Verification and pass evidence | Limits |
|---|---|---|---|
| DS-01 | Every promoted control belongs to a registered surface/state and declared user job | Check active HTML/generated controls against the registry; reject unknown registrations without design rationale | Source checks cannot determine true rendered visibility alone |
| DS-02 | Default explorer does not accumulate secondary-tool launchers | Default registry contains the primary creation action, More, chart navigation, selected-person disclosure and conditional recovery; search/chat/zoom tools are secondary | This is a purpose/state contract, not a global numeric button cap |
| DS-03 | New design-system CSS uses semantic tokens and approved component variants | Token/component source lint plus explicit exception records; no unregistered raw colour/spacing variants in the scoped layer | Legacy stylesheet debt remains separately reported |
| DS-04 | Interactive controls have semantic names, states and intentional disabled behavior | Verify buttons/types, icon-only accessible labels, pressed/expanded state and expected state bindings | Computed names/focus need browser verification |
| DS-05 | Critical graph interactions remain deterministic and reversible | Run pan/pinch/cancel/tap tests; fit/scoped escape state tests; canonical writes require review revision and explicit commit | Mock pointer tests do not establish iPhone behavior |
| DS-06 | Demo and draft states cannot silently become known facts | Validate sample cannot save, draft styles have text meaning, partial failures preserve retry information | Requires browser/task coverage for actual state presentation |

The primary agent owns the executable check implementation. Do not claim a rule is automated merely because it appears in this table. Record which rule IDs each script actually covers.

## Browser task protocols

Use fictional fixtures with known names, parent/partner links, an isolated person, unknown dates, conflicting records and long names. Include a denser tree when testing target ambiguity. Start from a clean, documented state; retain no secret keys in evidence.

| ID | Task / setup | Pass condition | Required evidence |
|---|---|---|---|
| UX-01 | Open the default explorer on phone-width and desktop viewports | Tree is the foreground; no biography/search/chat/config panel opens unsolicited; chart choices remain apparent | Screenshots plus visible-control inventory and usable canvas bounds |
| UX-02 | Tap a person, then open and close Life & sources | Correct identity and facts; selection alone does not open panel; close/Escape restores focus and does not change selected person | Before/after selected ID, panel state, focused element |
| UX-03 | Enter a scoped branch, zoom/pan, then recover | One contextual escape uses Whole family for scope; it restores the complete graph and fitted camera. Full-graph camera changes offer Fit view without changing family data | Visible label, graph IDs/count, viewBox before/after, no write |
| UX-04 | Drag over a person; pinch; release one finger and continue panning | No camera freeze/jump; no unwanted node movement or selection; pointer cancellation leaves a usable canvas | Mock regression results and physical touch recording for physical-touch claim |
| UX-05 | Try charts without a search or menu | Styles are visible/reachable; selected style is clear; keyboard users reach offscreen choices and activate explicitly; selected person remains stable | DOM/tab-order trace and screenshots on both sizes |
| UX-06 | Explore related people from an open biography | Correct related identity becomes selected; local navigation and scroll remain usable; long story/source content can be read without moving the tree | Panel state, selected ID and focus/scroll trace |
| UX-07 | Start memory input with no model configured | Clear next step to connection or text/sample alternative; no actual microphone activity or provider request is implied before authorization | State/copy and request log without secrets |
| UX-08 | Record while transcript segments are processed | One stateful Speak/Stop action; real words and draft changes visible; queue/failure state truthful; controls do not consume the draft tree | Mock incremental fixture trace; separate real speech run for quality claims |
| UX-09 | Stop, correct ambiguity, review and save | Review appears only when stable; quoted evidence and identities/links visible; no checked uncertain links by default; exactly approved graph diff persists | Expected/actual diff, saved state, review revision; no automatic write |
| UX-10 | Trigger extraction failure or revoke the key | Recording/processing state remains truthful; recoverable text retained; specific retry path; no false complete/saved message | Error fixture, retained transcript, graph/storage diff |
| UX-11 | Open the sample, then clear/close it | Fictional/no-model nature visible; sample is unsavable; transient nodes disappear; real draft is not overwritten | Request count and graph/storage diff, screenshot |
| UX-12 | Keyboard, larger text, reduced motion and a short viewport | Primary actions and exits remain reachable; no focus trap or covered field; the horizontal strip is the intended horizontal scroll region | Device/browser settings, keyboard trace, geometry and screenshots |

Avoid invented completion-rate or time thresholds. Measure task time, mistaken taps, help requests and recovery effort during actual trials; establish baselines and improvement targets with Product. One successful internal walkthrough is evidence of that walkthrough, not proof of usability for everyone.

## Expert visual / interaction review anchors

For each anchor write a short judgment with a specific screenshot/interaction reference. Use **ACCEPT**, **REVISE** or **UNASSESSED**, not a synthetic score.

| ID | Anchor | Accept looks like | Revise looks like |
|---|---|---|---|
| UI-01 | Clear first read | People and connections draw attention before controls; the next action has one promoted treatment | Multiple accent buttons, raised chart cards and floating tool islands compete with the tree |
| UI-02 | Restraint without hiding | Visible chart text tabs stay discoverable; secondary tools are grouped; recovery is obvious when needed | Toolbars grow with each feature, or simplification hides the views and exit the user needs |
| UI-03 | Coherent visual language | Shared type, spacing, radii, borders and emphasis explain purpose | One-off pills, glyphs, shadows and gradients make each feature look unrelated |
| UI-04 | Readable people | Names and selected relatives remain readable at the intended working zoom; density has a clear strategy | The overview becomes a miniature unreadable graph, or enlarged labels obscure other people |
| UI-05 | Calm spatial continuity | Selection, chart changes and new proposals preserve orientation; user manipulation is respected | Camera reframes unexpectedly, pinch fights automatic updates, or a tap feels like entering a trap |
| UI-06 | Meaningful touch | Targets tolerate drift, are distinguishable and do not overlap unrelated actions | Invisible padding selects the wrong person; tiny icons or adjacent controls require precision |
| UI-07 | Useful biography | Identity, narrative, events and sources are readable; relations invite natural exploration | The panel feels like a cramped modal, repeats the same data, or hides content behind nested dialogs |
| UI-08 | Voice as creation | The person's words cause understandable draft changes in the same canvas; setup is contextual | A busy form, fake waveform or wall of disabled buttons replaces the family-building experience |
| UI-09 | Trustworthy states | Draft, accepted, unknown, conflicting and failed are distinguishable by wording/structure as well as colour | Decorative badges imply certainty, cloud privacy or successful persistence without evidence |
| UI-10 | Responsive intent | Mobile composition prioritizes reach and readable content; desktop uses space deliberately | Desktop is merely compressed, menus overlap, or a large empty backdrop disguises a tiny working tree |

A refinement must explain why it improves a user's job. “More modern”, “cleaner” or “beautiful” alone is not a design rationale. Preserve quiet useful information; do not remove uncertainty or source context for visual neatness.

## State matrix

Review affected rows at 390 × 844 and 1440 × 900 CSS pixels. Add 320px/short-height, tablet, large text, browser zoom or OS safe-area cases for observed risks. Physical touch and speech are separate environments, not inferred from responsive dimensions.

| State | Focus of the review |
|---|---|
| Full explorer, fitted | Default action hierarchy, chart discoverability, no redundant recovery |
| Full explorer, panned/zoomed | Fit recovery, readable selected person, gesture continuity |
| Scoped branch / filtered graph | Whole family escape, honest count/scope |
| Selected person / biography open / expanded | Disclosure, close/focus, read/scroll, family link navigation |
| Compare incomplete / complete | Pair selection, plain-English result, no canvas takeover |
| Earth | Clear mode change, recorded-location meaning and route back |
| Memory idle / no key / consent missing | Setup clarity and no false activity |
| Memory listening / queued / failed / stopped | Stateful controls, actual progress, draft visibility and recovery |
| Sample / sample clear | Fictional provenance and no persistence |
| Review / changed revision / save failure | Explicit diff, stale guard, no lost work |
| Menu / options / chat | Secondary tools contained; focus and dismissal work |

## Review report template

```text
Change/build:
Review date and reviewer role:
User job and priority:
Before → after action hierarchy:
Surface/state and viewport/input matrix:
Automated commands, exit codes and covered rule IDs:
Task results: ID / PASS|FAIL|NOT RUN|BLOCKED / actual result / artifact
Visual anchors: ID / ACCEPT|REVISE|UNASSESSED / specific reason / artifact
Truth/privacy/data-loss findings:
Known limits and deliberately deferred checks:
Exceptions: rule / reason / owner / revisit condition
Release recommendation and corrective next step:
```

## Current audit — source review before the dedicated system change

Reviewed 2026-11-16 against the local source that contained the Add a memory dock, persistent ten-view glyph strip and separate recovery/zoom group. **Source evidence only: no screenshots, human trials or physical-device tests were performed by this review.** The primary implementation agent may change these findings before publication; rerun and record the resulting state.

| Finding | Source evidence | Effect / priority |
|---|---|---|
| Competing persistent tool groups | `dist/index.html`: memory+More, chart glyph choices+previous/next+counter, Whole family+Fit+zoom, selected chip and Ask family | High: hierarchy is fragmented and recovery labels compete |
| Busy idle creation dock | `dist/index.html`: Speak, disabled Stop, disabled Review, Options and sample coexist | High: it reads as a workflow form instead of a clear next action |
| Styling accrues by override | `dist/styles.css`: repeated definitions for toolbar, profile, dock, mobile bounds and colours | High: cross-feature changes are hard to reason about; dedicated scoped tokens/components should start a measured migration |
| Tiny auxiliary copy | Current strip and status rules use 8–11px values in multiple places | Medium: inspect rendered legibility; source font size alone cannot establish a browser failure |
| Deprecated hidden controls remain | Hidden `voice-tree` / `voice-fit` scaffolding and CSS-hidden duplicate chart fit action | Medium: remove dead UI/handlers during controlled migration rather than retaining competing component concepts |
| Current reference text is historical and contradictory | Earlier `UX_PRIORITIES.md` sections describe a hidden picker/bottom sheet/separate voice workspace; later sections supersede them | Medium: make a single current contract authoritative and label history clearly |

Recommended first correction: quiet text chart navigation; one conditional recovery control; secondary chat/zoom under More with keyboard/gesture alternatives; stateful memory action and review only when eligible. This is a hierarchy correction, not a license to remove visible chart access or safe explicit review.
