# Story 01-05: Finalize Vite base path & npm scripts

> **Epic:** Project Foundation & Tooling
> **Size:** S
> **Status:** TODO

## Description

Set `base: '/'` in `vite.config.ts` to target the GitHub user-page deployment at `ckandrinirina.github.io`, and add an inline comment documenting the project-page alternative (`'/<repo-name>/'`). Ensure all five canonical npm scripts are present in `package.json` with the exact commands specified in `dev-guide.md`: `dev`, `build` (as `tsc -b && vite build`), `preview`, `test`, `lint`, and `format`. Verify the production build emits correct asset URLs and that `npm run preview` serves it without errors.

## Acceptance Criteria

- [ ] `vite.config.ts` contains `base: '/'` inside the `defineConfig({...})` call.
- [ ] `vite.config.ts` includes an inline comment near the `base` setting explaining: user page (`ckandrinirina.github.io`) uses `'/'`; project page (e.g. `/ck-portfolio/`) uses `'/<repo-name>/'`.
- [ ] `package.json` `scripts.build` is exactly `"tsc -b && vite build"`.
- [ ] `package.json` `scripts.dev` is exactly `"vite"`.
- [ ] `package.json` `scripts.preview` is exactly `"vite preview"`.
- [ ] `package.json` `scripts.test` is `"vitest"` (may already be set by story 01-04).
- [ ] `package.json` `scripts.lint` is `"eslint ."` (may already be set by story 01-03).
- [ ] `package.json` `scripts.format` is `"prettier --write ."` (may already be set by story 01-03).
- [ ] `npm run build` completes without errors and emits a `dist/` directory.
- [ ] All static asset URLs in the generated `dist/index.html` and manifest are rooted at `/` (e.g. `/assets/main-[hash].js`, not `assets/main-[hash].js` without the leading slash and not `/ck-portfolio/assets/...`).
- [ ] `npm run preview` starts a local server and the built app loads without 404s for any asset (verified by opening the preview URL in a browser or `curl`-ing the HTML and confirming asset `src`/`href` values).
- [ ] `import.meta.env.BASE_URL` evaluates to `'/'` at runtime in the preview build (can be verified by a temporary `console.log(import.meta.env.BASE_URL)` in `src/main.tsx` — remove before committing).

### Edge Cases

- If `base` is missing from `vite.config.ts`, Vite defaults to `'/'` but this is implicit and undocumented; the setting must be explicit so future maintainers can safely change it.
- Changing `base` from `'/'` to a repo path (for a project-page migration) must update asset references in `public/` that use absolute paths (e.g. OG image, CV PDF) — the comment should hint at this concern.
- `tsc -b` (project references build) is used rather than plain `tsc` because the scaffold generates a `tsconfig.node.json` reference; running `tsc` without `-b` may miss config file validation errors.
- If `npm run build` fails at the `tsc -b` step with type errors in `vite.config.ts` (e.g. from the Vitest `test` block added in 01-04), ensure `tsconfig.node.json` includes the correct `include` paths and that `vitest` types are available.

## Technical Notes

- The complete `vite.config.ts` shape at the end of this epic (combining 01-01, 01-02, and 01-05):
  ```ts
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    // User page (ckandrinirina.github.io) → '/'.
    // Project repo (e.g. /ck-portfolio/) → '/ck-portfolio/'.
    base: '/',
    plugins: [react(), tailwindcss()],
  })
  ```
- If Vitest config is defined in `vite.config.ts` (see story 01-04), the `test` block is added here as well; the `base` setting does not affect Vitest runs.
- Downstream stories (e.g. the `DownloadCvButton` in epic 04) must reference the CV PDF as `` `${import.meta.env.BASE_URL}cv/erick-andrinirina-cv.pdf` `` to correctly resolve under any base path. This story sets the contract; later stories consume it.
- `npm run build` runs `tsc -b` (type-check all references) then `vite build` (bundle). This ensures type errors are caught before the bundler runs. The two commands are chained with `&&` so a type error aborts the build.

## Files to Create/Modify

| Action | File Path | Purpose |
|--------|-----------|---------|
| MODIFY | `vite.config.ts` | Add explicit `base: '/'` with deployment comment |
| MODIFY | `package.json` | Ensure all 6 canonical scripts are set with exact commands |

## Dependencies

- **Blocked by:** 01-01
- **Blocks:** 08-01

## Related

- **Epic:** 01_foundation-tooling
- **Related stories:** 01-01, 01-02, 01-04
- **Spec reference:** configuration.md §vite.config, configuration.md (Configuration matrix), dev-guide.md §4 Build, dev-guide.md §npm scripts
