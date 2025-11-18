import { useBreakpoint } from '../useBreakpoint';
import type { CardMeta } from '../useCardsState';
import type { SpreadCardsOptions } from './types';

export function useSpreadCards<Meta extends CardMeta>(options: SpreadCardsOptions<Meta>) {
  const breakpoint = useBreakpoint();

  console.log(breakpoint, options);

  return async () => {};
}
