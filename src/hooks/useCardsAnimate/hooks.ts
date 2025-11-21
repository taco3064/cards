import { useAnimate, type AnimationOptions } from 'motion/react';

import { getCardElements } from './utils';
import type { Animate, PreseteAnimate } from './types';

export function useCardsAnimate<
  ScopeEl extends HTMLElement = HTMLElement,
  CardEl extends HTMLElement = HTMLElement,
>(selector = ':scope > *') {
  const [scopeRef, animate] = useAnimate<ScopeEl>();

  return {
    scopeRef,
    animate,
    getCardElements: () => getCardElements<CardEl>(scopeRef, selector),
  };
}

export function usePresetAnimate(
  animate: Animate,
  options: AnimationOptions,
): PreseteAnimate {
  return (...args) => animate(...args, options);
}
