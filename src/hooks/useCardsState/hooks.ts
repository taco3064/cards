import { useAnimate } from 'motion/react';
import { useState } from 'react';
import type { CardMeta, CardsState } from './types';

export function useCardsState<
  Meta extends CardMeta,
  ScopeEl extends Element = Element,
  CardEl extends Element = Element,
>(data: Meta[], selector: string): CardsState<Meta, ScopeEl> {
  const init = useInitCards<Meta>(data);
  const [deckRef, animate] = useAnimate<ScopeEl>();
  const [cards, setCards] = useState(init);

  return {
    cards,
    deckRef,

    animate,
    onCardsChange: setCards,
    onCardsReset: () => setCards(init),
    getCardElements() {
      if (!deckRef.current) {
        throw new Error('Scope element is not defined');
      }

      return Array.from(deckRef.current.querySelectorAll<CardEl>(selector));
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
