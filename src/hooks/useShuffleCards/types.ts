import type { useAnimate } from 'motion/react';
import type { CardMeta } from '../useCardsState';

type SizeFields = 'width' | 'height';

export type ShuffleMode = 'overhand' | 'riffle';

export type CardSize<T extends 'component' | 'styled'> = Record<
  T extends 'component' ? SizeFields : `$${SizeFields}`,
  number
>;

export interface ShuffleCardsOptions {
  cards: CardMeta[];
  size: CardSize<'component'>;
  selector: string;
  duration: number;
}

export type GetShuffleHandlers = (
  { cards, duration, selector, size }: ShuffleCardsOptions,
  scopeEl: HTMLElement,
  animate: ReturnType<typeof useAnimate>[1],
) => Record<ShuffleMode, () => Promise<CardMeta[]>>;

export type ShuffleFns = Record<
  ShuffleMode,
  (
    { cards, duration, selector, size }: ShuffleCardsOptions,
    scopeEl: HTMLElement,
    animate: ReturnType<typeof useAnimate>[1],
  ) => Promise<CardMeta[]>
>;
