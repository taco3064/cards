import { useState } from 'react';
import type { CardMeta, CardOptions } from './types';

export function useCardsState({ total, generateMeta }: CardOptions) {
  const [shuffling, setShuffling] = useState(false);

  const [cards, setCards] = useState<CardMeta[]>(
    Array.from({ length: total }).map((_, i) => generateMeta(i)),
  );

  return {
    cards,
    shuffling,

    onCardsChange: (state: CardMeta[] | true) => {
      if (state === true) {
        return setShuffling(true);
      }

      setCards(state);
      setShuffling(false);
    },
  };
}
