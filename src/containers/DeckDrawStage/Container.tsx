import cx from 'clsx';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import DeckToolbar from './DeckToolbar';
import { useCardsAnimate } from '~app/hooks/useCardsAnimate';
import { useCompleteHandler, useResetHandler } from './hooks';
import { useDrawCards } from '~app/hooks/useDrawCards';
import { useMountPortal } from '~app/hooks/usePortalMount';
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
  position,
  size,
  onCardContentRender,
  onCardImageRender,
  onCardsChange,
  onComplete,
  onReset,
}: DeckDrawStageProps<Meta>) {
  const { scopeRef, cardsRef, animate } = useCardsAnimate<Meta, HTMLDivElement>(cards);
  const mountPortal = useMountPortal();

  const { shuffling, onShuffle } = useShuffleCards({
    cards,
    cardsRef,
    size,
    animate,
    onCardsChange,
  });

  const { spreaded, spreading, onSpread, onSpreadReset } = useSpreadCards({
    cardsRef,
    size,
    animate,
  });

  const { drawable, selecteds, isDrawn, onDraw, onDrawReset } = useDrawCards<Meta>({
    cards,
    enabled: spreaded && !spreading,
    maxDrawnCount,
    size,
    animate,
  });

  const handleReset = useResetHandler({
    animate,
    cardsRef,
    resetHandlers: [onSpreadReset, onDrawReset, onReset],
  });

  const handleComplete = useCompleteHandler<Meta>({
    cards,
    cardsRef,
    selecteds,
    animate,
    onComplete,
    onSpreadReset,
  });

  useResponsiveCallbacks('sequential', [onSpread, onDraw], spreaded);

  return (
    <>
      <Cards.Deck
        ref={scopeRef}
        className={cx('DeckDrawStage', className)}
        $position={position}
        $size={size}
        animate={{
          transform:
            spreaded && !completed
              ? 'scale(0.9) rotate3d(0, 0, 0, 0deg)'
              : 'scale(0.9) rotate3d(1, 0.2, -0.5, 45deg)',
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

      {!completed &&
        mountPortal(
          <DeckToolbar
            {...{ onShuffle, onSpread }}
            currentDrawnCount={selecteds.length}
            maxDrawnCount={maxDrawnCount}
            status={{ shuffling, spreading, spreaded }}
            onConfirm={handleComplete}
            onReset={handleReset}
          />,
        )}
    </>
  );
}
