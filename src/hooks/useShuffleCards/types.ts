import type { Animate, CardsRef } from '../useCardsAnimate';

type ShuffleAnimate<Meta extends CardMeta> = (
  elements: Readonly<HTMLElement[]>,
) => Promise<Meta[]>;

export type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export interface DeckPile<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: Readonly<HTMLElement[]>;
}

export interface ShuffleOptions<Meta extends CardMeta> {
  cards: Meta[];
  cardsRef: CardsRef;
  size: CardSize<'component'>;
  animate: Animate;
  onDeckChange: (cards: Meta[]) => void;
}

export type UseShuffleAnimate = <Meta extends CardMeta>(
  options: Omit<ShuffleOptions<Meta>, 'cardsRef' | 'onDeckChange'>,
) => ShuffleAnimate<Meta>;
