import { useState } from 'react';

import useOverhand from './useOverhand';
import useRiffle from './useRiffle';
import type { CardMeta } from '../useCardsState';
import type { ShuffleCardsOptions, ShuffleHandlers, Utils } from './types';

export function useShuffleCards<Meta extends CardMeta>({
  getCardElements,
  onCardsChange,
  ...options
}: ShuffleCardsOptions<Meta>) {
  const [shuffling, setShuffling] = useState(false);

  const shuffles: ShuffleHandlers<Meta> = {
    OVERHAND: useOverhand(options),
    RIFFLE: useRiffle(options),
  };

  const utils: Utils<Meta> = {
    release(cards) {
      const base = Math.ceil(cards.length / 5);

      return Math.ceil(Math.random() * base);
    },
    cut(cards, elements, start, deleteCount = cards.length) {
      if (cards.length !== elements.length) {
        throw new Error('Cards and elements length mismatch');
      }

      return {
        total: deleteCount - start,
        cards: cards.splice(start, deleteCount),
        elements: elements.splice(start, deleteCount),
      };
    },
  };

  return {
    shuffling,

    async onShuffle(mode: keyof ShuffleHandlers<Meta>) {
      const elements = getCardElements();
      const shuffle = shuffles[mode];

      setShuffling(true);
      onCardsChange(await shuffle(elements, utils));
      setShuffling(false);
    },
  };
}
