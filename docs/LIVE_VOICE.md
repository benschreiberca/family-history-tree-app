# Live voice → draft family tree

Version 1 · 13 November 2026

## Product behavior

**Tell a story** opens a recording workspace. The browser produces interim and finalized transcript text while recording continues. Finalized speech is queued for extraction on an eight-second scheduling cadence. This is a latency/cost tradeoff, not a context or story-length cap. One extraction runs at a time; later segments queue and the pending/failed counts remain visible. Stopping recording flushes the remaining finalized text and lets the queue drain. There is no application-imposed one-, five- or ten-minute recording cutoff.

The draft graph grows as extracted names and links arrive. Each proposal retains an exact quote from its segment. This first version extracts named people and explicit parent/partner links only. It does not extract dates, places, every extended-family relationship, a polished life story, or infer an unnamed person. Context-dependent statements that cross segment boundaries can be missed. The editable full transcript can be reprocessed after stopping to recover context, subject to the chosen model's real context capacity. Oversized or failed requests remain failures, not silently truncated inputs.

The separate draft graph is clearly marked unapproved. It is not evidence for the chatbot or the main tree. Matching name strings are grouped provisionally; a reviewer must resolve identity. There is no automatic fuzzy matching or assumption that two equal names necessarily identify the same person.

## Review and save

After recording and queued processing stop, choose new/existing/skip for every proposed person. Correct new-person spellings. Existing-person selection uses a stable ID. Select each link to approve it; links start unchecked. The commit validates endpoints, duplicate IDs, self-links and parent cycles. No AI request can call this commit. Only the user's explicit **Add reviewed choices** action saves records.

New profiles receive attributed, verbatim recorded-memory excerpts. Existing biographies are not overwritten. A reviewed story is stored with associated person IDs, timestamp and failed segments for recovery. A canonical edited narrative and a cross-contributor spelling library remain future work. Conflicting but acyclic parent claims can still be proposed; human review is required. This is not a full reconciliation engine.

Reviewed additions save in this browser's local storage. They survive reload on the same origin but are not synchronized across devices or users. There is no backend, collaboration, durable source-media archive or production access-control implementation in this prototype. Before using real family data, understand that clearing browser storage removes the saved additions. Audio and transcript download controls are provided. Unreviewed drafts are in tab memory and can be lost if the tab closes.

## Architecture

MediaRecorder captures downloadable audio independently of browser speech recognition. Browser recognition may use a browser vendor's service; it is not represented as private on-device transcription. Its availability, language quality, interruptions and duration behavior depend on browser/vendor support. If unsupported or denied, the user gets an explicit error and can paste a transcript. There is no claim of cross-browser live speech support.

Pipeline: finalized transcript → segment queue → selected OpenRouter model → strict extraction schema and exact-quote validation → draft graph → explicit identity/link review → graph validation → browser-local commit. Original audio does not go to OpenRouter in this version. Transcript segments plus earlier draft names do, after consent. The existing OpenRouter key and privacy/free-only settings apply. No whole approved tree is sent.

The adapter checks the current model catalog, disallows provider data collection, does not automatically fall back, and rejects incomplete output. If the selected model has no eligible provider, processing fails visibly and retains the segment for manual retry. A single request timeout is an operational safeguard, not a recording-length limit. The queue is session-local, not a durable worker queue.

## Evals and honest release status

Implemented automated tests check schema, exact quotes, endpoints, self-links, cycles and the adapter's safety checks. Browser UI testing used a simulated extraction: transcript → two proposals → explicit matching/link review → saved additions. Real microphone transcription, live model extraction and 1/5/10-minute load tests have **not** been verified. They require an API key, audio and a supported browser.

Before production, run these model-independent evals with reference transcripts and independently labelled expected records:

| Eval | What must be measured |
| --- | --- |
| Streaming completeness | At 1, 5 and 10 minutes, track each finalized segment through queued/running/done/failed; no disappeared segments. Measure added-record recall against the complete narrative, including facts across boundaries. |
| Time to draft | Measure final speech timestamp → first corresponding visible proposal, plus queue backlog and drain time. Set target latency from observed user tolerance and cost measurements. |
| Evidence fidelity | Every proposal quote must be a literal segment substring; separately grade whether it actually supports the proposed relationship and direction. Substring checks alone cannot establish semantic truth. |
| Uncertainty and correction | “Maybe,” “not,” self-corrections, names corrected mid-story, same-name people, contradictory dates and relationships must remain reviewable; no unreviewed record commits. |
| ASR versus extraction | Evaluate reference-text extraction separately from audio→transcript→extraction. Report name spelling and relationship-direction errors at each stage. |
| Reconciliation | Repeated segments and retries must not duplicate accepted nodes/links; two distinct same-name people must be separable before approval. Current draft UI cannot split a grouped same-name node; reprocess an explicitly disambiguated transcript. |
| Commit safety | Partial acceptance, skipped people, duplicate identities, cycles, storage errors and cancel/retry sequences must not silently write invalid or unwanted links. |
| Long-session resilience | Browser-recognition restarts, network outage, expired key, free-tier limit, context-limit error and page closure. Measure recoverable coverage; persistent queue/page-crash recovery is not implemented. |
| Bio preservation | New memory stays attributed to its source. Existing approved narrative/human wording is unchanged until a separate reviewed bio update. |
| Privacy and spend | No audio or whole-tree upload to OpenRouter, no key persistence, no calls without consent, no paid fallback, and no raw private transcripts in public fixtures or reports. |

Use the same labelled datasets and pipeline configuration for model comparisons. Treat any unauthorized canonical write or lost evidence as a blocking defect; calibrate accuracy and latency targets from benchmarks instead of inventing thresholds.
