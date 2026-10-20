import type { Animate, CardsRef } from '../useCardsAnimate';

type SpreadAnimate = (elements: Readonly<HTMLElement[]>) => Promise<void>;

export type SpreadMode = 'HAND_FAN' | 'ARCHED_RIBBON' | 'STRAIGHT';

export interface SpreadOptions {
  cardsRef: CardsRef;
  size: CardSize;
  animate: Animate;
}

export type UseSpreadAnimate = (
  options: Omit<SpreadOptions, 'cardsRef'>,
) => SpreadAnimate;
