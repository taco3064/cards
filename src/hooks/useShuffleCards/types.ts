import type { useAnimate } from 'motion/react';
import type { CardMeta } from '../useCardsState';

type SizeFields = 'width' | 'height';

export type Animate = ReturnType<typeof useAnimate>[1];

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
