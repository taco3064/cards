import type { CardMeta, CardsState } from '../useCardsState';

type AnimationMode = 'OVERHAND' | 'RIFFLE';

export interface CuttedDeck<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: HTMLElement[];
}

export type ShuffleAnimations<Meta extends CardMeta> = Record<
  AnimationMode,
  (elements: HTMLElement[], utils: Utils<Meta>) => Promise<Meta[]>
>;

export interface ShuffleCardsOptions<Meta extends CardMeta>
  extends Pick<
    CardsState<Meta>,
    'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
  > {
  size: CardSize<'component'>;
}

export type UseShuffleAnimate = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'getCardElements' | 'onCardsChange'>,
) => ShuffleAnimations<Meta>[AnimationMode];

export interface Utils<Meta extends CardMeta> {
  release: (cards: Meta[]) => number;

  cut: (
    start: number,
    deck: Pick<CuttedDeck<Meta>, 'cards' | 'elements'>,
  ) => [CuttedDeck<Meta>, CuttedDeck<Meta>];
}
