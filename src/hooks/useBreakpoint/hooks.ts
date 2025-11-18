import { create } from 'zustand';
import type { Breakpoint, Breakpoints } from './types';

const BREAKPOINTS: Breakpoints = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1536,
};

export const useBreakpoint = create<Breakpoint>((set) => {
  const keys = Object.keys(BREAKPOINTS) as Exclude<Breakpoint, 'xl'>[];

  const getCurrentBreakpoint = () =>
    keys.find((key) => window.innerWidth <= BREAKPOINTS[key]) || 'xl';

  window.addEventListener('resize', () => set(getCurrentBreakpoint()));

  return getCurrentBreakpoint();
});
