import { useState } from 'react';

import useOverhand from './useOverhand';
import useRiffle from './useRiffle';
import type { CardMeta } from '../useCardsState';
import type { ShuffleAnimations, ShuffleCardsOptions, Utils } from './types';

export function useShuffleCards<Meta extends CardMeta>({
  getCardElements,
  onCardsChange,
  ...options
}: ShuffleCardsOptions<Meta>) {
  const [shuffling, setShuffling] = useState(false);

  const animations: ShuffleAnimations<Meta> = {
    OVERHAND: useOverhand(options),
    RIFFLE: useRiffle(options),
  };

  const utils: Utils<Meta> = {
    release(cards) {
      const base = Math.ceil(cards.length / 5);

      return Math.ceil(Math.random() * base);
    },
    cut(start, { cards, elements }) {
      if (cards.length !== elements.length) {
        throw new Error('Cards and elements length mismatch');
      } else if (!start) {
        throw new Error('Start index must not be 0');
      }

      const temp = { cards: [...cards], elements: [...elements] };

      const cutted = {
        cards: temp.cards.splice(start),
        elements: temp.elements.splice(start),
      };

      return [
        { ...cutted, total: cutted.cards.length },
        { ...temp, total: temp.cards.length },
      ];
    },
  };

  return {
    shuffling,

    async onShuffle(mode: keyof ShuffleAnimations<Meta>) {
      const elements = getCardElements();
      const animation = animations[mode];

      setShuffling(true);
      onCardsChange(await animation(elements, utils));
      setShuffling(false);
    },
  };
}
