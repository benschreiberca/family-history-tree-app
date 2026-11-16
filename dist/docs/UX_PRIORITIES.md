# Immersive tree UX — product priority and interaction contract

2026-11-15. This decision supersedes the original PRD's permanent profile column, large heading, year controls and always-visible filters. Core value: make a trustworthy family tree easy to create, explore and understand. A feature's rank determines its screen prominence, not whether privacy or correctness is optional.

## Ranked feature hierarchy

| Rank | Capability | Importance to the product | Interface treatment |
|---|---|---|---|
| 1 | Explore people and their connections | The primary product object and payoff | Full-viewport tree; no permanent sidebar or dashboard cards |
| 2 | Build and grow the family through voice or text | Primary creation workflow | One prominent Build with voice action; dedicated large-canvas workspace |
| 3 | Find and focus a person | Navigate beyond the first screen | Compact Find person action; search field and results shown on request |
| 4 | Inspect a person's life, events and evidence | Understand the person without losing tree context | Selected-person Life & sources chip; desktop side drawer / mobile bottom sheet |
| 5 | Understand how two people connect | Explain relationship meaning | Explicit Compare mode under More; compact result only while active |
| 6 | Choose a chart suited to the question | Different views of the same family | One chart control; ten-preview picker only when requested |
| 7 | Review identity, conflicting claims and proposed changes | Protect family truth | Inline at the point of adding/editing; never a passive dashboard of alerts |
| 8 | Research sources and attach discoveries | Expand evidence and timeline | Sources tab inside the requested profile |
| 9 | Explore geography and migration | Supporting context | Earth within More; no permanent competing panel |
| 10 | Recall stories, canonical bios and corrected spellings | Preserve family knowledge | Person context and creation/review flow; canonical regeneration and lexicon remain planned |
| 11 | Collect documents and photographs | Future evidence library | Contextual drop/upload in profiles and archive workspace; tier two |
| 12 | Ask natural-language questions | Optional shortcut to supported facts | Small Ask family entry, closed by default; no intrusive chat window |
| 13 | Local storage, export, backup and private sync | Trust and ownership foundation | Setup / explicit data settings, not explorer chrome; encryption/sync still planned |
| 14 | Model controls and evaluation results | Contributor/maintainer quality tools | Connection settings and developer documentation; not primary navigation |
| 15 | Source code, PRD, inventory and help | Open-source discoverability | More menu and repository documentation |

## Default view

The graph canvas spans the viewport. Floating controls occupy a narrow top strip, a small selected-person chip at the bottom and a quiet chat entry. The title block, persistent biography, large avatar, visible branch selector, legend, project link row and extra explanatory boxes are removed from the default view. The visual container leaves approximately 76 px above / 68 px below on desktop, and 102 px / 80 px on narrow screens, for controls and touch targets; the tree background covers the viewport. These are implementation spacings, not claims of measured user preference.

The chart preference is retained. Focus timeline remains the initial view for a new browser; vertical page scrolling moves through generations. Alternate charts retain drag/pan/zoom and Fit view. The view should communicate relationships, not imitate a game with unrelated visual effects.

## Selection is not disclosure

- Click/tap or Enter on a person: update selection, relative emphasis, selected-person chip and shared Earth selection. Do not automatically open details.
- Activate Life & sources: open details for the selected person. Desktop uses a nonmodal side panel; narrow screens use a bottom sheet. The tree remains behind it.
- Close or Escape: close details and restore keyboard focus to the invoking chip. Selected person and graph state remain.
- Navigate a relative in an open panel: update that person's content and graph selection. The panel remains open by intent.
- While editing/reading a profile, scroll the profile; do not advance the timeline behind it. Likewise suppress timeline-follow while search, chart picker or More is open.

## Progressive disclosure

Top toolbar: chart style, Build with voice, Find person and More. More contains Family/Earth, Compare, branch selection, help and project links. Search appears as a floating field with results, not a permanent column. The chart picker retains previews but disappears after selection. Comparison is transient and keeps its pair until explicitly changed. Existing chat opens only on request.

Voice remains a separate full-width creation workspace, not a modal stacked over the explorer. The next voice iteration should make its transcript collapsible and review focus clearer; this explorer change does not claim real microphone reliability.

## Interaction and accessibility checks

