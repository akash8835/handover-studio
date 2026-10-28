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
