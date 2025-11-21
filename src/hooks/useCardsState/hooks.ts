import { useState } from 'react';

import { createCards } from './utils';
import type { CardsState } from './types';

export function useCardsState<Meta extends CardMeta>(data: Meta[]): CardsState<Meta> {
  const [cards, setCards] = useState(() => createCards(data));

  return {
    cards,

    onCardsChange: setCards,
    onCardsReset: () => setCards(() => createCards(data)),
  };
}
