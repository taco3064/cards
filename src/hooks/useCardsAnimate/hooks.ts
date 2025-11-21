import { useAnimate, type AnimationOptions } from 'motion/react';
import { useImperativeHandle, useRef } from 'react';

import { getCardElements } from './utils';
import type { Animate, CardsRef, PreseteAnimate } from './types';

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

export function usePresetAnimate(
  animate: Animate,
  options: AnimationOptions,
): PreseteAnimate {
  return (...args) => animate(...args, options);
}
