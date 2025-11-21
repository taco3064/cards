import type { CardMeta, CardsState } from '../useCardsState';

type ShuffleAnimation<Meta extends CardMeta> = (
  elements: HTMLElement[],
) => Promise<Meta[]>;

export interface DeckPile<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: HTMLElement[];
}

export type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export interface ShuffleCardsOptions<Meta extends CardMeta>
  extends Pick<
    CardsState<Meta>,
    'cards' | 'animate' | 'getCardElements' | 'onCardsChange'
  > {
  size: CardSize<'component'>;
}

export type UseShuffleAnimate = <Meta extends CardMeta>(
  options: Omit<ShuffleCardsOptions<Meta>, 'getCardElements' | 'onCardsChange'>,
) => ShuffleAnimation<Meta>;
