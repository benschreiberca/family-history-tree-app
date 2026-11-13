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
