import { useAnimate } from 'motion/react';

import { getOverhandCards } from './utils';
import type { HandleCardsChange } from '../useCardsState';
import type { ShuffleCardsOptions } from './types';

export function useShuffleCards<ScopeEl extends HTMLElement>(
  options: ShuffleCardsOptions,
  onCardsChange: HandleCardsChange,
) {
  const [scopeRef, animate] = useAnimate<ScopeEl>();

  return {
    scopeRef,
    onOverhand: async () => {
      onCardsChange(true);
      onCardsChange(await getOverhandCards(scopeRef.current, options, animate));
    },
  };
}
