import cx from 'clsx';

import Card from '~app/components/Card';
import DeckToolbar from './DeckToolbar';
import Styled from './styled';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import type { DeckStageProps } from './types';

export default function DeckStage<Meta extends CardMeta>({
  backImg,
  className,
  defaultCards,
  duration = 0.2,
  size,
  onCardClick,
  onCardContentRender,
  onCardImageRender,
}: DeckStageProps<Meta>) {
  const { deckRef, cards, ...methodProps } = useCardsState<Meta, HTMLDivElement>(
    defaultCards,
    ':scope > *',
  );

  return (
    <Styled.Container className={cx('DeckStageContainer', className)}>
      <Styled.Deck
        ref={deckRef}
        className="DeckStageDeck"
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: defaultCards.length - i } }}
            className="DeckStageCard"
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            onClick={onCardClick}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Styled.Deck>

      <DeckToolbar {...methodProps} {...{ cards, duration, size }} />
    </Styled.Container>
  );
}
