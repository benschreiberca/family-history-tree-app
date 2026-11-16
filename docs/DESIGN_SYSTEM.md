# Family History Tree App — design system

Version 1 · 2026-11-16. **Target contract:** applies to new work and the dedicated design-system layer. It does not claim that the accumulated legacy stylesheet is already fully migrated. Use the current implementation and design review to distinguish conformance from remaining debt.

The experience is a family tree with people and evidence. Its default screen should feel like entering that tree, not operating a dashboard. Taste means coherent hierarchy, restraint, readable relationships and motion that explains change. It is not a synonym for decorative gradients or fewer visible features.

## Action hierarchy

| Level | Job | Treatment |
|---|---|---|
| Primary | Add a memory / continue the active creation step | One promoted action for the active workflow; warm accent and clear verb |
| Direct manipulation | Select a person, follow a link, pan, pinch | Work on the tree itself, with forgiving targets and keyboard equivalents |
| View navigation | Try the ten chart styles | A persistent, low-emphasis text-tab strip; not ten raised cards |
| Contextual | Life & sources; return from a branch or changed camera | Show when it refers to a selection or recoverable state |
| Secondary | Search, compare, geography, AI questions, explicit zoom controls, settings, help | A consistent More/context entry; no new permanent floating island |
| System feedback | Listening, processing, missing evidence, draft/review state | Informative text or unobtrusive status, never a fake control |

“One promoted action” is a hierarchy decision for the active workflow, not a global cap on buttons. Chart tabs are navigation choices. Count and classify controls by purpose and state; do not pass an interface merely because its button count falls under an invented quota.

## Registered surfaces

The checked action registry is the machine-readable inventory. This table is the UX contract; a new registration requires a product rationale and a design review, not merely adding an ID so a checker passes.

| Surface / state | What belongs there | What does not |
|---|---|---|
| Default explorer | Tree, muted chart tabs, Add a memory, More, selected-person Life & sources | Persistent chat launcher, search box, zoom toolbar, project links, biography or legend cards |
| Explorer with scoped or moved camera | Same, plus one contextual escape | Simultaneous Whole family and Fit actions doing overlapping recovery work |
| More | Search, compare, Earth/Family, branch filter, Ask family, accessible zoom in/out, help/project links | A promoted secondary tool competing with the main creation action |
| Person panel | Identity, recorded facts, narrative, Timeline/Sources/Family navigation, export, expand and close | A second global navigation system or irrelevant AI controls |
| Memory idle | Compact dock, one Speak action, close, Options and meaningful guidance | Disabled Stop/Review controls or the sample as a competing primary action |
| Memory recording | One Stop action, live words, actual processing feedback, close behavior that preserves the draft | Simultaneous Speak and Stop; decorative simulated activity |
| Memory processing | Progress/queue state, explicit cancellation if supported, preserved text | Save/Review before the current revision is stable |
| Memory reviewable | Review additions as the next step; Options and close remain secondary | Ambiguous save language or automated approval |
| Memory options | Text alternative, connection/consent, sample, downloads and diagnostic details | Unnecessary fields before a user asks for configuration |
| Review | Identity resolution, source quotes, explicit relationship approval and Save reviewed additions | Prechecked uncertain links, hidden changes or canonical writes before approval |

## Contextual escape contract

The escape is visible whenever recovery is meaningful:

- A filtered/scoped branch offers **Whole family**, even when that branch is already fitted.
- A complete but panned/zoomed graph offers **Fit view**.
- The already fitted complete graph needs no redundant recovery action.
- Whole family clears the scope/filter and fits the complete graph. Fit view preserves the current scope.
- Closing a profile is independent of changing selection or camera. Escape restores focus to its invoking control.

Retain pinch/pan, keyboard navigation and accessible zoom controls in More. Reducing persistent controls must not make a non-gesture route disappear.

## Tokens

The token source in code is authoritative for exact values. The following establish intent and migration mapping; a token change must update both code and the visual evidence.

| Family | Semantic names | Current starting values / use |
|---|---|---|
| Colour | `canvas`, `surface`, `surface-raised`, `text`, `text-muted`, `accent`, `border`, `focus`, `danger`, `draft` | Existing midnight canvas `#0b171e`, ivory `#efe9dd`, muted `#9bafb6`, copper `#d5a17b`, border `#2c4149`; map additional states once, not per feature |
| Type | `font-ui`, `font-story`, `text-body`, `text-label`, `text-meta`, `text-title` | System sans for controls/data; Georgia or existing serif for names/story headings; names are content, not miniature metadata |
| Space | `space-1` through the registered scale | A small shared spacing scale; avoid one-off padding/margins in new components |
| Shape | `radius-control`, `radius-panel`, `radius-chip` | Shared controls, panels and selection affordances; no feature-specific corner language |
| Elevation | `shadow-panel`, `layer-canvas`, `layer-controls`, `layer-panel`, `layer-status` | Elevation indicates containment and temporary focus; do not shadow every clickable item |
| Input | `target-min`, `focus-width`, `focus-offset` | 44 CSS-pixel minimum target box for standalone HTML controls is a **product target**; verify actual computed dimensions and spacing |
| Motion | `duration-fast`, `duration-camera`, `ease-standard` | Short feedback, slower spatial movement, and an immediate reduced-motion path |

