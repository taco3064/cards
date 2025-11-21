import type { AnimationScope } from 'motion/react';

export function getCardElements<CardEl extends HTMLElement>(
  deckRef: AnimationScope<Element>,
  selector: string,
) {
  if (!deckRef.current) {
    throw new Error('Scope element is not defined');
  }

  return Array.from(deckRef.current.querySelectorAll<CardEl>(selector));
}
