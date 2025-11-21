import type { Animate } from '../useCardsAnimate';

export type CardPosition = Record<'x' | 'y', number>;

export interface DrawnCard<Meta extends CardMeta> {
  element: HTMLElement;
  card: Meta;
  position: CardPosition;
}

export interface DrawOptions {
  animate: Animate;
  enabled: boolean;
  maxDrawnCount: number;
  size: CardSize<'component'>;
}
