import type { AnimationScope } from 'motion/react';

export function getCardElements<Meta extends CardMeta, CardEl extends HTMLElement>(
  cards: Meta[],
  deckRef: AnimationScope<Element>,
  selector: string,
) {
  if (!deckRef.current) {
    throw new Error('Scope element is not defined');
  }

  const result = Array.from(deckRef.current.querySelectorAll<CardEl>(selector));

  if (result.length !== cards.length) {
    throw new Error('Card elements count does not match cards count');
  }

  return result;
}
