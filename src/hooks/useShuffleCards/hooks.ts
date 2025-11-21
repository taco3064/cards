import { useState } from 'react';

import useOverhand from './useOverhand';
import useRiffle from './useRiffle';
import type { CardMeta } from '../useCardsState';
import type { ShuffleMode, ShuffleCardsOptions } from './types';

export function useShuffleCards<Meta extends CardMeta>({
  getCardElements,
  onCardsChange,
  ...options
}: ShuffleCardsOptions<Meta>) {
  const [shuffling, setShuffling] = useState(false);

  const animations = {
    OVERHAND: useOverhand(options),
    RIFFLE: useRiffle(options),
  };

  return {
    shuffling,

    async onShuffle(mode: ShuffleMode) {
      const elements = getCardElements();
      const animation = animations[mode];

      setShuffling(true);
      onCardsChange(await animation(elements));
      setShuffling(false);
    },
  };
}
