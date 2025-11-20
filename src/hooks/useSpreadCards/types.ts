import type { CardMeta, CardSize, CardsState } from '../useCardsState';

export type SpreadMode = 'ARCHED_RIBBON';

export interface CardPose {
  x: number;
  y: number;
  rotate: number;
}

export interface HandlerRef {
  spreaded?: SpreadMode;
  handler: (mode: SpreadMode) => Promise<void>;
}

export type SpreadHandlers = Record<
  SpreadMode,
  (elements: Element[], utils: Utils) => Promise<void>
>;

export interface SpreadCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'cards' | 'animate' | 'getCardElements'> {
  size: CardSize<'component'>;
}

export type UseSpreadHandler = <Meta extends CardMeta>(
  options: Omit<SpreadCardsOptions<Meta>, 'getCardElements'>,
) => SpreadHandlers[SpreadMode];

export type Utils = {
  split: <Rows extends number>(elements: Element[], rows: Rows) => Element[][];
};
