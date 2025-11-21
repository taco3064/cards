import { useState } from 'react';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import CardsFanStage from '~app/containers/CardsFanStage';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import { useCardsState } from '~app/hooks/useCardsState';

const CARDS = Array.from({ length: 52 }).map((_, i) => ({ id: i }));
const DECK_PROPS = { backImg: CARD_BACK_IMG, size: { width: 180, height: 260 } };
const MAX_DRAWN_COUNT = 3;

export default function DeckDrawPage() {
  const { cards, onCardsChange, onCardsReset } = useCardsState(CARDS);
  const [drawns, setDrawns] = useState<typeof cards>([]);
  const completed = drawns.length === MAX_DRAWN_COUNT;

  return (
    <>
      <DeckDrawStage
        {...DECK_PROPS}
        cards={cards}
        completed={completed}
        maxDrawnCount={MAX_DRAWN_COUNT}
        onCardsChange={onCardsChange}
        onComplete={(cards, drawns) => {
          onCardsChange(cards);
          setDrawns(drawns);
        }}
        onReset={() => {
          onCardsReset();
          setDrawns([]);
        }}
      />

      {completed && <CardsFanStage {...DECK_PROPS} cards={drawns} />}
    </>
  );
}
