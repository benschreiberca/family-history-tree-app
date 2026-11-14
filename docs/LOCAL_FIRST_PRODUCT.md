# Local-first product and privacy architecture

Proposed architecture, 2026-11-14. **Not implemented in the browser prototype.** This supersedes the server-first assumption in the earlier document RAG plan for the default product. A hosted edition can remain optional.

## Product promise

Download an app from GitHub, create a family vault on your computer, speak or add documents, and keep using the app without an account. The family graph, source records, original documents, extracted text, indexes and biographies belong to the user and remain usable offline.

Do not promise “no one stores your data” without qualification. Distinguish:

| Mode | Storage and outbound behavior | Honest user-facing promise |
|---|---|---|
| Local only (default target) | Files, ASR, OCR, search and model inference on device; application network operations blocked after optional initial downloads | “Your family content stays on this device while Local only is enabled.” |
| Cloud AI, explicitly enabled | Selected text / evidence goes directly to the chosen provider, or through OpenRouter to its selected provider; no developer-operated content proxy | “Only the content shown in this request is sent to these services. Their retention rules apply.” |
| Encrypted sync, explicitly enabled | Encrypted objects and changes uploaded to user-selected storage | “The storage service receives encrypted family content. It can still see account, timing and size metadata.” |
| Hosted prototype today | localStorage + in-memory drafts; OpenRouter receives prompts; browser ASR may send audio to its vendor; hosting receives normal web requests | “This is a browser prototype, not an offline or end-to-end encrypted product.” |

A user's OS backup, cloud-synced home directory, installed malware or unlocked device can expose data independently of our application. Encryption does not hide plaintext while a user/model is legitimately processing it. Do not claim immunity to endpoint compromise. No product-content telemetry by default. Update checks/downloads are separate, visible network operations and can be disabled in Local only.

## Smallest viable desktop architecture

**Tauri desktop shell + existing web UI + native service layer + encrypted SQLite-compatible database + encrypted document objects.** Keep the rendering and graph algorithms reusable. Use the native layer for vault operations, keys, model requests and background jobs; do not give the webview arbitrary filesystem access. Tauri capabilities constrain the commands exposed to each webview, but capability configuration and app code still require security review.

No public backend is required for one-device use. Build macOS, Windows and Linux packages in CI; distribute signed/notarized installers where supported through GitHub Releases with checksums, SBOM, exact commit/tag and build instructions. The current source ZIP is not an installer. Signing proves origin, not absence of vulnerabilities. Reproducible build verification is a release goal, not an existing guarantee. iPhone/iPad require a separate mobile distribution and local-model assessment; desktop packages do not install there.

### Vault components

- Database: people, aliases, relationships, claims, events, source references, searches, review history, document metadata, extraction jobs and bio revisions. Choose and license-review an established encrypted SQLite implementation. Ordinary SQLite is not encrypted by default.
- Objects: immutable encrypted originals, audio, thumbnails and derived assets; opaque IDs instead of plaintext person names in paths. Store original MIME and filenames in encrypted metadata.
- Retrieval: local full-text index inside the encrypted database; optional embeddings stored locally with versioned model IDs. Indexes contain sensitive information and must be covered by the same lock/backup/delete policy.
- Secrets: random vault master key protected by the OS credential store or a reviewed encrypted secret vault. Wrap a recovery copy using a strong passphrase KDF (e.g. Argon2id through a maintained library). Do not keep the password and ciphertext key together in settings files.
- Files: use an established authenticated file-encryption API such as libsodium secretstream; do not design a new encryption primitive or hand-roll nonce handling. Bind vault/object/version metadata as authenticated additional data where applicable.
- Jobs: persisted queue for extraction, OCR, chunking and reindex; idempotent document-hash + extractor-version keys. No generative model needed for ordinary text-PDF extraction.
- Lock: release decrypted indexes/keys and close handles; control temporary files, thumbnails, crash dumps and logs. Avoid guarantees of perfect memory erasure in managed runtimes.

Migration imports browser-local records through an explicit export/import step; validate and show counts before committing in a transaction. Back up the source export first. Never silently combine real data with the fictional demo vault.

## Safer LLM calls: a local capability broker

The model does not receive a database connection, shell, arbitrary path reader or arbitrary URL fetcher. It asks a broker for narrowly scoped operations:

| Tool | Allowed input | Enforced output/boundary |
|---|---|---|
| resolve_people | Name/approved alias in current vault | Candidate IDs, ambiguity status; no automatic merge |
| get_relationship | Two authorized person IDs | Deterministic relationship plus recorded edge path |
| retrieve_evidence | Current-vault IDs, query, allowed source scope | Authorized excerpts with source/page IDs and actual context-budget bounds |
| propose_claims | Text plus approved evidence IDs | Validated draft objects; no canonical writes |
| preview_changes | Proposed draft IDs | Human-readable diff and conflicts |
| commit_reviewed_changes | One-use user review token bound to exact draft revision | Transactional write; stale or forged token rejected |

Treat the LLM as untrusted. The broker checks tool name, argument schema, resource ownership, review revision and permissions on every call. Do not let prompts grant authorization. Documents are data, not instructions. Enforce cancellation, timeouts and configurable spending/request limits. Retry only idempotent reads automatically; never duplicate writes.

