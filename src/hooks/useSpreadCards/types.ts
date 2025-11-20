import type { CardMeta, CardSize, CardsState } from '../useCardsState';

export type SpreadHandlers = Record<
  'ARCHED_RIBBON',
  (elements: Element[]) => Promise<void>
>;

export interface SpreadCardsOptions<Meta extends CardMeta>
  extends Pick<CardsState<Meta>, 'cards' | 'animate' | 'getCardElements'> {
  duration: number;
  size: CardSize<'component'>;
}

export type UseSpreadHandler = <Meta extends CardMeta>(
  options: Omit<SpreadCardsOptions<Meta>, 'getCardElements'>,
) => SpreadHandlers[keyof SpreadHandlers];
