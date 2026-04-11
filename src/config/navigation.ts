export type NavItem = { id: string; label: string };

/** Mirrors the long-scroll mockup nav — hash links on one page */
export const SITE_SECTIONS: NavItem[] = [
  { id: "top", label: "Home" },
  { id: "concept", label: "Concept" },
  { id: "material", label: "Material & Testing" },
  { id: "prototyping", label: "Prototyping" },
  { id: "system", label: "System" },
  { id: "behavior", label: "Behavior" },
  { id: "pavilion", label: "Pavilion Vision" },
  { id: "media", label: "Media" },
  { id: "process", label: "Process" },
  { id: "reflection", label: "Reflection" },
  { id: "future", label: "Future" },
];
