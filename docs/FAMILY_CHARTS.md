# Family charts and relationship comparison

Implemented in the fictional-data prototype. The existing Earth view is unchanged.

## Views

- **Timeline:** scroll through generations, keeping the focal person central and close relatives larger.
- **Network:** an Obsidian-inspired node graph. Drag people to arrange them, drag empty space to pan, and scroll to zoom. Parent links are solid; partner links are dashed. Layout changes are temporary and never edit family relationships.
- **Ancestors:** the selected person below their recorded parents and earlier generations. Selecting a person changes the root. Missing ancestors are not invented.

The style selector preserves the selected profile. Search highlights matching people; branch filters limit visible nodes. Relationship calculations always use the complete recorded graph, even if a view filter hides some of its path. Use All branches and Network to see the full connecting path. The charts use the same stable person IDs and relationship records as the timeline and Earth.

## Compare two people

Enable **Compare two people**, then select two nodes, or choose names in the two fields. The result gives a directional plain-English relationship, shared ancestors and generation distances where applicable, and an expandable path. The network highlights one explaining path. Selecting a third node starts another pair. Turn comparison off to return to ordinary exploration.

Relationship calculation is deterministic and runs locally; it uses no LLM or API key. For common-ancestor distances `a` and `b`, cousin degree is `min(a,b)-1` and removals are `abs(a-b)`. Direct ancestors/descendants and siblings/aunts/uncles/nieces/nephews are handled separately. The chosen common ancestor minimizes total parent steps, then maximum depth; equally close ancestors at those depths are named. One explaining path is highlighted, not every possible ancestry route.

The current data has generic parent links and no gender field. Wording therefore does not infer gender or claim biological ancestry. It does not distinguish full/half, biological/adoptive, or automatically label step/in-law relationships. Connections through partners are described as such, with their explicit path. A missing connection means no connection is recorded, not that the people are unrelated. An ancestry cycle blocks calculation with a review message. Multiple ancestral routes can exist; comprehensive multi-relationship reporting is future work.

## Accessibility and controls

Select nodes with Enter or Space. Focus a new chart and use arrow keys to pan, +/− to zoom, and 0 to reset its view. Person selectors provide an alternative to selecting graph nodes. The relationship result uses a polite live region. Touch supports dragging; physical-device pinch gestures are not implemented or verified.

## Verification and scale

Run `npm test`. `tests/kinship.test.js` checks directional ancestry, siblings, cousin degrees/removals (including 3rd cousin twice removed), partner-only paths, missing connections, ancestry cycles, multiple common ancestors, and gender-neutral wording. Browser QA verified node-based comparison, selector-based comparison, network rendering, keyboard selection and an ancestor chart.

The network layout is a small-data prototype with pairwise force calculation. It is not a production-scale graph renderer. For large trees, calculate visible neighborhoods and layout in a worker, preserve complete data for kinship, and benchmark rendering and traversal against representative family sizes. Do not cap evidence or silently drop family records to fit a display.

## Ten styles — November 2026 update

The visual picker now offers Focus timeline, Constellation, Pedigree, Descendants, Horizontal generations, Kinship rings, Ancestor fan, Lifespans, Relationship arcs and Hourglass. Preference persists in this browser. Selection and comparison state survive switching. Scoped views may hide members of a comparison path; the comparison text remains available. Change to Constellation to see the complete connecting path within the current branch filter.

All alternate views support pan, wheel zoom, keyboard arrows / + / - / 0, Fit view, keyboard person selection and hover/focus connection emphasis. Only Constellation allows free dragging of individual nodes; structural charts preserve their positional meaning. Node movements animate unless reduced motion is requested. Long names and dense real trees still need collision and performance work; no large-tree scale claim is made.

Generation columns derive from parent edges, not recorded birth years. Rings count parent or partner steps. The fan uses unique ancestors by shortest depth, not repeated binary pedigree slots. Lifespans never extend an unknown death to today. Arc spacing is ordinal. Parent cycles withhold hierarchy rather than drawing misleading generations.

Navigation update: ordinary drag pans in every chart, including over a person. Constellation node repositioning now requires Alt-drag with a mouse. Two-finger pinch zooms the chart; Ctrl-wheel is also supported. + / − / Fit tree are always reachable. Profile details use a resizable full-height side panel. See UX_PRIORITIES.md for the current contract.
