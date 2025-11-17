import { useAnimate } from 'motion/react';

import { getShuffleHandlers } from './utils';
import type { HandleCardsChange } from '../useCardsState';
import type { ShuffleCardsOptions, ShuffleMode } from './types';

export function useShuffleCards<ScopeEl extends HTMLElement>(
  options: ShuffleCardsOptions,
  onCardsChange: HandleCardsChange,
) {
  const [scopeRef, animate] = useAnimate<ScopeEl>();

  return {
    scopeRef,
    onShuffle: async (mode: ShuffleMode) => {
      const { [mode]: shuffle } = getShuffleHandlers(options, scopeRef.current, animate);

      onCardsChange(true);
      onCardsChange(await shuffle());
    },
  };
}
