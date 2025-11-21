import type { Animate } from '../useCardsAnimate';

type ShuffleAnimate<Meta extends CardMeta> = (elements: HTMLElement[]) => Promise<Meta[]>;

export type ShuffleMode = 'OVERHAND' | 'RIFFLE';

export interface DeckPile<Meta extends CardMeta> {
  total: number;
  cards: Meta[];
  elements: HTMLElement[];
}

export interface ShuffleOptions<Meta extends CardMeta> {
  cards: Meta[];
  size: CardSize<'component'>;
  animate: Animate;
  getCardElements: () => HTMLElement[];
  onDeckChange: (cards: Meta[]) => void;
}

export type UseShuffleAnimate = <Meta extends CardMeta>(
  options: Omit<ShuffleOptions<Meta>, 'getCardElements' | 'onDeckChange'>,
) => ShuffleAnimate<Meta>;
