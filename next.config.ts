import type { NextConfig } from "next";

/**
 * GitHub Pages (project site): set BASE_PATH to `/<repo-name>` when building so assets resolve.
 * Local dev: leave BASE_PATH unset (defaults to site root).
 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
function normalizeBasePath(raw: string | undefined): string | undefined {
  if (raw == null) return undefined;
  const t = raw.trim();
  if (t === "" || t === "false" || t === "0") return undefined;
  const withLeading = t.startsWith("/") ? t : `/${t}`;
  const noTrailing = withLeading.replace(/\/+$/, "");
  return noTrailing === "" ? undefined : noTrailing;
}

const basePath = normalizeBasePath(process.env.BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
