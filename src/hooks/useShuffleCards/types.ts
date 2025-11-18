import type { ArraySlice } from 'type-fest';
import type { Animate, CardMeta, CardSize, useCardsState } from '../useCardsState';

type CardsState<Meta extends CardMeta> = Pick<
  ReturnType<typeof useCardsState<Meta>>,
  'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
>;

export type ShuffleMode = 'overhand' | 'riffle';

export interface OverrideAnimate {
  (...[elements, keyframes]: ArraySlice<Parameters<Animate>, 0, 2>): ReturnType<Animate>;
}

export type ShuffleHandler<Meta extends CardMeta> = (
  elements: Element[],
  utils: ShuffleUtils<Meta>,
) => Promise<Meta[]>;

export type HandlerOptions<Meta extends CardMeta> = Omit<
  ShuffleCardsOptions<Meta>,
  'getCardElements' | 'onCardsChange'
>;

export interface ShuffleCardsOptions<Meta extends CardMeta> extends CardsState<Meta> {
  size: CardSize<'component'>;
  duration: number;
}

export interface ShuffleUtils<Meta extends CardMeta> {
  getRelease: (cards: Meta[]) => number;

  getSplited: (
    cards: Meta[],
    elements: Element[],
    start: number,
    deleteCount?: number,
  ) => {
    total: number;
    cards: Meta[];
    elements: Element[];
  };
}
