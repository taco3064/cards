import cx from 'clsx';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import DeckToolbar from './DeckToolbar';
import Styled from './styleds';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import { useDrawCards } from '~app/hooks/useDrawCards';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { DeckDrawStageProps } from './types';

export default function DeckDrawStage<Meta extends CardMeta>({
  backImg,
  className,
  defaultCards,
  maxDrawnCount,
  size,
  onCardContentRender,
  onCardImageRender,
}: DeckDrawStageProps<Meta>) {
  const { deckRef, cards, animate, getCardElements, onCardsChange, onCardsReset } =
    useCardsState<Meta, HTMLDivElement, HTMLDivElement>(defaultCards);

  const { shuffling, onShuffle } = useShuffleCards({
    cards,
    size,
    animate,
    getCardElements,
    onCardsChange,
  });

  const { spreaded, spreading, onSpread } = useSpreadCards({
    size,
    animate,
    getCardElements,
  });

  const { drawable, drawns, isDrawn, onDraw, onDrawReset } = useDrawCards({
    enabled: spreaded && !spreading,
    maxDrawnCount,
    size,
    animate,
  });

  return (
    <Styled.Container className={cx('DeckStageContainer', className)}>
      <Cards.Deck
        ref={deckRef}
        className="DeckStageDeck"
        $width={size.width}
        $height={size.height}
        animate={{
          transform: spreaded
            ? 'rotate3d(0, 0, 0, 0deg)'
            : 'rotate3d(1, 0.2, -0.5, 45deg)',
        }}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: cards.length - i } }}
            className={cx('DeckStageCard', { drawable, drawn: isDrawn(meta) })}
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            onClick={(e, meta) => onDraw(e.currentTarget, meta)}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>

      <DeckToolbar
        {...{ onShuffle, onSpread }}
        className="DeckStageToolbar"
        disableConfirm={drawns.length < maxDrawnCount}
        status={{ shuffling, spreading, spreaded }}
        onConfirm={() => console.log(drawns)}
        onReset={() => {
          onCardsReset();
          onSpread();
          onDrawReset();
        }}
      />
    </Styled.Container>
  );
}