SVG person targets use screen-space hit testing because the graph scales. A nominal SVG-unit radius is not a measured CSS-pixel target. Resolve the nearest legitimate person in the tolerance area and test dense cases for wrong-person selection. Do not lay overlapping invisible circles over every person and assume that larger targets are always better.

Use semantic tokens in the new design-system layer. Existing hard-coded values are migration debt, not permission to add new ones. An exception records its component, reason, owner, evidence and removal/review condition. No silent exceptions in comments or checker allowlists.

## Components and interaction

### Canvas and people

The tree receives the visual foreground and continuous spatial area. Never frame the default tree inside a card with additional permanent side cards. Names and relationship geometry must remain legible at the intended zoom. When the whole graph is dense, progressively emphasize relevant relatives and provide a recoverable overview instead of shrinking every name into unreadable decoration.

Selection changes emphasis and the selected-person chip; it does not automatically open the biography. Pan must work when starting over a person. A tap must not become a drag from minor finger drift. Pinching and cancelling must not select someone. A growing draft may frame a newly proposed connection, but must retain a clear overview escape and avoid fighting an active user gesture.

### Chart tabs

Visible, scrollable and quiet. The selected style has one clear selected treatment. Use text labels rather than decorative glyphs and raised thumbnails. Tabs preserve person identity and expose scope differences honestly. The strip can scroll horizontally on narrow screens while the page avoids unintended horizontal overflow. All styles remain reachable by keyboard without adding permanent previous/next arrows or a redundant page counter.

### Action / text action / icon action

Primary action: filled accent, explicit verb, no ornament. Secondary actions share neutral treatment. Tertiary actions use text. Only familiar compact operations such as close may be icon-only, with an accessible name and sufficient target. Do not style every tab, metadata field or link like a primary button.

Show disabled controls only when their pending availability teaches something the user needs. Memory recording uses a stateful primary action: Speak or Stop, never an idle row of disabled workflow steps. Review appears when it can actually run.

### Person panel

One coherent side panel, closed by default. Readable narrative width, clear identity, dated facts and source status. Timeline/Sources/Family are one local navigation group. The panel can expand/resize on desktop; narrow layouts use available width while retaining a clear close route. Scroll content without moving the tree. Nested source details do not open a stack of modal dialogs.

### Memory dock and review

Remain in the family canvas. Latest words and proposed people are the feedback; pulse/waveform animation alone is not processing evidence. Draft appearance uses shape/line treatment and text, not colour alone. Options contain transcript, model setup and the fictional sample. Sample provenance stays visible while it runs and it is never silently saved or mixed into real memory.

Review decisions expose the original words, identity ambiguity and exact links before a canonical change. Failure leaves recoverable text and a specific retry path; do not declare “everything added” after partial extraction.

### Feedback, motion and copy

Use verbs that describe outcomes. Whole family, Fit view and Close mean different things. Avoid implementation language in everyday flows; retain it in model settings and diagnostics where it supports a decision. Unknown dates/places are explicit. “Verified” requires defined evidence, not merely valid JSON.

Animate spatial change to maintain orientation; never add motion simply to make the product feel alive. No pulsing when recording is not active. Honour reduced motion and keep essential state visible without animation. Use actual content and state, not fabricated progress, counts, confidence or testimonials.

## Responsive composition

The mobile experience is not the desktop interface compressed. Use the same action hierarchy, but let the chart strip scroll, keep controls within reach, and use available-width panels. Test small/short screens, safe-area insets, long names, larger text, keyboard opening and pointer input. A 390px iframe is responsive evidence, not real-device speech/touch validation.

The default canvas must retain the dominant usable connected area; measure its occlusion and usable bounds in the review. There is no unsupported universal “80% canvas” rule. A broad percentage can hide unusable thin strips and does not establish tasteful composition.

## Exceptions and change governance

Every UI change names a user job, registered surface/state and affected design rule. Product owns priority, Design owns hierarchy/components, Development owns truthful functioning, Delivery owns fresh evidence and release packaging. None can silently waive a critical truth, privacy or data-loss failure. Do not call the design system enforced beyond the checks actually running.

See `docs/DESIGN_EVALS.md` for gates and the current source audit.
