import { useRef, useState } from 'react';

import CardsFanStage from '~app/containers/CardsFanStage';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import PortalMountProvider from '~app/contexts/PortalMount';
import Styled from './styled';
import { useCardsState } from '~app/hooks/useCardsState';

const BASE_CARD_URL = '/imgs/poker';
const CARDS = Array.from({ length: 52 }).map((_, i) => ({ id: i }));
const MAX_DRAWN_COUNT = 3;
const SUITS = ['spade', 'heart', 'club', 'diamond', 'joker'];

const DECK_PROPS = {
  backImg: `${BASE_CARD_URL}/cover.png`,
  size: { width: 180, height: 260 },
};

const Z_INDEX = {
  CARDS_FAN: 200,
  DECK_DRAW: 100,
  TOOLBAR: 300,
};

export default function DrawDemoPage() {
  const { cards, onCardsChange, onCardsReset } = useCardsState(CARDS);
  const [drawns, setDrawns] = useState<typeof cards>([]);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const completed = drawns.length === MAX_DRAWN_COUNT;

  return (
    <PortalMountProvider containerRef={toolbarRef}>
      <DeckDrawStage
        {...DECK_PROPS}
        cards={cards}
        completed={completed}
        maxDrawnCount={MAX_DRAWN_COUNT}
        position={{ top: '40%', zIndex: Z_INDEX.DECK_DRAW }}
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

      {completed && (
        <CardsFanStage
          {...DECK_PROPS}
          cards={drawns}
          position={{ top: '60%', zIndex: Z_INDEX.CARDS_FAN }}
          onCardImageRender={({ id }) => {
            const num = (id % 13) + 1;
            const suit = SUITS[Math.floor(id / 13)];

            return `${BASE_CARD_URL}/${suit}-${num}.png`;
          }}
        />
      )}

      <Styled.Toolbar
        ref={toolbarRef}
        className="DeckDrawPage-Toolbar"
        $zIndex={Z_INDEX.TOOLBAR}
      />
    </PortalMountProvider>
  );
}