The native broker owns provider keys; keys never enter webview state, model messages, screenshots, telemetry or exports. Allowlist destinations; validate redirects; block file paths and arbitrary remote destinations. Local inference endpoints must be explicitly configured and restricted; a localhost service is not automatically authenticated or safe.

Cloud request UI shows recipient(s), model, purpose and exact data categories; an inspectable payload preview is available. Send minimum necessary excerpts. Where name substitution with stable opaque IDs preserves task utility, substitute and remap locally; free-text narratives may still identify people, so this is not a promise of anonymization. No full-vault upload or hidden fallback to a different model/provider. Configure provider training denial and strict zero-retention routing when offered, fail closed when unavailable. **Training denial alone is not zero retention**, and ZDR is a provider commitment, not end-to-end encryption from the provider performing inference. Record routing metadata locally without copying sensitive prompt bodies by default.

OpenRouter requests in the current prototype use `data_collection: deny` and no fallback; they do not yet enforce the complete broker/ZDR design. Moving a key into a desktop native layer reduces its exposure to UI code but does not make cloud inference private from its recipient.

## Private sync without a central plaintext database

Start with **encrypted backup and restore**, then same-user multi-device sync; introduce family collaboration only after both work reliably. Support a user-selected object-store/WebDAV adapter behind a small interface, not a proprietary mandatory account.

1. Each vault has a random key, each device a signing identity. Pair a new device by a trusted-device approval and verified key fingerprint / QR flow; do not send a raw vault key to storage.
2. Sync immutable encrypted document blobs and encrypted change batches, not an actively edited SQLite file/WAL. Sign manifests; use authenticated encryption and versioned protocol metadata.
3. Download and verify on-device, then apply transactions locally. Detect duplicate, corrupted, reordered and replayed changes. Preserve monotonic/checkpoint state for rollback detection; a malicious server can still withhold updates.
4. Concurrent different-field edits can merge; incompatible claims or identity merges enter the review inbox. No last-write-wins for family truth. Keep source provenance and all competing claims.
5. Storage sees ciphertext, object sizes, access times and account/network metadata; use opaque paths and encrypted manifests. Do not claim metadata anonymity.
6. Recovery uses a user-held recovery secret or another trusted device. No developer reset that silently bypasses encryption. Losing all keys means losing access; verify recovery before onboarding is complete.
7. Member permissions use signed writer authorization separate from read/decryption keys. Read-only recipients can still copy content they can decrypt. Revocation stops future sync and requires key rotation for future content; it cannot erase downloaded copies.
8. Deletion syncs authenticated tombstones. Remove local derived text, vectors and cached answers; document remote-provider versioning/backup retention. Do not promise immediate deletion of third-party backups outside our control.

Use maintained cryptographic libraries and commission protocol/security review before claiming production E2EE. Sync is not backup: accidental deletion can sync too. Keep independent encrypted snapshots and test restore on a clean device.

## Minimal document flow

Drop PDFs/images/photos → select person tags → encrypt original locally → text extraction or local OCR → page-aware chunks → local search → proposed sourced claims → human review. Reuse the existing profile/source IDs. Photo identification stays human-confirmed. RAG answers cite document + page/chunk, distinguish source claims from accepted family facts and explicitly disclose conflicts. See DOCUMENT_RAG_PLAN.md for extraction data contracts and evals; deploy its jobs and storage locally by default.

## Trust evidence, not a privacy badge

Publish the data-flow map, a dependency/network destination manifest and the precise mode-specific promises above. Provide a local “Data & connections” screen: vault location, encryption/lock state, model location, sync destination, last outbound action and what was shared. Include “Export everything”, “Verify backup” and “Disable network”. No dark patterns around enabling cloud processing.

Release gates:

- Run the complete local workflow with egress denied and an empty network capture; model downloads happen in a separately labelled setup step.
- Inspect disk, temp files, logs and backups for plaintext canary names/document text while locked. Test wrong-password, corrupt/truncated object and interrupted migration behavior.
- Test tool prompt injection, arbitrary path/URL requests, forged review tokens and cross-vault IDs. They must not read or modify unauthorized data.
- Capture cloud payloads against fixture allowlists: no keys in content, no unrelated people/documents, no silent provider fallback. Confirm server-side policy configuration; do not rely on prompt instructions.
- Test two offline devices editing the same claim, duplicate uploads, rollback/replay attempts, revocation and key rotation.
- Restore an encrypted backup on a clean machine, including originals, sources, aliases and revisions. Test lost-device recovery and honest unrecoverable-key behavior.
- Keep all test fixtures fictional or explicitly licensed. Publish supported build/OS versions, test results, failure cases and security-reporting procedure.

Product success measures: time to first reviewed family connection, proportion of voice proposals accepted/corrected, correction recurrence, source-citation coverage, no-loss recovery rate, real-time queue lag, grounded-answer error rate and successful backup restores. Establish targets from baseline tests; do not invent precision percentages.

## Primary references checked 2026-11-14

- Tauri capabilities: https://tauri.app/security/capabilities/
- Tauri secret storage: https://tauri.app/plugin/stronghold/
- SQLite encryption extension: https://www.sqlite.org/com/see.html
- libsodium authenticated file streams: https://doc.libsodium.org/secret-key_cryptography/secretstream
- OpenRouter provider retention: https://openrouter.ai/docs/guides/privacy/provider-logging
- OpenRouter routing controls / ZDR: https://openrouter.ai/blog/insights/ai-data-residency/
