import type { CardMeta, CardsState } from '../useCardsState';

export type AnimationMode = 'ARCHED_RIBBON';

export interface CardPose {
  x: number;
  y: number;
  rotate: number;
}

export type SpreadHandler = (mode: AnimationMode) => Promise<void>;

export type SpreadAnimations = Record<
  AnimationMode,
  (elements: HTMLElement[], utils: Utils) => Promise<void>
>;

export interface SpreadCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'animate' | 'getCardElements'> {
  size: CardSize<'component'>;
}

export type UseSpreadAnimate = <Meta extends CardMeta>(
  options: Omit<SpreadCardsOptions<Meta>, 'getCardElements'>,
) => SpreadAnimations[AnimationMode];

export type Utils = {
  split: <Rows extends number>(elements: HTMLElement[], rows: Rows) => HTMLElement[][];
};
