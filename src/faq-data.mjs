export const faqItems=[
  {
    "id": "1",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What AI models power Handover's backend intelligence?",
    "answer": "Handover uses a shared free AI service for supported text questions and step drafts. Exact captured-text search also works without an AI answer. We do not claim the same AI setup or capabilities as another product."
  },
  {
    "id": "2",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What data streams are processed and indexed by Handover's AI?",
    "answer": "Browser walkthrough search uses sanitized captured DOM text, navigation and interaction events. Screen videos use creator-supplied transcript or notes. Timestamp comments are searchable privately. Server transcription, OCR and video-frame reasoning are not released."
  },
  {
    "id": "3",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "How does Handover's Visual Indexing work without consuming massive bandwidth?",
    "answer": "Handover searches captured page-text events rather than continuously analyzing video pixels. Targeted screenshot reasoning and full visual indexing are not available yet."
  },
  {
    "id": "4",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "Give an example of a query that ONLY visual/DOM indexing can answer (where transcripts fail).",
    "answer": "A silent DOM walkthrough can capture the text of an Invite teammate button. Search can find that captured label and its timestamp even when nobody says it aloud. It cannot infer fields that were not captured."
  },
  {
    "id": "5",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "Give an example of a query where speech transcripts are essential.",
    "answer": "A spoken explanation of why a setting was chosen is useful only when that explanation is in saved transcript or notes. Handover does not automatically understand audio from every video."
  },
  {
    "id": "6",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "How does Handover handle recordings with zero audio or speech?",
    "answer": "Silent DOM walkthroughs remain searchable through captured page text. A silent pixel-only video needs saved notes or a transcript for text search; its pixels are not indexed."
  },
  {
    "id": "7",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What UI components and elements can Handover's AI understand?",
    "answer": "Search can use captured text such as headings, button labels and DOM changes. It does not guarantee understanding charts, diagrams, canvas contents, cross-origin frames or unlabeled graphics."
  },
  {
    "id": "8",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "Can Handover detect and understand sequential workflows?",
    "answer": "Saved manual steps and AI step drafts can describe supported sequences. AI drafts must be reviewed against the recording. We do not publish a measured sequence-recognition accuracy score."
  },
  {
    "id": "9",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "Can the AI answer questions about the state of the web application at a specific second?",
    "answer": "Search results point to captured moments. Open the timestamp and inspect the replay. Handover does not promise a complete reconstructed description of every UI state at any arbitrary second."
  },
  {
    "id": "10",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "How accurate are Handover's timestamp references in AI search?",
    "answer": "Results use timestamps from captured events or creator notes. We have not measured a general accuracy percentage. Repeated labels can produce several candidates, so review the actual replay."
  },
  {
    "id": "11",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What happens when the AI cannot find an answer?",
    "answer": "When no evidence matches, Handover says it could not verify an answer. It does not claim the missing action occurred. If AI is unavailable, supported exact text search can still return evidence."
  },
  {
    "id": "12",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What causes AI hallucinations and how does Handover mitigate them?",
    "answer": "AI can be wrong, especially with vague questions or repeated text. Answers are grounded in retrieved evidence and checked for unsupported timestamp citations, but you should inspect the cited moments before acting."
  },
  {
    "id": "13",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "How should users formulate questions to get the most accurate answers from Handover?",
    "answer": "Use a distinctive button label, screen name, error phrase or specific action shown in the recording. Narrow a broad question and check the linked timestamp."
  },
  {
    "id": "14",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "Does the AI assistant maintain conversational context for follow-up questions?",
    "answer": "The recording question panel sends a short recent conversation history with follow-up questions. Workspace questions do not promise full cross-session chat memory."
  },
  {
    "id": "15",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What are the known AI limitations in the current version?",
    "answer": "Video pixels, OCR, automatic server transcription, image reasoning, automatic bug detection and guaranteed full-workflow understanding are not released. Shared AI quota and captured evidence also limit answers."
  },
  {
    "id": "16",
    "category": "AI Architecture, Visual Indexing & Search Engine",
    "question": "What languages are supported by the AI today and what is planned?",
    "answer": "Exact word search supports Unicode text, including Hindi. This is not automatic translation. Reliable language-specific AI answering and multilingual transcript translation have not been verified across languages."
  },
  {
    "id": "17",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover search and answer queries across multiple videos simultaneously?",
    "answer": "Workspace questions can retrieve text evidence across the account's recordings. Screen videos contribute saved transcript or notes, not visual pixels. This is not full multi-video visual understanding."
  },
  {
    "id": "18",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover compare two different recordings?",
    "answer": "A dedicated recording-comparison feature is not released. You can inspect the recordings separately and compare their saved steps or notes manually."
  },
  {
    "id": "19",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover automatically generate written documentation from a video?",
    "answer": "You can create an editable private guide from saved walkthrough steps. It copies step titles, instructions and recording references. It is a draft, not automatic complete documentation generated from video pixels."
  },
  {
    "id": "20",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "What will Handover's auto-generated documentation contain?",
    "answer": "Current guide drafts contain saved step titles, editable instructions, recording references and their timestamps. You can add sections and web links. Automatic screenshots and complete technical documentation are not promised."
  },
  {
    "id": "21",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "What export formats will be supported for generated documentation?",
    "answer": "Private guides can be read and edited in the workspace. Reviewed public guide snapshots are available. Dedicated PDF, Word and Markdown exports are not released."
  },
  {
    "id": "22",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Will users be able to edit AI-generated documentation?",
    "answer": "Yes. Guide titles, descriptions, section instructions, recording selection and links are editable. Review AI-drafted steps before converting them into a guide."
  },
  {
    "id": "23",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can documentation be generated or regenerated after a video is edited?",
    "answer": "Creating a guide makes a separate draft from the currently saved steps. Later recording changes do not silently overwrite an existing guide; review and update that guide yourself."
  },
  {
    "id": "24",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover answer \"How do I perform X?\" in addition to \"Where is X located?\"",
    "answer": "The AI can give supported instructions from captured evidence and cite moments. It cannot verify steps that were not recorded or infer the success of an unseen action."
  },
  {
    "id": "25",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover summarize an entire video?",
    "answer": "Broad summaries can use available captured text, subject to evidence and AI limits. They are not guaranteed complete summaries of all frames or audio."
  },
  {
    "id": "26",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover automatically extract a list of all features shown in a video?",
    "answer": "A dedicated exhaustive feature-extraction tool is not released. AI step drafts may help organize captured evidence but should not be treated as a complete feature inventory."
  },
  {
    "id": "27",
    "category": "AI Capabilities, Multi-Video Search & Documentation Roadmap",
    "question": "Can Handover automatically detect UI bugs or anomalies during recording?",
    "answer": "No automatic UI bug or anomaly detector is connected. Record the problem and add timestamp or DOM-element notes. Console/network telemetry collection is not enabled."
  },
  {
    "id": "28",
    "category": "Bug Reporting, Developer Tooling & MCP Integration",
    "question": "How does Handover improve technical bug reporting compared to screenshots or Slack?",
    "answer": "A browser walkthrough can preserve the visible sequence and timestamp notes, with optional notes pinned to captured DOM elements. It complements a ticket but does not automatically collect every diagnostic signal."
  },
  {
    "id": "29",
    "category": "Bug Reporting, Developer Tooling & MCP Integration",
    "question": "What technical diagnostic data will Handover capture for developers?",
    "answer": "Console logs, HTTP payloads, failed-request traces and runtime telemetry are not collected by the current build. Any future diagnostic capture needs a defined privacy and access scope before it is enabled."
  },
  {
    "id": "30",
    "category": "Bug Reporting, Developer Tooling & MCP Integration",
    "question": "What is Handover's MCP (Model Context Protocol) Server integration?",
    "answer": "Handover has a live read-only MCP endpoint. Create an expiring grant for explicitly selected sanitized text and timestamps in Coding agents. No raw media, private notes or automatic fixes are included. External client connection is manual and has not been end-to-end verified. Redaction or transcript changes revoke access and pause new grants. DOM evidence can be reviewed and safely rebuilt in Coding agents; old tokens stay revoked. Edited-video evidence is still excluded."
  },
  {
    "id": "31",
    "category": "Bug Reporting, Developer Tooling & MCP Integration",
    "question": "How do developers collaborate with QA and PMs on reported bugs inside Handover?",
    "answer": "The creator can add timestamp and DOM-element notes in a private recording. Team invitations, shared workspace roles, viewer replies and issue-resolution status are not released."
  },
  {
    "id": "32",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What is the origin story of Handover and what specific problem triggered its creation?",
    "answer": "Handover is being built to make product workflows easier to record, revisit and hand over. We do not publish another company's founder story or claim it as our own."
  },
  {
    "id": "33",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "How did the agency handle handovers and bug reports before building Handover?",
    "answer": "We have not published a verified Handover agency history. Current workflows combine private recordings, saved notes, guides and optional reviewed viewer links."
  },
  {
    "id": "34",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What were the specific shortcomings of Loom for client handovers?",
    "answer": "Flat videos can require manual scrubbing to find an action. Handover adds captured-text search for DOM walkthroughs. This describes a workflow difference, not a claim that Loom lacks all search or handover features."
  },
  {
    "id": "35",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What were the specific shortcomings of Google Drive?",
    "answer": "A file folder alone does not provide Handover's timestamped DOM replay and captured-text search. Google Drive remains useful for storing and sharing files; Handover does not replace all its functions."
  },
  {
    "id": "36",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "Why wasn't written documentation alone sufficient to solve the problem?",
    "answer": "Written instructions can lose the timing and visual sequence of a UI workflow. Recordings and editable guides can complement documentation, but clear written context is still useful."
  },
  {
    "id": "37",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What was the original technical concept of Handover before the AI search was introduced?",
    "answer": "We have not published a separate historical technical concept for Handover. The current build combines screen video, DOM walkthroughs, notes and private organization."
  },
  {
    "id": "38",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "When and how did the \"Talk to the Video\" AI search feature emerge?",
    "answer": "We have not published a dated origin story for this feature. Current recording questions use captured text or saved notes with timestamp evidence."
  },
  {
    "id": "39",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What user behaviors and inefficiencies does Handover eliminate?",
    "answer": "Handover aims to reduce repeated explanations and manual searching through walkthroughs. It cannot guarantee eliminating follow-up questions or all handover work."
  },
  {
    "id": "40",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What are the primary and secondary problems Handover solves?",
    "answer": "The main goal is clearer product handovers. Searchable captured moments, notes and guides also support onboarding and QA explanations within current feature limits."
  },
  {
    "id": "41",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What problem does Handover deliberately choose NOT to solve?",
    "answer": "Handover is not a replacement for an issue tracker, code repository, production monitoring system or live support process. It does not automatically fix code."
  },
  {
    "id": "42",
    "category": "Company Origin, Problem & Founder Insights",
    "question": "What is the fundamental insight behind Handover that competitors miss?",
    "answer": "A recording can be useful as a set of searchable moments rather than only a linear video. That is the product idea, not a claim that no other tool offers it."
  },
  {
    "id": "43",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "What video editing functionality is available today?",
    "answer": "Screen videos support start/end trim, multiple middle cuts and genuine fixed-region blur saved to edited WebM playback at the same share link. Original media remains private. DOM editing supports skip ranges, cursor visibility and selected text-node redaction. Moving-object tracking and exported AI narration are not released."
  },
  {
    "id": "44",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "When does trimming occur in the workflow?",
    "answer": "After a screen video is saved, open Edit timeline and Save trimmed and blurred video. Select the retained range, optional middle cuts and a fixed blur region, then save and verify playback. DOM skip ranges are saved in its timeline editor."
  },
  {
    "id": "45",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Can users make multiple cuts and delete sections from the middle of a video?",
    "answer": "Yes. Screen-video editing can remove multiple middle ranges and encode a new edited file. Original bytes remain private. DOM timelines separately support skip ranges during replay."
  },
  {
    "id": "46",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Is editing destructive, or are original raw recordings preserved?",
    "answer": "Original video and raw DOM events are retained privately. Edited playback is a separate asset. Current limits allow five saved video edit versions; original retention is not a guarantee of unlimited backups."
  },
  {
    "id": "47",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "What happens when a user edits an already published video?",
    "answer": "Saving a screen-video edit updates published playback at the same active viewer link through a consistent publication check. Missing or unverified edited content fails closed rather than serving the original. Previously viewed or downloaded copies cannot be recalled. DOM public replay uses the current published sanitized snapshot."
  },
  {
    "id": "48",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Does editing trigger AI re-indexing?",
    "answer": "Text search reads sanitized current DOM events and excludes cut ranges when answering. This is not a claim of full video re-indexing or automatic visual analysis."
  },
  {
    "id": "49",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "How does Handover's element-level masking (redaction) work?",
    "answer": "DOM masks remove selected captured text identities from sanitized replay and search. Screen-video blur is separately encoded into a fixed region of the exported frames. Neither is automatic moving-element tracking."
  },
  {
    "id": "50",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Can a single mask obscure an element across multiple screens?",
    "answer": "A selected captured node identity is redacted wherever that same identity appears. Newly created nodes or content in a different page may have different identities and need separate review."
  },
  {
    "id": "51",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Is redaction permanent or reversible?",
    "answer": "DOM redaction can be restored by the creator because raw source stays private. A downloaded or previously viewed copy cannot be recalled. This is not permanent removal from the original recording."
  },
  {
    "id": "52",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "Can redactions be applied to specific timestamps or elements?",
    "answer": "DOM masks target captured text nodes. Screen-video blur targets a fixed percentage-based rectangle throughout the selected export. It does not follow moving objects or support a per-timestamp animated mask."
  },
  {
    "id": "53",
    "category": "Editing, Non-Destructive Storage & Element-Level Masking",
    "question": "What is the fundamental difference between Trimming and Masking in Handover?",
    "answer": "Trimming removes time intervals from exported screen-video playback or skips DOM replay intervals. Masking hides selected DOM text or blurs a fixed video region. Original private source remains unchanged."
  },
  {
    "id": "54",
    "category": "Pricing, Plans & Workspace Administration",
    "question": "What are Handover's pricing tiers and plan structures?",
    "answer": "The free beta is available. Planned Pro is ₹799 per seat/month and Ultimate is ₹7,299/month flat. Paid plans are coming soon; displayed future allowances are not active. Current beta limits are 20 recordings, 12 MB per video and 18 MB per DOM timeline."
  },
  {
    "id": "55",
    "category": "Pricing, Plans & Workspace Administration",
    "question": "What is the billing model?",
    "answer": "Pro is displayed as a monthly per-seat plan; Ultimate is monthly flat pricing. No annual option or checkout is active. No subscription, payment or paid entitlement is created from this site today."
  },
  {
    "id": "56",
    "category": "Pricing, Plans & Workspace Administration",
    "question": "How do project folders and workspace permissions function?",
    "answer": "Folders and projects organize recordings within one private account workspace. Guides contain sections, instructions and recording references. Team permission controls are not released."
  },
  {
    "id": "57",
    "category": "Pricing, Plans & Workspace Administration",
    "question": "Can team members delete recordings?",
    "answer": "There are no shared team roles yet. Saved screen-video deletion is not offered in the free plan. Existing DOM walkthrough deletion remains separate and requires creator action."
  },
  {
    "id": "58",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What is Handover in one sentence?",
    "answer": "Handover is a browser-based workspace for recording, reviewing and finding product walkthrough context."
  },
  {
    "id": "59",
    "category": "Product Definition, Core Value & Positioning",
    "question": "Complete the value proposition: \"Handover allows you to...\"",
    "answer": "Handover allows you to capture a workflow, save context, find captured moments and choose when to share a reviewed recording."
  },
  {
    "id": "60",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What category does Handover belong to?",
    "answer": "Handover is a walkthrough and handover workspace with screen recording and captured-text search. It is still a beta, not complete reference-product parity."
  },
  {
    "id": "61",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What tools does Handover replace?",
    "answer": "It can reduce some ad-hoc explanation videos and scattered workflow notes. It is not a complete replacement for documentation, file storage, issue tracking or meetings."
  },
  {
    "id": "62",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What tools does Handover complement rather than replace?",
    "answer": "It complements code repositories, issue trackers, team chat and documentation. You can manually add a reviewed recording link to those workflows; direct integrations are not implied."
  },
  {
    "id": "63",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What would you never position Handover as?",
    "answer": "We would not position Handover as an autonomous coding agent, a full desktop monitoring tool, a complete video editor or a guaranteed secure place to record unreviewed secrets."
  },
  {
    "id": "64",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What is the simplest workflow Handover enables?",
    "answer": "Record or import a walkthrough, review it, save notes, then explicitly create a viewer link if you want to share it. New recordings start private."
  },
  {
    "id": "65",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What is the most powerful workflow Handover enables?",
    "answer": "Use a DOM walkthrough with saved steps, notes and private guides, then search captured text and jump to its timestamp. Available evidence and free quota limit what AI can answer."
  },
  {
    "id": "66",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What single feature immediately differentiates Handover from Loom?",
    "answer": "Captured DOM text can make silent browser actions searchable rather than relying only on spoken narration. This is a description of Handover's current approach, not a complete product comparison."
  },
  {
    "id": "67",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What feature makes users say \"I actually need this\"?",
    "answer": "The intended useful moment is finding an exact recorded screen or instruction without watching the entire walkthrough. We do not invent customer quotes or claim measured user reactions."
  },
  {
    "id": "68",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What feature is easiest for users to understand immediately?",
    "answer": "Recording a workflow and replaying it is the simplest visible feature. Timestamp notes and explicit viewer links build on that basic flow."
  },
  {
    "id": "69",
    "category": "Product Definition, Core Value & Positioning",
    "question": "What aspect of Handover is most difficult to explain to customers?",
    "answer": "The main distinction is DOM context versus pixel video: captured text is searchable, while a screen video's pixels are not automatically understood. These are different recording types with different limits."
  },
  {
    "id": "70",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "What publishing and sharing modes exist in Handover?",
    "answer": "Recordings start private. The creator can explicitly create a public viewer link and embed code, then revoke it. Reviewed public guide snapshots can be published and revoked explicitly. Public collections and shared-team workspaces are not released."
  },
  {
    "id": "71",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "Can someone view and interact with a public Handover video without an account?",
    "answer": "Anyone with an active public recording link can open the viewer without an account. Review its contents first. Viewer commenting and shared-team permissions are not released."
  },
  {
    "id": "72",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "What does \"Private\" mean in Handover?",
    "answer": "Private means the recording is behind its account sign-in and is not available through a public viewer link until the creator enables one. It is not a promise that downloaded copies can be controlled."
  },
  {
    "id": "73",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "Can access permissions be revoked after sharing a link?",
    "answer": "Yes. Revoke the recording's viewer link in Share / embed. That stops future access through that link, but cannot retract copies or information already obtained by a viewer."
  },
  {
    "id": "74",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "What workspace roles and permissions are supported?",
    "answer": "Current beta accounts have separate private libraries. Admin/Creator/Viewer team roles and team invitations are not released. Planned pricing descriptions do not activate those roles."
  },
  {
    "id": "75",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "Can viewers download the video files?",
    "answer": "The creator can download their original recording. Anyone allowed to watch a public video may still be able to save accessible media; do not treat the lack of a download button as copy protection."
  },
  {
    "id": "76",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "Will creators be able to prevent viewers from downloading videos?",
    "answer": "Download prevention and DRM controls are not released. No browser-based viewer can guarantee viewers never copy visible or playable information."
  },
  {
    "id": "77",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "Are public Handover links indexed by search engines?",
    "answer": "The site and viewer responses request no indexing. That is not an access-control guarantee. Anyone with an active link can access the recording; use revocation and careful sharing."
  },
  {
    "id": "78",
    "category": "Publishing, Sharing, Access Control & Privacy",
    "question": "How are viewer analytics and engagement metrics tracked?",
    "answer": "Only a basic public open count exists. Detailed watch time, engagement, query analytics and a reporting dashboard are not released. Counts are not guaranteed unique-viewer measurements."
  },
  {
    "id": "79",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What happens immediately after a user signs up for Handover?",
    "answer": "Email/password signup opens an individual beta workspace. Google sign-in, email verification and password reset are not live in the current production flow."
  },
  {
    "id": "80",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Is there an onboarding wizard before recording?",
    "answer": "There is no mandatory onboarding wizard. After sign-in, use Record or the walkthrough recorder setup. Review current recording limits and privacy guidance first."
  },
  {
    "id": "81",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Can a user record without installing the Chrome extension?",
    "answer": "Yes, supported desktop browsers can capture screen video directly. Searchable DOM walkthrough capture uses the companion Chrome extension. Mobile screen capture is not supported."
  },
  {
    "id": "82",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What browsers are officially supported today, and what is on the roadmap?",
    "answer": "The DOM extension targets desktop Chrome. Screen capture relies on browser support and permissions. Full Safari, Firefox, mobile and real-device acceptance has not been completed."
  },
  {
    "id": "83",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What elements can Handover record today?",
    "answer": "DOM capture records supported page snapshots, text, interactions, scrolling and navigation. Screen capture records pixels from the selected surface. Browser-protected UI and cross-origin content can have limits."
  },
  {
    "id": "84",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "How does Handover handle multi-tab recording and tab switching?",
    "answer": "The extension is scoped to the originally selected tab and rejects unsupported tab switching. Multi-tab DOM capture is not released. A screen-video capture continues according to the surface selected in the browser chooser."
  },
  {
    "id": "85",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Can a user switch between different browser applications (e.g., Chrome to Safari) during one recording?",
    "answer": "DOM recording does not follow activity into another browser application. A selected full-screen video capture may include other visible apps, so review what appears. This is not cross-browser structured event capture."
  },
  {
    "id": "86",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What happens if the user refreshes the page or navigates to a new URL during recording?",
    "answer": "The extension is designed around its original tab, with navigation/error checks. Direct screen capture belongs to its open recording page; refreshing it can interrupt capture. Optional device recovery is best-effort, not a continuity guarantee."
  },
  {
    "id": "87",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What happens if the web application crashes during recording?",
    "answer": "Unsaved footage can be lost. Optional device recovery can retain already-written chunks, but the last seconds may be missing and browser storage can be evicted. Keep a downloaded backup when possible."
  },
  {
    "id": "88",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "What happens if the internet connection drops during recording?",
    "answer": "A failed upload keeps the pending recording available for retry and backup download while the page remains open. Retry uses the same upload identity and verifies saved content before clearing it. Recovery is optional, not guaranteed."
  },
  {
    "id": "89",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Is recording data stored locally first or streamed during recording?",
    "answer": "Direct capture initially holds chunks in the browser. An unchecked-by-default option can store an unfinished recording on this device until verified upload, discard or sign-out. Normal save uploads it privately to the service."
  },
  {
    "id": "90",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Are there limits on recording duration, file size, or number of recordings?",
    "answer": "Current beta limits are 20 recordings per workspace, 12 MB per screen video and 18 MB per DOM timeline. There is no unlimited storage promise. Planned paid-plan minute allowances are not active today."
  },
  {
    "id": "91",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Can users pause, resume, or cancel a recording?",
    "answer": "The current capture flow supports stopping to save or explicitly discarding. Pause/resume capture is not released. A pending recording can be reviewed, downloaded as backup or retried."
  },
  {
    "id": "92",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "How do microphone permissions and audio inputs work?",
    "answer": "The browser asks for screen access and, if selected, microphone permission. Permission denial stops the affected capture flow. Optional speech recognition is browser-dependent and its draft must be reviewed."
  },
  {
    "id": "93",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Can users record silently without microphone audio?",
    "answer": "Yes. Microphone is optional. Silent DOM capture remains searchable through page text; a silent screen video needs saved notes for text questions."
  },
  {
    "id": "94",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Can Handover record system audio without microphone audio?",
    "answer": "Tab or system audio depends on the browser and selected capture surface. It is not guaranteed. When microphone is selected, do not assume microphone and system audio are both mixed; check the saved result."
  },
  {
    "id": "95",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "How does Handover handle embedded videos, iframes, and PDFs inside a webpage?",
    "answer": "A screen video can show visible pixels, subject to browser restrictions. DOM capture cannot reliably inspect cross-origin iframe, embedded-video or PDF internals. PDF/document uploads and visual indexing are not released."
  },
  {
    "id": "96",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Are browser pop-ups, password fields, and notifications recorded?",
    "answer": "Screen video may include visible notifications or sensitive text. DOM inputs are masked by default, but that is not a guarantee that every secret elsewhere on the page is hidden. Avoid capturing secrets and review before sharing."
  },
  {
    "id": "97",
    "category": "Recording Capabilities, Mechanics & Boundaries",
    "question": "Why is Handover strictly browser-only rather than full desktop?",
    "answer": "Handover runs in the browser. Its DOM walkthrough feature is browser-specific; direct screen capture can use supported selected surfaces. No native desktop app or full-desktop structured event tracker is released."
  },
  {
    "id": "98",
    "category": "Security, Data Handling & Failure Edge Cases",
    "question": "How is user and recording data secured?",
    "answer": "Accounts require sign-in and private data is scoped to the account. Public access uses an explicit revocable viewer link. We do not claim an independent security audit, compliance certification or guaranteed protection for unreviewed sensitive recordings."
  },
  {
    "id": "99",
    "category": "Security, Data Handling & Failure Edge Cases",
    "question": "How are Chrome extension permissions scoped?",
    "answer": "The extension uses active-tab, scripting, tabs and local storage permissions, plus optional site access for the Studio connection. It captures the selected tab only after recording is started. Review Chrome's permission prompt and the extension source before installing."
  },
  {
    "id": "100",
    "category": "Security, Data Handling & Failure Edge Cases",
    "question": "What happens if a recording or server processing fails?",
    "answer": "A failed save should leave retry/backup options. Upload retries reuse an identity and verify stored content before clearing the pending copy. Keep a downloaded backup because browser recovery and free beta storage are not infallible."
  },
  {
    "id": "101",
    "category": "Security, Data Handling & Failure Edge Cases",
    "question": "Can redacted information ever be inspected or recovered by unauthorized viewers?",
    "answer": "Public screen-video requests check the current publication state and verify the published asset; missing state or bytes fails closed without an original fallback. DOM replay sanitizes selected text. Unmasked content, sensitive audio and previously retrieved copies may still expose information. Review the result; this is not an independent security certification."
  },
  {
    "id": "102",
    "category": "Security, Data Handling & Failure Edge Cases",
    "question": "What is the long-term future vision for Handover?",
    "answer": "Further work includes exported narration, stronger team/document workflows, larger recordings and richer media understanding. Read-only selected-recording MCP setup and trim/cut/fixed blur are live. Roadmap items are not delivery guarantees."
  },
  {
    "id": "103",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "Who is Handover fundamentally built for?",
    "answer": "Handover is intended for people explaining product workflows, including agencies, product teams, QA and client-facing teams. Current account and recording limits still apply."
  },
  {
    "id": "104",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "Who are the primary user personas within a tech agency?",
    "answer": "QA testers, developers, product managers and people handing work to clients can create walkthroughs or use reviewed recordings as context. Shared role-based team workflows are not released."
  },
  {
    "id": "105",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "Who are secondary and emerging personas that can get value from Handover?",
    "answer": "Onboarding, support, internal training and product documentation can benefit from clear recorded workflows. Suitability depends on privacy needs and current beta limitations."
  },
  {
    "id": "106",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "Who records the video versus who watches/searches the video?",
    "answer": "The signed-in creator records and reviews the content. A viewer can watch an explicitly enabled public link without an account. Team collaboration and viewer comments are not available yet."
  },
  {
    "id": "107",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "What is the exact step-by-step workflow for QA Bug Reporting in Handover?",
    "answer": "Record the reproducible flow, add timestamp or DOM-element notes, review and redact sensitive content, then manually add an approved viewer link to your ticket. Selected sanitized text can also be granted through read-only MCP. Automatic logs/network capture and automatic code fixes are not connected."
  },
  {
    "id": "108",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "What is the exact step-by-step workflow for Client Project Handover?",
    "answer": "Record a focused workflow, review its contents, save clear steps and create a private guide if useful. Explicitly enable and send a viewer link when ready. Public guide hubs and client-specific permission roles are not released."
  },
  {
    "id": "109",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "How does Handover adapt to different agency team sizes?",
    "answer": "Private projects, folders and guides can organize an individual's recordings. Shared workspaces and seat-based administration are planned but not enabled. Planned tiers do not change current free beta limits."
  },
  {
    "id": "110",
    "category": "Target Personas, Use Cases & Workflows",
    "question": "What feedback has Handover received from its initial 10–15 early users?",
    "answer": "We have not published verified early-user counts, quotes or results for Handover. Illustrative use cases on the landing page are not customer testimonials."
  }
];
