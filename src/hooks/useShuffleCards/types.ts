import type { CardMeta, CardSize, CardsState } from '../useCardsState';

export type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export interface CuttedDeck<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: Element[];
}

export type ShuffleHandlers<Meta extends CardMeta> = Record<
  ShuffleMode,
  (elements: Element[], utils: Utils<Meta>) => Promise<Meta[]>
>;

export interface ShuffleCardsOptions<Meta extends CardMeta>
  extends Pick<
    CardsState<Meta>,
    'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
  > {
  size: CardSize<'component'>;
}

export type UseShuffleHandler = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'getCardElements' | 'onCardsChange'>,
) => ShuffleHandlers<Meta>[ShuffleMode];

export interface Utils<Meta extends CardMeta> {
  release: (cards: Meta[]) => number;

  cut: (
    start: number,
    deck: Pick<CuttedDeck<Meta>, 'cards' | 'elements'>,
  ) => [CuttedDeck<Meta>, CuttedDeck<Meta>];
}
