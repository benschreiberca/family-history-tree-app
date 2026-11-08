# Kin Atlas prototype plan

Goal: validate synchronized time, relationships and Earth navigation before building persistence.
Architecture: static ES modules, SVG tree, Canvas globe, shared in-memory state. Spec: PRD.md. No third-party runtime dependencies or real family data.

- [x] Write PRD and architecture, clearly distinguish prototype from MVP.
- [x] Implement fictional event/relationship model and pure projection helpers.
- [x] Build scroll-driven tree with person selection, search, branch and year controls.
- [x] Build linked rotatable globe and accessible location list.
- [x] Verify unknown dates, future events, latest residence and hemisphere projection using Node tests.
- [x] Browser-check scrolling, selection, view switching and narrow-screen layout where preview permits.
- [x] Package public-ready source with license and publish preview.
- [x] Create public GitHub repository `benschreiberca/kin-atlas`; populate with original code, fictional data and documentation.

Review focus: unknown dates excluded from inferred chronology; future events hidden; empty branch/search states; selected-person state retained between views; controls stay usable with reduced motion and without pointer dragging.
