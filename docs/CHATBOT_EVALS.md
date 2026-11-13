# Grounded family chat: boundaries and evals

Version 1 · 13 November 2026

## What is implemented

The small **Ask family** panel supports an OpenRouter key held in this tab's memory, a configurable model ID, free-only mode, a fictional routing-eval runner and a downloadable report. No API key is embedded in source, persisted, logged or included in reports. Questions are independent: prior conversation is not sent, and pronouns are not silently resolved.

The LLM is an intent router, not a family historian. It returns a small JSON lookup request. The application validates its schema and exact person IDs, runs the lookup against the current approved tree, and renders a deterministic answer with an inspectable connecting path. Raw model prose is never shown as an answer. Tree access is read-only. No web search, generated biographies, mutation tools or external genealogy retrieval are available to this chatbot.

The tree is the application's authoritative record, **not a guarantee of historical truth**. Answers say “According to this tree.” An absent link is “not recorded,” never proof of nonexistence. Generic parent links do not establish biological/adoptive status or full/half siblings. Directional relationship wording comes from recorded parent edges, not inferred gender.

## Evaluation boundaries (e-bounds)

| Boundary | Enforcement | Evaluation / failure condition |
| --- | --- | --- |
| Facts come only from the active tree | Deterministic lookup and renderer; no raw model answer | Any displayed family claim outside the selected lookup's records fails the boundary. |
| Identity must be explicit | Full-name mentions with word boundaries; duplicate full names require the Compare UI; output IDs must match mentioned candidates in order | Wrong, invented, swapped or ambiguous IDs accepted = failure. No fuzzy-name guessing. |
| Unsupported requests abstain | Router's unsupported action; invalid output becomes a refusal | Biography, motive, speculation or write requests should abstain. Report misrouted but valid requests separately: they can yield true yet irrelevant facts. |
| Evidence is inspectable | Connecting path or individual recorded parent/partner links | Each path step must exist with the displayed direction. An invalid path is a failure. |
| No unjustified certainty | “None recorded,” “according to tree,” explicit graph limitations | Treating a missing record as confirmed absence fails. |
| No tree writes | Chat has no commit API | Before/after tree snapshots must match for all chatbot requests, including prompt injection. |
| Invalid output cannot reach factual rendering | Exact JSON fields, action/kind enums, arity and ID validation; truncated/non-text output rejected | Malformed JSON, extra fields, prose, unknown actions or partial output accepted = failure. |
| Fresh evidence | Read the current tree when generating the answer; no cached answer or raw-model knowledge | Edit/remove a link, ask again, and verify the answer changes or abstains. |
| Bounded external disclosure | Only question and directly mentioned candidate names/IDs sent for chat; no whole-tree upload | Key in request body/log/export, unrelated family records in payload, or calls without consent = failure. Voice has a separate disclosed payload. |
| Cost stays under user control | Check selected ID against live OpenRouter catalog; free-only checks all listed pricing; zero price routing cap; no model/provider fallback; no automatic retry | Paid request in free-only mode, silent model substitution initiated by the app, or retries without user action = failure. Set account-side key spending limits for paid use. |

These boundaries reduce the surface for hallucinations; they do not prove that every question is interpreted correctly or that the tree itself is correct. Entity selection, intent routing, graph logic, rendering, and source quality are separate failure surfaces.

## Runnable tests

`npm test` runs deterministic tests, including `tests/chat.test.js` and `tests/kinship.test.js`. They cover malicious/malformed model outputs, entity matching, evidence, missing records, freshness, read-only behavior, cousin removals, graph cycles, provider payloads, free-only rejection and truncated responses. These tests use mocks; they are **not measured model accuracy**.

In the app: Ask family → Settings & checks → choose a model → add key → allow provider processing → **Run fictional model evals**. The runner uses `dist/chat-evals.js`, a frozen copy of the original fictional people, the same router prompt, adapter and validator as the app. It runs every case sequentially with no repair retries and reports actual outcomes, returned model/provider, latency and usage when supplied. Download JSON for comparisons. Questions include relationship, parents, children, siblings, partners, unsupported biography, invention, deletion and prompt injection. Cancellation leaves remaining cases untested; the denominator remains the full suite.

A small fixture suite is a diagnostic smoke test, not a statistically representative benchmark. No model is currently qualified. Before choosing a default, expand a held-out set with user-derived paraphrases and synthetic difficult trees. Include duplicate names, Unicode, name substrings, misspellings, unknown people, pronouns, reordered names, multiple questions, prompt injection, multilingual inputs and conflicting records. Keep development examples out of the held-out set.

## Model-independent metrics and release decisions

- **Intent accuracy:** exact action, ordered IDs and kind / all labelled cases. Include transport failures, invalid JSON and unintended refusals in the full end-to-end denominator; also report them separately.
- **Supported-question answer rate:** correctly answered supported cases / supported cases. Blanket abstention cannot look successful.
- **Unsupported-request refusal rate:** appropriate refusals / unsupported cases. Track wrong-intent answers separately from unsupported factual claims.
- **Grounding and identity violations:** accepted unsupported claims, wrong people, nonexistent evidence or unauthorized changes. Any observed violation blocks release until fixed and added as a regression case.
- **Operational quality:** completion rate, validation rejection rate, latency distribution, token usage, actual provider cost if returned, and manual retry count. Never report unknown cost as zero.
- **Model comparison:** same dataset/version/prompt/app code/configuration; retain exact requested and returned model identifiers, provider and timestamp. Repeat runs based on observed variance and report uncertainty. Select quality thresholds from measured baselines and failure costs before qualification, not invented pass percentages.

The UI's “verified from recorded links” means the deterministic answer passed the application's schema/identity path. It is not a certification that the model understood intent, that the underlying genealogy is correct, or that evals passed.

## Runtime checks and improvement

Every chat request goes through the same checks. Session counters show tree-verified answers, declines and request errors. They are not a model score. No private transcript telemetry is uploaded for product analytics. The current prototype does not implement a durable production monitoring service, an all-provider benchmark dashboard or automatic prompt/model promotion.

Improvement loop: inspect a failure → label the expected behavior → create a synthetic regression → test candidate model/prompt against held-out cases → review differences → explicitly release or roll back. Never train on or publish private family conversations without consent. Record benchmark results separately from the executable fixtures.

## Small model candidates

Checked against official OpenRouter model pages on 13 November 2026; availability and pricing are rechecked by the app before requests.

- **Qwen3 0.6B**, `qwen/qwen3-0.6b-04-28:free`: smallest candidate, listed free. Experimental routing default, not a quality endorsement. It may fail availability, privacy-policy or capacity checks.
- **Gemma 3 4B**, `google/gemma-3-4b-it:free`: a larger free candidate to compare, not an automatic fallback.
- **Llama 3.2 3B Instruct**, `meta-llama/llama-3.2-3b-instruct`: low-cost candidate listed at USD $0.05/M input tokens and $0.33/M output tokens. For illustration, 1,000 input and 100 output tokens would be $0.000083, before any applicable account charges; actual requests vary. Free-only must be deliberately disabled.

No live provider accuracy benchmark has been run in this implementation session because no key was supplied. UI integration was tested with a simulated provider response; that is not evidence that a candidate model passes.

Sources:
- https://openrouter.ai/qwen/qwen3-0.6b-04-28:free
- https://openrouter.ai/google/gemma-3-4b-it:free
- https://openrouter.ai/meta-llama/llama-3.2-3b-instruct
- https://openrouter.ai/docs/api/api-reference/chat/create-a-chat-completion
- https://github.com/OpenRouterTeam/docs/blob/main/guides/routing/provider-selection.mdx
