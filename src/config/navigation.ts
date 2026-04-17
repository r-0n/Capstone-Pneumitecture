export type NavItem = { id: string; label: string; shortLabel?: string };

/** Mirrors the long-scroll mockup nav — hash links on one page */
export const SITE_SECTIONS: NavItem[] = [
  { id: "hero", label: "00 Hero", shortLabel: "00 Hero" },
  { id: "pavilion-lead", label: "01 Overview", shortLabel: "01 Overview" },
  { id: "paradigm-shift", label: "02 Paradigm Shift", shortLabel: "02 Paradigm" },
  { id: "concept", label: "03 Design Concept", shortLabel: "03 Concept" },
  { id: "design-process", label: "04 Design Process", shortLabel: "04 Process" },
  { id: "system", label: "05 System", shortLabel: "05 System" },
  { id: "materials", label: "06 Material Exploration", shortLabel: "06 Material" },
  { id: "prototyping", label: "07 Prototyping", shortLabel: "07 Proto" },
  { id: "behavior", label: "08 Behavior", shortLabel: "08 Behavior" },
  { id: "pavilion", label: "09 Future Vision", shortLabel: "09 Vision" },
  { id: "archive", label: "10 Media / Archive", shortLabel: "10 Archive" },
];
