import { useAnimate, type AnimationScope } from 'motion/react';
import { useImperativeHandle, useRef } from 'react';

import type { CardsRef } from './CardsAnimate.types';

export function useCardsAnimate<
  Meta extends CardMeta,
  ScopeEl extends HTMLElement = HTMLElement,
  CardEl extends HTMLElement = HTMLElement,
>(cards: Meta[], selector = ':scope > *') {
  const [scopeRef, animate] = useAnimate<ScopeEl>();
  const cardsRef: CardsRef<CardEl> = useRef([]);

  useImperativeHandle(
    cardsRef,
    () => getCardElements<Meta, CardEl>(cards, scopeRef, selector),
    [cards, scopeRef, selector],
  );

  return { scopeRef, cardsRef, animate };
}

function getCardElements<Meta extends CardMeta, CardEl extends HTMLElement>(
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
