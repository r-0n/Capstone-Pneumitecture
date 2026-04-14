/**
 * Prefix paths to files in `public/` when the app is built with `basePath`
 * (e.g. GitHub Pages at `/<repo>/`). Injected via `next.config` → `env.NEXT_PUBLIC_BASE_PATH`.
 */
const BASE =
  typeof process.env.NEXT_PUBLIC_BASE_PATH === "string"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export function publicAssetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) return path;
  if (!BASE) return path;
  if (path.startsWith(BASE + "/") || path === BASE) return path;
  return `${BASE}${path}`;
}
