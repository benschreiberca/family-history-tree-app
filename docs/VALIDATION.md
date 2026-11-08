# Prototype validation — 8 November 2026

Passed: five Node model tests (unknown dates, historical events, residence selection, projection, relationship direction and fixtures); JavaScript syntax checks.

Browser checked on the managed preview: desktop rendering, direct next-decade control, person search and selection, jump to birth year, Earth switch preserving selected person/year, location list, globe rendering. Phone layout reviewed in a 390 × 844 iframe; tree changed to two columns for readability.

Limits: not a full accessibility audit; touch gestures on physical phones, large trees, uploads/auth/import and production data are not tested. The latter features are not implemented. Browser automation scroll-into-view may itself move the timeline; direct pointer controls were checked separately. Browser extension metadata errors were observed, not application errors.

## Interaction refinement
Eight model tests now pass, including shortest-path sizing, nearest-year selection, centred focus and no same-row overlap at desktop/mobile view widths. Desktop preview verified scroll-driven focus changing to Eva North at 1943, with her parents and child larger than distant relatives. Globe latitude tilt is fixed at zero for both drag and location selection.
