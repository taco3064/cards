import { useAnimate, type AnimationScope } from 'motion/react';
import { useState } from 'react';
import type { CardMeta, CardsState } from './types';

export function useCardsState<
  Meta extends CardMeta,
  ScopeEl extends HTMLElement = HTMLElement,
  CardEl extends HTMLElement = HTMLElement,
>(data: Meta[], selector: string = ':scope > *'): CardsState<Meta, ScopeEl, CardEl> {
  const [deckRef, animate] = useAnimate<ScopeEl>();
  const init = useInitCards<Meta>(data);
  const getCardElements = useCardElements<ScopeEl, CardEl>(deckRef, selector);
  const [cards, setCards] = useState(init);

  return {
    cards,
    deckRef,

    animate,
    getCardElements,
    onCardsChange: setCards,
    onCardsReset: async () => {
      await animate(getCardElements(), { x: 0, y: 0, rotate: 0 });
      setCards(init);
    },
  };
}

function useInitCards<Meta extends CardMeta>(data: Meta[]) {
  return () => {
    const cards = [...data];

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  };
}

function useCardElements<ScopeEl extends HTMLElement, CardEl extends HTMLElement>(
  deckRef: AnimationScope<ScopeEl>,
  selector: string,
) {
  return () => {
    if (!deckRef.current) {
      throw new Error('Scope element is not defined');
    }

    return Array.from(deckRef.current.querySelectorAll<CardEl>(selector));
  };
}
