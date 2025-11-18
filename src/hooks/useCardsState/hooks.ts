import { useAnimate } from 'motion/react';
import { useState } from 'react';
import type { CardMeta, CardsStateOptions } from './types';

export function useCardsState<
  Meta extends CardMeta,
  ScopeEl extends Element = Element,
  CardEl extends Element = Element,
>({ selector, total, generateMeta }: CardsStateOptions<Meta>) {
  const [scopeRef, animate] = useAnimate<ScopeEl>();
  const [animating, setAnimating] = useState(false);

  const [cards, setCards] = useState(() => {
    const state = Array.from({ length: total }).map((_, i) => generateMeta(i));

    for (let i = state.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [state[i], state[j]] = [state[j], state[i]];
    }

    return state;
  });

  return {
    animate,
    animating,
    cards,
    scopeRef,

    onCardsChange: (state: Meta[] | true) => {
      if (state === true) {
        return setAnimating(true);
      }

      setCards(state);
      setAnimating(false);
    },
    getCardElements: () => {
      if (!scopeRef.current) {
        throw new Error('Scope element is not defined');
      }

      return Array.from(scopeRef.current.querySelectorAll<CardEl>(selector));
    },
  };
}
