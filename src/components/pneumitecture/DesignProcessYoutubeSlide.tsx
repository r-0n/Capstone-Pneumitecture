"use client";

import { useEffect, useId, useRef } from "react";

type YTPlayerInstance = {
  mute: () => void;
  setVolume: (v: number) => void;
  setPlaybackRate: (rate: number) => void;
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
        onStateChange?: (e: { target: YTPlayerInstance }) => void;
      };
    },
  ) => YTPlayerInstance;
};

const QUEUE_KEY = "__ytForceMuteQueue" as const;

type WindowWithYT = Window & {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
  [QUEUE_KEY]?: Array<() => void>;
};

function getWin() {
  return typeof window !== "undefined" ? (window as WindowWithYT) : null;
}

function runWhenYTReady(cb: () => void) {
  const win = getWin();
  if (!win) return;

  if (win.YT?.Player) {
    cb();
    return;
  }

  win[QUEUE_KEY] = win[QUEUE_KEY] ?? [];
  win[QUEUE_KEY]!.push(cb);

  if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

  const prev = win.onYouTubeIframeAPIReady;
  win.onYouTubeIframeAPIReady = function () {
    prev?.();
    const q = win[QUEUE_KEY] ?? [];
    win[QUEUE_KEY] = [];
    q.forEach((fn) => fn());
  };
}

type Props = {
  videoId: string;
  title: string;
  /** YouTube-supported rates, e.g. 1.25, 1.5, 1.75, 2 */
  playbackRate: number;
};

export function DesignProcessYoutubeSlide({ videoId, title, playbackRate }: Props) {
  const reactId = useId().replace(/:/g, "");
  const containerId = `yt-dp-${videoId}-${reactId}`;
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
      } catch {
        /* ignore */
      }
    };

    const init = () => {
      const win = getWin();
      if (cancelled || !win?.YT?.Player) return;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;

      new win.YT.Player(containerId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          mute: 1,
          controls: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: { target: YTPlayerInstance }) => {
            playerRef.current = e.target;
            enforce();
          },
          onStateChange: () => {
            enforce();
          },
        },
      });
    };

    runWhenYTReady(init);

    const tick = window.setInterval(enforce, 120);
    const onFocus = () => enforce();
    const onVis = () => {
      if (document.visibilityState === "visible") enforce();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      window.clearInterval(tick);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [videoId, containerId, playbackRate]);

  return (
    <div className="absolute inset-0 h-full w-full rounded-sm bg-bone p-0.5">
      <div id={containerId} className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full" aria-label={title} />
    </div>
  );
}
