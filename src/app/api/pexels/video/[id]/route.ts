import { NextResponse } from "next/server";

type PexelsVideoFile = {
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
};

type PexelsVideoResponse = {
  id: number;
  image: string;
  video_files: PexelsVideoFile[];
};

function pickMp4Src(files: PexelsVideoFile[]): string | null {
  const mp4 = files.filter((f) => f.file_type === "video/mp4" && f.quality !== "hls");
  if (mp4.length === 0) return null;

  const landscape = mp4.filter((f) => f.width >= f.height);
  const pool = landscape.length > 0 ? landscape : mp4;
  const hd = pool.filter((f) => f.quality === "hd");
  const ranked = (hd.length > 0 ? hd : pool).sort((a, b) => b.width - a.width);
  return ranked[0]?.link ?? null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "missing_pexels_api_key", hint: "Add PEXELS_API_KEY to .env.local (free at pexels.com/api)" },
      { status: 503 },
    );
  }

  const res = await fetch(`https://api.pexels.com/v1/videos/videos/${numericId}`, {
    headers: { Authorization: key },
    next: { revalidate: 86_400 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "pexels_request_failed", status: res.status },
      { status: 502 },
    );
  }

  const data = (await res.json()) as PexelsVideoResponse;
  const src = pickMp4Src(data.video_files ?? []);
  if (!src) {
    return NextResponse.json({ error: "no_mp4" }, { status: 404 });
  }

  return NextResponse.json({
    src,
    poster: data.image,
    pageUrl: `https://www.pexels.com/video/${numericId}/`,
  });
}
