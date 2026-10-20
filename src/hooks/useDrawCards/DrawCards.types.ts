import type { Animate } from '../useCardsAnimate';

export type CardPosition = Record<'x' | 'y', number>;

export interface DrawnCard<Meta extends CardMeta> {
  element: HTMLElement;
  card: Meta;
  position: CardPosition;
}

export interface DrawOptions<Meta extends CardMeta> {
  animate: Animate;
  cards: Meta[];
  enabled: boolean;
  maxDrawnCount: number;
  size: CardSize;
}
