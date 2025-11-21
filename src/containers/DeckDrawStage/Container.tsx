import cx from 'clsx';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import DeckToolbar from './DeckToolbar';
import Styled from './styleds';
import { useCardsAnimate } from '~app/hooks/useCardsAnimate';
import { useDrawCards } from '~app/hooks/useDrawCards';
import { useResponsiveCallbacks } from '~app/hooks/useResponsiveCallbacks';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { DeckDrawStageProps } from './types';

export default function DeckDrawStage<Meta extends CardMeta>({
  backImg,
  className,
  cards,
  completed = false,
  maxDrawnCount,
  size,
  onCardContentRender,
  onCardImageRender,
  onComplete,
  onDeckChange,
  onReset,
}: DeckDrawStageProps<Meta>) {
  const { scopeRef, animate, getCardElements } = useCardsAnimate<HTMLDivElement>();

  const { shuffling, onShuffle } = useShuffleCards({
    cards,
    size,
    animate,
    getCardElements,
    onDeckChange,
  });

  const { spreaded, spreading, onSpread, onSpreadReset } = useSpreadCards({
    size,
    animate,
    getCardElements,
  });

  const { drawable, selecteds, isDrawn, onDraw, onDrawReset } = useDrawCards<Meta>({
    enabled: spreaded && !spreading,
    maxDrawnCount,
    size,
    animate,
  });

  const handleReset = async () => {
    await animate(getCardElements(), { x: 0, y: 0, rotate: 0 });

    onSpreadReset();
    onDrawReset();
    onReset();
  };

  const handleComplete = async () => {
    const deck = selecteds.reduce(
      ({ elements, cards }, { element, card }) => {
        elements.splice(elements.indexOf(element), 1);
        cards.splice(cards.indexOf(card), 1);

        return { elements, cards };
      },
      { elements: getCardElements(), cards: [...cards] },
    );

    await animate(deck.elements, { x: 0, y: 0, rotate: 0 });
    onDeckChange(deck.cards);
    onComplete(selecteds.map(({ card }) => card));
  };

  useResponsiveCallbacks('sequential', [onSpread, onDraw], spreaded);

  return (
    <Styled.Container className={cx('DeckStageContainer', className)}>
      <Cards.Deck
        ref={scopeRef}
        className="DeckStageDeck"
        $width={size.width}
        $height={size.height}
        animate={{
          transform:
            spreaded && !completed
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
            onClick={(e, meta) => onDraw({ element: e.currentTarget, card: meta })}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>

      <DeckToolbar
        {...{ onShuffle, onSpread }}
        className="DeckStageToolbar"
        disableConfirm={completed || selecteds.length < maxDrawnCount}
        status={{ shuffling, spreading, spreaded }}
        onConfirm={handleComplete}
        onReset={handleReset}
      />
    </Styled.Container>
  );
}
