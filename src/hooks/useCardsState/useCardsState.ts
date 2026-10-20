import { useState } from 'react';

import type { CardsState } from './CardsState.types';

export function useCardsState<Meta extends CardMeta>(data: Meta[]): CardsState<Meta> {
  const [cards, setCards] = useState(() => createCards(data));

  return {
    cards,

    onCardsChange: setCards,
    onCardsReset: () => setCards(() => createCards(data)),
  };
}

function createCards<Meta extends CardMeta>(data: Meta[]): Meta[] {
  const cards = [...data];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
