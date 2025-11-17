import useOverhand from './useOverhand';
import useRiffle from './useRiffle';

import type {
  ShuffleCardsOptions,
  ShuffleHandlerHook,
  ShuffleMode,
  ShuffleUtils,
} from './types';

export function useShuffleCards({ onCardsChange, ...options }: ShuffleCardsOptions) {
  const utils: ShuffleUtils = {
    getRelease(cards) {
      const base = Math.ceil(cards.length / 5);

      return Math.ceil(Math.random() * base);
    },
    getSplited(cards, elements, start, deleteCount = cards.length) {
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

  const handlers: Record<ShuffleMode, ReturnType<ShuffleHandlerHook>> = {
    overhand: useOverhand(options, utils),
    riffle: useRiffle(options, utils),
  };

  return {
    onShuffle: async (mode: ShuffleMode) => {
      const shuffle = handlers[mode];

      onCardsChange(true);
      onCardsChange(await shuffle());
    },
  };
}
