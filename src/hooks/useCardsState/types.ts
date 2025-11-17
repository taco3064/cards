import type { JsonObject } from 'type-fest';

export interface CardMeta extends JsonObject {
  id: string | number;
}

export interface CardOptions {
  total: number;
  generateMeta: (index: number) => CardMeta;
}

export type HandleCardsChange = (state: CardMeta[] | true) => void;
