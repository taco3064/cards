import { useState } from 'react';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import { useCardsState } from '~app/hooks/useCardsState';

const CARDS = Array.from({ length: 52 }).map((_, i) => ({ id: i }));
const DECK_PROPS = { backImg: CARD_BACK_IMG, size: { width: 180, height: 260 } };

export default function DeckDrawPage() {
  const { cards, onCardsChange, onCardsReset } = useCardsState(CARDS);
  const [drawns, setDrawns] = useState<typeof cards>([]);

  return (
    <>
      <DeckDrawStage
        {...DECK_PROPS}
        cards={cards}
        completed={drawns.length === 3}
        maxDrawnCount={3}
        onDeckChange={onCardsChange}
        onComplete={setDrawns}
        onReset={() => {
          onCardsReset();
          setDrawns([]);
        }}
      />
    </>
  );
}
