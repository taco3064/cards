import type { Animate, CardsRef } from '../useCardsAnimate';

type SpreadAnimate = (elements: Readonly<HTMLElement[]>) => Promise<void>;

export type SpreadMode = 'ARCHED_RIBBON' | 'ARCHED_RIBBONS';

export interface CardMatrix {
  x: number;
  y: number;
  rotate: number;
}

export interface SpreadOptions {
  cardsRef: CardsRef;
  size: CardSize<'component'>;
  animate: Animate;
}

export type UseSpreadAnimate = (
  options: Omit<SpreadOptions, 'cardsRef'>,
) => SpreadAnimate;
