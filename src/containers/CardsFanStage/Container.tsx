import cx from 'clsx';
import { useEffect } from 'react';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import { useCardsAnimate } from '~app/hooks/useCardsAnimate';
import { useResponsiveCallbacks } from '~app/hooks/useResponsiveCallbacks';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardsFanStageProps } from './types';

export default function CardsFanStage<Meta extends CardMeta>({
  backImg,
  cards,
  className,
  position,
  size,
  onCardContentRender,
  onCardImageRender,
}: CardsFanStageProps<Meta>) {
  const { scopeRef, cardsRef, animate } = useCardsAnimate<Meta, HTMLDivElement>(cards);
  const { onSpread } = useSpreadCards({ cardsRef, size, animate });

  useResponsiveCallbacks('sequential', [onSpread]);

  useEffect(() => {
    onSpread('ARCHED_RIBBON');
  }, []);

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
            className="CardsFanStageCard"
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>
    </>
  );
}
