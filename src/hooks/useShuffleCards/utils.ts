import type { CardMeta } from '../useCardsState';
import type { DeckPile } from './types';

export function release<Meta extends CardMeta>(cards: Meta[]) {
  const base = Math.ceil(cards.length / 5);

  return Math.ceil(Math.random() * base);
}

export function cut<Meta extends CardMeta>(
  start: number,
  { cards, elements }: Pick<DeckPile<Meta>, 'cards' | 'elements'>,
): [DeckPile<Meta>, DeckPile<Meta>] {
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
}
