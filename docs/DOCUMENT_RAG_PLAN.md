# Tier two: family document library and retrieval

Status: planned, not implemented. Keep the profile / source / claim IDs from tier one so upload processing does not create a competing truth store.

## Minimal architecture

Use one application backend, one relational database, private object storage and an asynchronous job worker. Start with full-text retrieval. Add a replaceable embedding index only when evaluation demonstrates a retrieval improvement. A vector database and an agent framework are not prerequisites.

- **Object storage**: original image, photograph or PDF; immutable content hash, private key, MIME type, byte size. Never put originals or signed download URLs into public source control.
- **Document table**: ID, family workspace, uploader, original filename, hash, storage key, rights/access scope, upload time, extraction status, extractor version. Deduplicate within a workspace, not across private families.
- **DocumentPerson table**: many-to-many person tags with proposed / reviewed status and who made the association. A photo tag is not automatic facial identification.
- **Extraction table**: document version, page number, text, bounding boxes when available, language, OCR uncertainties, engine/version and status. Keep original OCR and user corrections separately.
- **Chunk table**: stable ID, extraction version, page span, character offsets / boxes, content, heading, token count, optional embedding model/version and vector. A chunk can cite its original page.
- **ClaimSource table**: proposed claim, source document, chunk IDs, quoted evidence and review status. Accepted claims feed the existing timeline / bio projection; a retrieval hit does not become a fact.
- **Job table**: queued / extracting / indexing / ready / failed / cancelled, attempt history and retryable error. Use content-hash + extractor-version idempotency keys. Do not repeat paid extraction after a browser reconnect.

## Drag-and-drop flow

Drop files into a person profile or the family library → show filename, size and suggested tags → confirm upload → preserve original → extract text asynchronously → create page-aware chunks → index → review names, places and candidate claims. Display progress per file and allow manual retry, correction, cancellation and removal. PDF text extraction comes first; OCR only for image pages. Photographs can carry captions and user-confirmed person tags without forcing a visual model to infer identities, ages, places or dates.

The backend validates MIME signatures, permission and configured resource limits. It must not execute uploaded content or follow document instructions. Use expiring signed URLs with workspace authorization. Malware scanning / quarantine precedes serving uploads. Treat decompression bombs, encrypted PDFs and extraction failures explicitly. User configuration and observed resource capacity determine limits; do not invent hard page, chunk or claim counts in the product contract.

Chunk by page and semantic boundary; retain paragraph overlap only when it improves retrieval. Choose token budgets from the actual embedding / answering model context and evaluate them. Preserve complete source text so rechunking never requires re-uploading or repeating OCR. Images with no text remain searchable by human captions and tags; do not hallucinate OCR content.

## Retrieval contract

Apply workspace authorization **before retrieval**, then person IDs / reviewed aliases / date and document filters. Retrieve text and optional semantic matches. Return evidence with stable chunk and page references. Separate accepted family facts from unreviewed documents, oral accounts and conflicting assertions. A tiny answering model can explain retrieved accepted facts; unsupported answers must say the information is not recorded. Family-tree relationship computation remains deterministic.

Bring-your-own-key providers are adapters for OCR, embeddings and language models. Configuration records provider/model/version; keys stay server-side in production. Changing embedding models requires a versioned reindex, not mixing incompatible vectors. Extraction continues without a generative model for text PDFs. No document or recording goes to an external model without explicit workspace policy / user consent.

## Deletion and portability

Deleting a document revokes access, removes originals, extracted text, chunks and embeddings, and invalidates derived caches and pending jobs. Mark affected claims and biography passages as source-withdrawn for human review; do not silently retain inaccessible evidence as verified fact. Export a manifest with structured people, source metadata, review history and permitted original files using relative paths and hashes. Do not export keys or temporary signed URLs.

## Evals and acceptance evidence

Create a licensed, fictional fixture corpus containing scanned birth records, passenger manifests, multi-page PDFs, handwritten ambiguity, photos without text, duplicate files, conflicting dates and injected instructions.

Measure extraction error against transcriptions, name/place correction consistency, retrieval recall at the actual context budget, citation page/offset accuracy, factual support, conflict disclosure, abstention and latency/cost. Test correction → reindex → answer and deletion → inaccessible across storage/search/cache. Test isolation between two workspaces, including identical person names. Evaluate answer generation with the same evidence packet across models; do not conflate retrieval and generation scores.

Any observed cross-family disclosure, uncited invented fact presented as known, unauthorized claim acceptance or inaccessible-source citation blocks release. Calibrate other targets from measured baselines and task impact. Publish fixture versions, per-stage results and failures; do not label a model 'qualified' from deterministic pipeline tests alone.

## Delivery order

1. Private upload, storage, metadata, person tags and downloadable originals.
2. PDF text / image OCR extraction, page-aware chunking, retry status and corrections.
3. Authorized full-text search with source previews and review-to-claim flow.
4. Retrieval-assisted answers with citations and missing-evidence refusal.
5. Optional embeddings only after comparative retrieval evals justify them.
