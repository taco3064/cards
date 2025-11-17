import type { JsonObject } from 'type-fest';

type SizeFields = 'width' | 'height';

export interface CardMeta extends JsonObject {
  id: string | number;
}

export type CardSize<T extends 'component' | 'styled'> = Record<
  T extends 'component' ? SizeFields : `$${SizeFields}`,
  number
>;

export interface CardOptions {
  size: CardSize<'component'>;
  total: number;
  generateMeta: (index: number) => CardMeta;
}

export interface CardsStateOptions extends Pick<CardOptions, 'total' | 'generateMeta'> {
  selector: string;
}
