import type { Animate } from '../useCardsAnimate';

type SpreadAnimate = (elements: HTMLElement[]) => Promise<void>;

export type SpreadMode = 'ARCHED_RIBBON';

export interface CardMatrix {
  x: number;
  y: number;
  rotate: number;
}

export interface SpreadOptions {
  size: CardSize<'component'>;
  animate: Animate;
  getCardElements: () => HTMLElement[];
}

export type UseSpreadAnimate = (
  options: Omit<SpreadOptions, 'getCardElements'>,
) => SpreadAnimate;
