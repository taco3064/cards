import { useAnimate } from 'motion/react';
import { useState } from 'react';
import type { CardMeta, CardsStateOptions } from './types';

export function useCardsState<ScopeEl extends Element, CardEl extends Element>({
  selector,
  total,
  generateMeta,
}: CardsStateOptions) {
  const [scopeRef, animate] = useAnimate<ScopeEl>();
  const [shuffling, setShuffling] = useState(false);

  const [cards, setCards] = useState<CardMeta[]>(
    Array.from({ length: total }).map((_, i) => generateMeta(i)),
  );

  return {
    cards,
    scopeRef,
    shuffling,

    animate,
    onCardsChange: (state: CardMeta[] | true) => {
      if (state === true) {
        return setShuffling(true);
      }

      setCards(state);
      setShuffling(false);
    },
    getCardElements: () => {
      if (!scopeRef.current) {
        throw new Error('Scope element is not defined');
      }

      return Array.from(scopeRef.current.querySelectorAll<CardEl>(selector));
    },
  };
}
