import { useState } from 'react';

import useOverhand from './useOverhand';
import useRiffle from './useRiffle';
import type { ShuffleMode, ShuffleOptions } from './types';

export function useShuffleCards<Meta extends CardMeta>({
  getCardElements,
  onDeckChange,
  ...options
}: ShuffleOptions<Meta>) {
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
      onDeckChange(await animation(elements));
      setShuffling(false);
    },
  };
}
