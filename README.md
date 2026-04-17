# Pneumitecture

**Capstone project 2026 · New York University Abu Dhabi**

A long-scroll Next.js site for a responsive pneumatic installation: hero media, design process, interactive system schematic, prototyping timeline, behavior videos, pavilion vision, and a media archive.

## Stack

- **Next.js** 16 (App Router) with **static export** (`output: "export"`)
- **React** 19, **TypeScript**
- **Tailwind CSS** v4, **Framer Motion**
- Optional **Three.js** / R3F where 3D is used

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command               | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Local development server                     |
| `npm run build`       | Production build → static output in `out/`   |
| `npm run export:serve`| Serve `out/` after a build (smoke test)      |
| `npm run lint`        | ESLint                                       |

If `next build` fails with a stale type error after large refactors, delete `.next` and run `npm run build` again.

## Site structure & navigation

Section order and labels are centralized in:

- [`src/config/navigation.ts`](src/config/navigation.ts) — `SITE_SECTIONS` (ids, labels, mobile `shortLabel`s). Used by the top nav, fullscreen menu overlay, and related UI.

Smooth in-page jumps use:

- [`src/lib/scrollToSection.ts`](src/lib/scrollToSection.ts) — `scrollIntoView` with `behavior: "smooth"` (respects reduced motion).

The right-rail section dots are in:

- [`src/components/site/ScrollProgress.tsx`](src/components/site/ScrollProgress.tsx)

## Notable features (where to edit)

| Area | Main files |
| ---- | ---------- |
| **System schematic** (nodes, camera, zoom, layout) | [`src/config/systemSchematicControls.ts`](src/config/systemSchematicControls.ts), [`src/components/sections/SystemSection.tsx`](src/components/sections/SystemSection.tsx) |
| **Behavior** (dual videos, footer-style block) | [`src/components/sections/BehaviorSection.tsx`](src/components/sections/BehaviorSection.tsx) |
| **Media / archive** (filters, weekly blog links toggle) | [`src/components/pneumitecture/MediaArchive.jsx`](src/components/pneumitecture/MediaArchive.jsx) |
| **Fullscreen menu** | [`src/components/pneumitecture/NavOverlay.jsx`](src/components/pneumitecture/NavOverlay.jsx) |
| **Global styles** | [`src/app/globals.css`](src/app/globals.css) |

Long-scroll composition notes live in [`src/config/siteLayout.ts`](src/config/siteLayout.ts).

## GitHub Pages (static export)

The app is built for **static hosting** (no Node server). Pushes to **`main`** can deploy via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) to publish the `out/` folder.

### One-time GitHub setup

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch”).  
   If you ever used a branch before: switch to Actions, then **save**. The UI must **not** still show a branch + folder (e.g. `main` / `/ (root)`). While that is selected, GitHub serves your **repo files** (README, folders) — **not** the `out/` artifact from this workflow.
3. Push to **`main`** (or run **Actions → Deploy to GitHub Pages → Run workflow**). Wait for the **build** and **deploy** jobs to finish green.
4. Open the **site URL** shown under **Settings → Pages** (“Your site is live at …”), or the link in the workflow run **Summary** (added by the workflow).  
   Format: `https://<github-username>.github.io/<exact-repo-name>/`  
   **Do not** use the normal repo page `https://github.com/<user>/<repo>` — that page always includes the README below the file list.

The workflow sets **`BASE_PATH`** to `/<repository-name>` (from GitHub’s canonical repo name) so asset URLs match a **project** Pages URL.

**First deploy:** if Actions shows **“Waiting for approval”** for the `github-pages` environment, open the run → **Review deployments** → **Approve** so the site can publish.

### If the live site still looks like this README (or a file list)

The built app is **not** what Pages is serving. The export itself is valid (CI checks `out/index.html` contains Next assets).

1. Re-check **Settings → Pages → Source = GitHub Actions** only (no branch publish).
2. Use the **`*.github.io/<repo>/`** URL, not `github.com/.../blob/.../README.md`.
3. Open the latest **Deploy to GitHub Pages** run: the **Summary** tab shows the exact URL to try.
4. Hard-refresh or try a private window (old HTML cached rarely, but possible).

Official reference: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

This repo includes **`public/.nojekyll`** and the workflow runs **`touch out/.nojekyll`** so **Jekyll** on Pages does not process the upload.

### Optional: feature section video on Pages

Static hosting has no `/api` routes. For a looping feature video, add an Actions secret:

- **Name:** `NEXT_PUBLIC_FEATURE_VIDEO_SRC`
- **Value:** a direct MP4 URL, or a path under `public/` that includes the repo prefix on Pages (see existing docs in [`.env.example`](.env.example) if present).

Locally, mirror this in `.env.local`.

### Preview the static build locally

```powershell
$env:BASE_PATH="/Capstone-Pneumitecture"; npm run build; npm run export:serve
```

Use your real repo name in `BASE_PATH`. Open the URL `serve` prints (often `http://localhost:3000`).

### Custom domain at the site root

If the site is at `https://example.com/` with **no** `/repo` prefix, build with **no** `basePath`, then configure DNS and GitHub Pages custom domain per GitHub’s docs.

## Learn more

- [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages](https://docs.github.com/pages)
