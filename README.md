# Pneumitecture

Next.js capstone site — soft pneumatic installation, design process, and media.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages (static export)

This app is configured for **`output: 'export'`** so it can be hosted on **GitHub Pages** (no Node server). Every push to **`main`** runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) and redeploys the `out/` folder.

### One-time GitHub setup

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Merge or push to **`main`** and open the **Actions** tab; when the workflow finishes, follow the **Pages** URL (typically `https://<user>.github.io/<repo>/`).

The workflow sets **`BASE_PATH`** to `/<repository-name>` automatically so assets and routing match a **project site** URL.

### Optional: feature section video on Pages

Static hosting has **no** `/api` routes. To show the looping video (not only the poster image), add a repository **Actions secret**:

- Name: `NEXT_PUBLIC_FEATURE_VIDEO_SRC`
- Value: a **direct MP4 URL** (for example from [Pexels](https://www.pexels.com/) download / file link, or a file you commit under `public/` and reference as `/your-repo/videos/clip.mp4` with the same path rules as `basePath`).

Locally, you can set the same variable in `.env.local` (see [`.env.example`](.env.example)).

### Preview the static build locally

```powershell
$env:BASE_PATH="/Capstone-Pneumitecture"; npm run build; npm run export:serve
```

Use your real repo name in `BASE_PATH` (must match the segment in `https://user.github.io/repo/`). Then open the URL `serve` prints (usually `http://localhost:3000`).

### Custom domain at the site root

If the site is served at `https://example.com/` with **no** `/repo` prefix, you must build with **no** `basePath` and point Pages at your domain. Adjust the workflow’s **Set BASE_PATH** step (or set `BASE_PATH` empty in the build step) and follow GitHub’s custom domain DNS instructions under **Settings → Pages**.

## Scripts

| Command            | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Local development                            |
| `npm run build`    | Production static export → `out/`            |
| `npm run export:serve` | Serve `out/` after a build (smoke test) |

If `next build` fails with a stale type error after removing routes or changing `next.config`, delete the `.next` folder and run `npm run build` again.

## Continuous updates

Pushing to **`main`** triggers the Pages workflow (with **concurrency** so overlapping runs cancel instead of fighting). Iteration flow: edit locally → `npm run dev` → commit → push to `main` → wait for Actions → refresh the live site.

## Learn More

- [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages](https://docs.github.com/pages)
