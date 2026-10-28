# Handover Studio

Akash's personal browser walkthrough workspace. Incomplete independent implementation, not affiliated with Demoly and not a claim of full parity. Existing projects remain unchanged.

## Implemented foundation
- Chrome MV3 rrweb DOM capture with masked inputs and local upload retry.
- Owner password login, private library, folders and JSON import.
- DOM replay, metadata edits, timestamp comments, playback cuts, text-node redaction.
- Timestamped captured-text search, optional free-tier Workers AI, explicit share/revoke/embed.

## Open scope
Audio/transcription, smart-demo steps, AI voiceover, auto-zoom, image/OCR reasoning, teams/roles/invites, collections, branding/domains, analytics dashboards and hidden reference events remain open. Full reference account access is not yet authorized. Build coverage inside the app lists these gaps.

## Safety and limits
New recordings are private. Review all captured screens before sharing. Cuts are playback edits, not secure redaction. Text-node masking is not dynamic element or pixel-video redaction. Do not use for sensitive customer data before security review. Cross-origin frames, canvas and external assets may replay differently. DOM timeline export is not MP4 export. Maximum upload 18 MB. Prototype KV storage is not transactional and is not ready for concurrent multi-user edits. Device tokens give owner-level access for 30 days.

## Run and test
`npm ci`, `npm test`, `npm run build`, `npx playwright install chromium`, `node scripts/test-ui.mjs`.

UI and API tests use only synthetic content. No private footage is captured. Tests cover auth, replay, timeline controls, text search, redaction, public sanitization, share revocation and deletion. A headless Chrome extension acceptance test also passed start, real rrweb capture, masked input events, private upload and replay, using synthetic data only. The actual user-device install, permission popup and reload/multi-tab cases still need acceptance testing.

## Deploy
Cloudflare Worker with static assets, dedicated KV and optional AI binding, all on existing free allowances. `PASSWORD_HASH` is the SHA-256 hash of the securely supplied owner password. The app is locked while this secret is absent. Never commit passwords/tokens. Build app assets, zip the extension directory into dist/extension.zip, push source to GitHub first, then deploy.
