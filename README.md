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
2. **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to **`main`**, open **Actions**, then use the **Pages** URL (typically `https://<user>.github.io/<repo>/`).

The workflow sets **`BASE_PATH`** to `/<repository-name>` so assets match a **project site** URL.

### If the live site looks like this README (or a file list)

That almost always means **GitHub Pages is not serving the Next.js build** from Actions.

1. **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**, not **Deploy from a branch**.  
   If Source is a branch (e.g. `main` / `/ (root)`), GitHub serves the **repository tree** (markdown, folders, etc.), not the contents of `out/` from the workflow.
2. Open the site using the **Pages URL** from **Settings → Pages** (or the `page_url` from the latest successful **Deploy to GitHub Pages** run), e.g. `https://<username>.github.io/<RepositoryName>/` — **not** the main GitHub **Code** tab for the repo (that tab shows the README by design).
3. Confirm the **Deploy to GitHub Pages** workflow on `main` completed with a green check; a failed build leaves the previous deployment (or nothing useful) in place.
4. This repo ships **`public/.nojekyll`** and the workflow runs **`touch out/.nojekyll`** so **Jekyll** on Pages does not rewrite or drop static assets.

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
