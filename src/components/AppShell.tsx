"use client";

import { useEffect } from "react";
import { CursorProvider } from "@/contexts/CursorContext";
import { AirCursor } from "@/components/air/AirCursor";

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void import("@/lib/gsap");
  }, []);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const hide = mqFine.matches && !mqReduce.matches;
      document.body.classList.toggle("air-cursor-active", hide);
    };

    apply();
    mqFine.addEventListener("change", apply);
    mqReduce.addEventListener("change", apply);
    return () => {
      mqFine.removeEventListener("change", apply);
      mqReduce.removeEventListener("change", apply);
      document.body.classList.remove("air-cursor-active");
    };
  }, []);

  return (
    <CursorProvider>
      <AirCursor />
      <div className="relative flex min-h-dvh flex-col">
        {children}
      </div>
    </CursorProvider>
  );
}
