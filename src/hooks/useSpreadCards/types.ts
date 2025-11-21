import type { CardMeta, CardsState } from '../useCardsState';

type SpreadAnimation = (elements: HTMLElement[]) => Promise<void>;
export type SpreadMode = 'ARCHED_RIBBON';

export interface CardMatrix {
  x: number;
  y: number;
  rotate: number;
}

export interface SpreadOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'animate' | 'getCardElements'> {
  size: CardSize<'component'>;
}

export type UseSpreadAnimate = <Meta extends CardMeta>(
  options: Omit<SpreadOptions<Meta>, 'getCardElements'>,
) => SpreadAnimation;
