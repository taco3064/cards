import type { SetRequired } from 'type-fest';
import type { Breakpoint } from '~app/styles/GlobalStyle';

export type BreakpointValues<T> = SetRequired<{ [K in Breakpoint]?: T }, 'xs'>;

export type BreakpointMatches<T> = {
  breakpoint: Breakpoint;
  matched: T;
};
