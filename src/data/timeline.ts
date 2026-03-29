export interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  detail: string;
  color: string;
  leafColor: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "SWE Intern",
    org: "Meta",
    detail: "Incoming summer internship",
    color: "#5b8cc4",
    leafColor: "#6b8f5e",
  },
  {
    year: "2024 – 2028",
    title: "B.S. Computer Science",
    org: "CSUDH",
    detail: "Full stack development, algorithms, systems",
    color: "#8a9a72",
    leafColor: "#5a7a52",
  },
  {
    year: "2020",
    title: "Started building",
    org: "Self-taught",
    detail: "Picked up coding as a hobby freshman year of high school during COVID. Never stopped.",
    color: "#c4956a",
    leafColor: "#8a9a72",
  },
];
