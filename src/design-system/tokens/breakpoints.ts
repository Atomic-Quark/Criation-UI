export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type BreakpointKey = keyof typeof breakpoints;

export function mediaQueryUp(bp: BreakpointKey): string {
  return `@media (min-width: ${breakpoints[bp]})`;
}

export function mediaQueryDown(bp: BreakpointKey): string {
  return `@media (max-width: calc(${breakpoints[bp]} - 1px))`;
}
