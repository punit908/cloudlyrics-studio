# CloudLyric Studio — source review & launch-readiness notes

## What was packaged
- Original supplied 6,073-line React component preserved as `src/App.tsx`.
- Vite + React project scaffold added (`index.html`, `src/main.tsx`, Tailwind/PostCSS/Vite configs).
- Responsive viewport defaults and base mobile/landscape CSS added.
- No feature code was intentionally removed.

## Checks performed
- Source size: approximately 310 KB.
- TypeScript compiler transpile/TSX syntax pass: **0 syntax/transpile diagnostics**.
- Static scan found no `eval`, `new Function`, `document.write`, or `dangerouslySetInnerHTML` usage.
- Full dependency installation/build/browser QA could not be completed in this environment because `npm install` did not finish (network/package registry unavailable or timed out).

## Findings to address or verify before public launch

### High priority
1. **Export format is browser-dependent.** The renderer asks `MediaRecorder.isTypeSupported()` and may fall back to WebM. The UI/download extension is selected from the detected MIME type, so this is not guaranteed to produce MP4 in every browser. Test Chrome, Edge, Firefox and Safari; clearly explain WebM fallback or add a real MP4 transcoding path if MP4 must be guaranteed.
2. **Export is capped at 300 seconds.** `startLocalVideoRender` uses `Math.min(..., 300)`. Songs longer than five minutes will be cut off. Confirm this is intentional or remove the cap with a memory-safe strategy.
3. **ZIP import has no explicit archive-size / expanded-size / entry-count limits.** A very large or highly-compressed user-selected ZIP can consume substantial memory during parsing/decompression. Add limits and validate manifest paths, file sizes and allowed asset types before decoding.
4. **Audio/video export must be tested on real devices.** `captureStream`, `MediaRecorder`, `AudioContext`, `DecompressionStream('deflate-raw')`, `FontFace` and video frame timing differ by browser. No cross-browser runtime test was possible here.

### Medium priority
5. **IndexedDB availability is assumed.** Private browsing, storage restrictions or quota exhaustion can disable persistence. Some functions swallow errors; surface a clear user-facing warning and close database connections after transactions.
6. **Audio/video resource cleanup needs lifecycle testing.** Object URLs are revoked in several paths, but verify replacement/import/unmount/cancel flows for leaked media URLs and active audio contexts.
7. **Toast timeout is not cancelled on unmount or when a newer toast replaces it.** This is minor, but a managed timeout ref would prevent stale timer updates.
8. **ZIP MIME reconstruction uses generic MIME types** (`audio/mpeg`, `image/png`, `video/mp4` / `video/webm`). Preserve original MIME type in manifest for reliable restoration of WAV, WebM, WebP, etc.
9. **TypeScript typecheck currently reports typing issues** (including browser-specific `webkitAudioContext`, custom `HTMLVideoElement.__originOffset`, `MediaStreamTrack.requestFrame`, and inferred event/Promise types). Vite transpilation does not typecheck; a production build should be run after `npm install`, then types should be cleaned up separately.

## Responsive assessment
- The source already has a dedicated phone studio mode and switches to it below 768px / mobile user agents.
- The desktop workspace uses a fixed 80px navigation rail and a 320–384px inspector, so the centre preview becomes narrow on small laptop/tablet widths. Verify 768px, 820px, 1024px, 1280px and ultrawide widths.
- The phone UI is a separate layout, not simply a scaled desktop layout. Test all editing tabs, dialogs, timeline scrubbing, file selection and export on touch devices.
- This package includes baseline viewport, touch and landscape CSS, but does not claim complete visual QA across every device.

## Release checklist
- [ ] `npm install` completes successfully.
- [ ] `npm run build` completes and `dist/` is generated.
- [ ] Test fresh session, audio upload, lyrics paste, line sync, word sync, instrumental/outro, undo/redo.
- [ ] Test custom image/video background, overlay, custom font and project ZIP export/import.
- [ ] Test MP4/WebM behavior and audio-video sync in Chrome and Edge; test Safari if supporting iPhone/iPad.
- [ ] Test exports at 720p/1080p, 30/60 FPS, all aspect ratios and long songs.
- [ ] Test on 320px, 375px, 430px, 768px, 820px, 1024px, 1366px and 1920px viewports.
- [ ] Test storage quota failure, corrupted ZIP, oversized ZIP and unsupported media gracefully.
- [ ] Add a privacy notice explaining that uploads are processed locally and any external network requests (e.g. Google Fonts) are disclosed.

## Deployment
Vercel: Framework preset `Vite`, Build Command `npm run build`, Output Directory `dist`.
