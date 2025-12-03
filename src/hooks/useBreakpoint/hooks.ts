import { create } from 'zustand';
import type { BreakpointMatches, BreakpointValues } from './types';

const BREAKPOINTS: Breakpoints = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1536,
  xl: Infinity,
};

const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS) as Breakpoint[];

export const useBreakpoint = create<Breakpoint>((set) => {
  const getCurrentBreakpoint = (): Breakpoint =>
    BREAKPOINT_KEYS.find((key) => window.innerWidth <= BREAKPOINTS[key]) || 'xl';

  window.addEventListener('resize', () => set(getCurrentBreakpoint()));

  return getCurrentBreakpoint();
});

export function useBreakpointMatches<T>(
  values: BreakpointValues<T>,
): BreakpointMatches<T> {
  const breakpoint = useBreakpoint();

  const keys = BREAKPOINT_KEYS.slice(
    0,
    BREAKPOINT_KEYS.indexOf(breakpoint) + 1,
  ).reverse();

  for (const key of keys) {
    if (values[key]) {
      return { breakpoint: key, matched: values[key] as T };
    }
  }

  return { breakpoint: 'xs', matched: values.xs };
}
