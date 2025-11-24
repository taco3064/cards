import cx from 'clsx';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import { useAutoSpread, useSpreadCards } from '~app/hooks/useSpreadCards';
import { useCardsAnimate } from '~app/hooks/useCardsAnimate';
import { useDrawCards } from '~app/hooks/useDrawCards';
import { useResponsiveCallbacks } from '~app/hooks/useResponsiveCallbacks';
import type { CardsFanStageProps } from './types';

export default function CardsFanStage<Meta extends CardMeta>({
  backImg,
  cards,
  className,
  maxDrawnCount = 0,
  position,
  size,
  spreadMode = 'HAND_FAN',
  onCardContentRender,
  onCardImageRender,
}: CardsFanStageProps<Meta>) {
  const { scopeRef, cardsRef, animate } = useCardsAnimate<Meta, HTMLDivElement>(cards);
  const { onSpread } = useSpreadCards({ cardsRef, size, animate });

  const { drawable, isDrawn, onDraw } = useDrawCards<Meta>({
    cards,
    enabled: maxDrawnCount > 0,
    maxDrawnCount,
    size,
    animate,
  });

  useResponsiveCallbacks('sequential', [onSpread, onDraw]);
  useAutoSpread(spreadMode, onSpread);

  return (
    <>
      <Cards.Deck
        ref={scopeRef}
        className={cx('CardsFanStage', className)}
        $position={position}
        $size={size}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ meta, size }}
            revealed
            key={meta.id}
            animationProps={{ animate: { z: cards.length - i } }}
            className={cx('CardsFanStageCard', { drawable, drawn: isDrawn(meta) })}
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            onClick={(e, meta) => onDraw({ element: e.currentTarget, card: meta })}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>
    </>
  );
}
