import type { CardMeta, CardsState } from '../useCardsState';

export type CardPosition = Record<'x' | 'y', number>;

export interface DrawnCard<Meta extends CardMeta> {
  element: HTMLElement;
  card: Meta;
  position: CardPosition;
}

export interface DrawCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'animate'> {
  enabled: boolean;
  maxDrawnCount: number;
  size: CardSize<'component'>;
}
