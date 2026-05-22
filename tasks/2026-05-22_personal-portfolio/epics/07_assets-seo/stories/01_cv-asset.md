# Story 07-01: CV PDF asset + build presence check

> **Epic:** Assets, SEO & Social Sharing
> **Size:** S
> **Status:** TODO

## Description

Place the downloadable CV at `public/cv/erick-andrinirina-cv.pdf` by copying and renaming the existing French CV from `docs/CV_ANDRINIRINA_ERICK_FULLSTACK.pdf`. Add a lightweight build-time presence check (a prebuild npm script) so that a missing PDF causes the build to fail with a descriptive error rather than silently shipping a 404 download link. The `DownloadCvButton` component (story 04-08) references this asset via `import.meta.env.BASE_URL + 'cv/erick-andrinirina-cv.pdf'`, so the path must be stable.

## Acceptance Criteria

- [ ] `public/cv/erick-andrinirina-cv.pdf` is present in the repository and is binary-identical to `docs/CV_ANDRINIRINA_ERICK_FULLSTACK.pdf` (the French CV).
- [ ] A `prebuild` npm script is defined in `package.json` that runs before `npm run build`.
- [ ] When `public/cv/erick-andrinirina-cv.pdf` is present the prebuild script exits with code 0 and `npm run build` completes normally.
- [ ] When `public/cv/erick-andrinirina-cv.pdf` is absent the prebuild script exits with a non-zero code and prints a human-readable error message indicating which file is missing (e.g., `"ERROR: Missing required asset: public/cv/erick-andrinirina-cv.pdf"`); `npm run build` therefore fails.
- [ ] The check script requires no npm packages beyond the Node.js standard library (`fs`, `path`, `process`).
- [ ] Clicking the CV download button in a browser (with the dev server running) triggers a browser download of the PDF and the downloaded file opens as a valid, readable PDF.
- [ ] The `href` in `DownloadCvButton` is constructed as `import.meta.env.BASE_URL + 'cv/erick-andrinirina-cv.pdf'` (not a hardcoded absolute path) so it resolves correctly under both `base: '/'` and a project-page sub-path.

### Edge Cases

- **English CV out of scope:** The French PDF is served for both `fr` and `en` locales. The `DownloadCvButton` must not conditionally switch the path based on locale (a locale-based switch would yield a 404 for `en`). Document this limitation with a `// TODO: add EN CV when available` comment.
- **CI environment:** The presence check must pass in the GitHub Actions build environment where `docs/` is checked in but `public/cv/` only exists if the file was committed. Ensure `public/cv/erick-andrinirina-cv.pdf` is tracked by git (not gitignored).
- **Binary file size:** The PDF should not exceed a reasonable size for a resume (guidance: under 2 MB). If the source file is larger, note it as a manual optimization task; do not automate compression in this story.
- **`public/cv/` directory:** The `cv/` subdirectory inside `public/` must be created (Vite copies the entire `public/` tree into `dist/`); ensure the directory itself is committed (e.g., add a `.gitkeep` only if the PDF is not present at story-write time, which it will be).

## Technical Notes

- Copy the file: `cp docs/CV_ANDRINIRINA_ERICK_FULLSTACK.pdf public/cv/erick-andrinirina-cv.pdf` — this is a one-time manual step; the file is then committed to the repo under `public/cv/`.
- The presence check can be a small ESM script at `scripts/check-assets.mjs` using `fs.existsSync`. Invoke it from `package.json` as `"prebuild": "node scripts/check-assets.mjs"`.
- The `prebuild` lifecycle hook is automatically executed by npm before `build`; no changes to the CI workflow (`deploy.yml`) are needed because CI already runs `npm run build`.
- If additional assets need a presence check in later stories (07-02), they can be appended to the same `scripts/check-assets.mjs` file rather than creating separate scripts.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| CREATE | `public/cv/erick-andrinirina-cv.pdf` | Downloadable French CV (copied from `docs/CV_ANDRINIRINA_ERICK_FULLSTACK.pdf`) |
| CREATE | `scripts/check-assets.mjs` | Node.js presence-check script; exits non-zero with a descriptive error if required public assets are missing |
| MODIFY | `package.json` | Add `"prebuild": "node scripts/check-assets.mjs"` to the `scripts` block |

## Dependencies

- **Blocked by:** 01-01 (project scaffold — `package.json` and `public/` directory must exist)
- **Blocks:** None (supports Epic 09 Lighthouse audit indirectly via a working download link)

## Related

- **Epic:** 07_assets-seo
- **Related stories:** 04-08 (DownloadCvButton component consumes this asset), 07-02 (brand assets — the same check script can be extended), 09-xx (Lighthouse audit)
- **Spec reference:** data-flow.md §7 CV download + failure modes (missing CV PDF); pre-spec.md §6 CV download
