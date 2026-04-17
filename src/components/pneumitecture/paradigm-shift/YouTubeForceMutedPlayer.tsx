"use client";

import { useEffect, useId, useRef } from "react";

type YTPlayerInstance = {
  mute: () => void;
  setVolume: (v: number) => void;
  setPlaybackRate: (rate: number) => void;
  setPlaybackQuality: (quality: string) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    id: string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayerInstance }) => void;
        onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
      };
    },
  ) => YTPlayerInstance;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const QUEUE_KEY = "__ytForceMuteQueue" as const;

function runWhenYTReady(cb: () => void) {
  if (typeof window === "undefined") return;

  if (window.YT?.Player) {
    cb();
    return;
  }

  const w = window as Window & { [QUEUE_KEY]?: Array<() => void> };
  w[QUEUE_KEY] = w[QUEUE_KEY] ?? [];
  w[QUEUE_KEY].push(cb);

  if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    prev?.();
    const q = w[QUEUE_KEY] ?? [];
    w[QUEUE_KEY] = [];
    q.forEach((fn) => fn());
  };
}

/** YouTube embed: URL mute is lost on replay; IFrame API mute/setVolume(0) + interval keeps audio off. */
export function YouTubeForceMutedPlayer({
  videoId,
  title,
  playbackRate = 1,
  preferredQuality = "default",
}: {
  videoId: string;
  title: string;
  playbackRate?: number;
  preferredQuality?: string;
}) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `yt-force-mute-${videoId}-${reactId}`;
  const playerRef = useRef<YTPlayerInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    const enforce = () => {
      const p = playerRef.current;
      if (!p) return;
      try {
        p.mute();
        p.setVolume(0);
        p.setPlaybackRate(playbackRate);
        if (preferredQuality !== "default") {
          p.setPlaybackQuality(preferredQuality);
        }
      } catch {
        /* ignore */
      }
    };

    const init = () => {
      if (cancelled || !window.YT?.Player) return;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;

      new window.YT.Player(containerId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          mute: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          fs: 0,
        },
        events: {
          onReady: (e: { target: YTPlayerInstance }) => {
            playerRef.current = e.target;
            try {
              e.target.mute();
              e.target.setVolume(0);
              e.target.setPlaybackRate(playbackRate);
              if (preferredQuality !== "default") {
                e.target.setPlaybackQuality(preferredQuality);
              }
            } catch {
              /* ignore */
            }
          },
          onStateChange: (e: { target: YTPlayerInstance }) => {
            try {
              e.target.mute();
              e.target.setVolume(0);
              e.target.setPlaybackRate(playbackRate);
              if (preferredQuality !== "default") {
                e.target.setPlaybackQuality(preferredQuality);
              }
            } catch {
              /* ignore */
            }
          },
        },
      });
    };

    runWhenYTReady(init);

    const tick = window.setInterval(enforce, 200);

    return () => {
      cancelled = true;
      window.clearInterval(tick);
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [videoId, containerId, playbackRate, preferredQuality]);

  return (
    <div className="absolute inset-0 h-full w-full">
      <div
        id={containerId}
        className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full"
        aria-label={title}
      />
    </div>
  );
}
