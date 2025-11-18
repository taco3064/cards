import type { JsonObject } from 'type-fest';
import type { useAnimate } from 'motion/react';

type SizeFields = 'width' | 'height';

export type Animate = ReturnType<typeof useAnimate>[1];

export interface CardMeta extends JsonObject {
  id: string | number;
}

export type CardSize<Meta extends 'component' | 'styled'> = Record<
  Meta extends 'component' ? SizeFields : `$${SizeFields}`,
  number
>;

export interface CardOptions<Meta extends CardMeta> {
  size: CardSize<'component'>;
  total: number;
  generateMeta: (index: number) => Meta;
}

export interface CardsStateOptions<Meta extends CardMeta>
  extends Pick<CardOptions<Meta>, 'total' | 'generateMeta'> {
  selector: string;
}
