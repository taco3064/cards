import type { CardMeta, CardsState } from '../useCardsState';

export type CardPosition = Record<'x' | 'y', number>;

export interface DrawCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'animate' | 'cards' | 'getCardElements'> {
  draweds: Meta[];
  enabled: boolean;
  size: CardSize<'component'>;
}
