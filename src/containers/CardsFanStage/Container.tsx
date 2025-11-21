import cx from 'clsx';
import { useEffect } from 'react';

import Card from '~app/components/Card';
import Cards from '~app/styles/Cards';
import Container from '~app/styles/Container';
import { useCardsAnimate } from '~app/hooks/useCardsAnimate';
import { useResponsiveCallbacks } from '~app/hooks/useResponsiveCallbacks';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardsFanStageProps } from './types';

export default function CardsFanStage<Meta extends CardMeta>({
  backImg,
  cards,
  className,
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
    <Container.Section className={cx('CardsFanStageSection', className)}>
      <Cards.Deck
        ref={scopeRef}
        className="DeckStageDeck"
        $width={size.width}
        $height={size.height}
        // animate={{
        //   transform:
        //     spreaded && !completed
        //       ? 'rotate3d(0, 0, 0, 0deg)'
        //       : 'rotate3d(1, 0.2, -0.5, 45deg)',
        // }}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: cards.length - i } }}
            className="CardsFanStageCard"
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            // onClick={(e, meta) => onDraw({ element: e.currentTarget, card: meta })}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Cards.Deck>
    </Container.Section>
  );
}
