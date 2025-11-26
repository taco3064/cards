import type { Breakpoints } from './types';

export { default } from './styleds';
export type { Breakpoint, Breakpoints } from './types';

export const BREAKPOINTS: Breakpoints = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1536,
  xl: Infinity,
};
