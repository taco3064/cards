import type { CompleteOptions, ResetOptions } from './DeckDrawStage.types';

export function createResetHandler({ animate, cardsRef, resetHandlers }: ResetOptions) {
  return async () => {
    const elements = cardsRef.current;

    await animate(elements, { x: 0, y: 0, rotate: 0 });
    resetHandlers.forEach((handler) => handler());
  };
}

export function createCompleteHandler<Meta extends CardMeta>({
  cards,
  cardsRef,
  selecteds,
  animate,
  onComplete,
  onSpreadReset,
}: CompleteOptions<Meta>) {
  return async () => {
    const deck = selecteds.reduce(
      ({ elements, cards }, { element, card }) => {
        elements.splice(elements.indexOf(element), 1);
        cards.splice(cards.indexOf(card), 1);

        return { elements, cards };
      },
      { elements: [...cardsRef.current], cards: [...cards] },
    );

    await Promise.allSettled([
      animate(deck.elements, { x: 0, y: 0, rotate: 0 }),
      animate(
        selecteds.map(({ element }) => element),
        { x: 0, y: window.innerHeight, rotate: 0 },
      ),
    ]);

    onSpreadReset();

    onComplete(
      deck.cards,
      selecteds.map(({ card }) => card),
    );
  };
}
