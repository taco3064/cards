import { useRef, useState } from 'react';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import CardsFanStage from '~app/containers/CardsFanStage';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import PortalMountProvider from '~app/contexts/PortalMount';
import Styled from './styled';
import { useCardsState } from '~app/hooks/useCardsState';

const CARDS = Array.from({ length: 52 }).map((_, i) => ({ id: i }));
const DECK_PROPS = { backImg: CARD_BACK_IMG, size: { width: 180, height: 260 } };
const MAX_DRAWN_COUNT = 3;

const Z_INDEX = {
  CARDS_FAN: 200,
  DECK_DRAW: 100,
  TOOLBAR: 300,
};

export default function DeckDrawPage() {
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
          onCardContentRender={(meta) => <div>{meta.id}</div>}
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
