export interface CardsState<Meta extends CardMeta> {
  cards: Meta[];
  onCardsChange: (cards: Meta[]) => void;
  onCardsReset: () => void;
}
