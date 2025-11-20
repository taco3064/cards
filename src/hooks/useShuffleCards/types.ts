import type { CardMeta, CardSize, CardsState } from '../useCardsState';

type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export type ShuffleHandlers<Meta extends CardMeta> = Record<
  ShuffleMode,
  (elements: Element[], utils: Utils<Meta>) => Promise<Meta[]>
>;

export interface ShuffleCardsOptions<Meta extends CardMeta>
  extends Pick<
    CardsState<Meta>,
    'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
  > {
  duration: number;
  size: CardSize<'component'>;
}

export type UseShuffleHandler = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'getCardElements' | 'onCardsChange'>,
) => ShuffleHandlers<Meta>[ShuffleMode];

export interface Utils<Meta extends CardMeta> {
  release: (cards: Meta[]) => number;

  cut: (
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