- Default desktop has no profile drawer, search popover, comparison bar or style picker covering the graph.
- Selecting a person updates the chip without opening the profile.
- Profile open / close / Escape preserves selected person and restores focus.
- Desktop profile scroll does not change tree selection; mobile sheet does not trap the user.
- Chart switching preserves person selection; comparison mode stays available.
- Find person can reach any displayed record and returns attention to the selection.
- More and search expose expanded state; every icon-only close button is labelled.
- Keyboard person selection, pan/zoom and reduced motion remain supported.
- Test 390px phone, tablet and desktop viewports, long names and a dense tree before declaring mobile accessibility complete.

## Status and limits

Implemented: immersive explorer CSS/layout, compact toolbar, on-demand search/tools, profile drawer/sheet, Escape close and selected-person chip. Existing graph correctness suite remains separate from usability evidence. No formal usability study, full accessibility audit or large-family performance certification is implied. The product inventory remains the source for whether underlying features are implemented, partial or planned.

## Navigation and profile update — 2026-11-15

The biography now uses a full-height side panel on all screen sizes, replacing the earlier mobile bottom sheet. Desktop width starts at 440 px, can be resized from its left edge or expanded to 760 px; on narrow screens it uses nearly the available width. Timeline, Sources and Family tabs provide event details, provenance and clickable relatives, with recorded-place facts and current evidence counts. The panel remains closed until requested.

The timeline and alternate charts now share pointer navigation: drag to pan even when starting over a person, pinch around the midpoint to zoom, then continue panning with the remaining finger. A stationary tap selects; finger drift is tolerated; cancellation and pinch never select someone. Network node repositioning is deliberately Alt-drag with a mouse so ordinary panning cannot rearrange people. Trackpad small wheel deltas pan; Ctrl-wheel / trackpad pinch and mouse-wheel zoom around the pointer. Timeline plain wheel retains chronological page navigation; touch drag pans the camera. Visible + / − / Fit tree controls recover from any zoom level. Keyboard navigation is supported.

35 deterministic tests pass, including anchor math, pinch-to-pan continuity, tap/drag distinction and cancellation. Browser checks verified zoom → drag changes camera position and Fit recovery, plus expanded profile tabs. These do not substitute for physical-device multitouch testing.

## Discovery and memory dock — 2026-11-16

The visible tree navigation now separates **Whole family** (leave scoped ancestry/descendant views, clear branch/name filters, show the complete Constellation and reset camera) from **Fit view** (fit the current scope) and + / − zoom. This gives the user an explicit way out after tapping into a person's branch. Profile close remains separate: closing a biography must not imply changing the family selection.

All ten charts are directly available in a persistent horizontally scrollable strip with previous/next controls, a selected state and a view count. On phones, swipe the strip or use the arrows. Name search moves to More as an optional utility; it is not the primary family-exploration mechanism. Normal exploration is tapping connections, switching views and opening Life & sources.

Voice now uses **Add a memory** over the existing tree. A compact recording dock asks “Who comes to mind?”, shows the latest spoken words and processing status, and lets the tree grow in the same canvas. Approved people and draft people coexist, with dashed draft nodes. Tap a draft person to inspect their quoted memory. Text/model settings are on demand, not the initial interaction. Review is a separate nonmodal side panel; only explicitly approved new/existing identities and checked links enter saved data. This is an interaction redesign, not a new speech engine.

Opening the dock initially uses Constellation so all current people remain visible; other chart styles can still be tried. Rooted views show only their relevant branch, and Focus timeline uses a network layout while the memory draft is active. Whole family always restores the complete graph. The displayed sample is fictional, uses no microphone/model requests and cannot be committed. Clear sample removes its transient nodes. Real voice still requires a connected model and consent; no automatic provider or cloud-processing promise has changed.

Verification: 35 deterministic tests pass. Browser checks covered a focused/zoomed person → Whole family recovery, visible chart choices, sample growth to three people / two links, and draft-person memory. A separate mocked speech/provider run produced three draft people in the main canvas and opened the review panel after stopping. No physical phone, real microphone, live model or long-recording run was verified in this change.

Mobile follow-up: the recording dock uses a single compact control row; transcript/options stay hidden. The camera frames newly appearing draft people instead of shrinking them into the complete overview. Whole family recovers the overview. A 390 × 844 CSS-pixel iframe layout was checked; no physical-phone claim is made.
