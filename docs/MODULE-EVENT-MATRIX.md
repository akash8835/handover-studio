# Module and event parity inventory

Sources observed 28 October 2026: https://demoly.dev/, https://demoly.dev/faq (110 FAQ entries), https://demoly.dev/videos/demoly-promo-video.webm, https://app.demoly.dev/signup.

Full parity is unverified. Internal account access is pending. Public claims are not proof of actual runtime behavior.

| Module | Events in scope | Current state |
|---|---|---|
| Identity | signup, verify, SSO, login, logout, reset | Owner password login/logout only |
| Workspace | create, switch, invite, role changes, revoke | Personal workspace only |
| Capture | install, pair, permissions, start, cancel, stop, retry | Single-tab DOM capture; synthetic Chrome capture/upload/replay passed, user-device acceptance pending |
| Web events | click, scroll, pointer, input, DOM mutation, navigation, reload, tab switch | rrweb click/scroll/input/DOM capture verified synthetically; reload/tab switch acceptance pending |
| Audio | mic permission, device, tab audio, transcription | Not built |
| Smart demos | steps, reorder, hotspots, zoom, voiceover | Not built; reference inspection needed |
| Library | list, title search, open, rename, describe, delete | Implemented foundation |
| Folders | create, open, assign | Implemented foundation |
| Editor | play, pause, seek, speed, cuts, cursor, restore | Implemented subset |
| Redaction | inputs, nodes, moving elements, screenshots, later mutations | Inputs/text-node subset only |
| Comments | pin, add, reply, resolve, permissions | Owner add/list only |
| Sharing | private, public, revoke, embed, restricted emails | Public/revoke/embed subset |
| Questions | text search, timestamps, AI, summarize, follow-up, multi-video | Text search + optional grounded AI; other details pending |
| Visual AI | OCR, screenshot reasoning, canvas/frames | Not built |
| Collections | create, arrange, share, search | Not built |
| Branding | logo, colors, custom domain | Not built |
| Analytics | opens, watch time, completion, queries | Open-count endpoint only |
| Billing | plan gates, seat costs, checkout, cancel | No spend or subscription implemented |
| Docs | generate, edit, regenerate, PDF/DOCX | Reference roadmap, not claimed live |
| Diagnostics/MCP | console, network, errors, coding-agent integration | Reference roadmap, not claimed live |
| Failure events | no permission, no snapshot, auth, quota, offline, too large, revoked | Partial explicit errors; more tests needed |

Source conflicts: landing page lists Free/Pro/Ultimate with 15/30-minute limits; FAQ lists Free/Pro/Enterprise and unlimited duration. Audio/MCP/docs descriptions mix roadmap and present-tense claims. Resolve through direct account inspection instead of copying contradictory promises.

## Second build pass
- Public password-free reference-style front page added; private workspace moved to /workspace.
- Actual deployed Workers AI question answering tested with synthetic evidence, then test recording deleted.
- AI-generated timestamp citations are checked against supplied timestamp strings; invalid citations fall back safely.
- Smart steps now support manual authoring/reorder/delete, AI drafting from captured text, per-step manual preview zoom and browser device narration. This is not an AI audio export or automatic zoom detector.
- Private collections support create/edit/delete and selecting recordings. Public hubs and branding remain open.

## Functional repair pass
- Fixed a deployed Cloudflare static-asset redirect that sent /workspace back to the public landing page.
- Added direct desktop screen video capture with optional microphone/tab audio, review, download backup, private upload and authenticated replay. Full live path tested with the browser's synthetic video source, not real user footage.
- Video mode AI uses reviewed transcript/notes, not pixels. DOM capture remains the route for silent page-text search.
- Added beta email/password customer signup/login with salted PBKDF2 hashes and separate storage namespaces; cross-account read tests pass. No email verification, password recovery, SSO or multi-member workspace roles yet. Not commercial-production ready.
- Free beta caps: 25 new accounts/day, 20 recordings/workspace, 12 MB per video and 18 MB DOM payload.

## Beta hardening
- Account-delete endpoint removes the account's library and invalidates sessions/device identity through principal deletion.
- Owner sign-in label is generic on the public login screen.
- Public redacted DOM replay omits generated steps/comments because they may still quote now-redacted text.
- AI calls are rate-limited per principal/IP/hour on the free beta; this is KV best-effort, not a transactional abuse control.
- Still unresolved: secure transactional identity/store, email verification/reset, durable video storage/range streaming, media privacy review, true element-following masks, all reference internal workflows.
