import cx from 'clsx';

import Card from '~app/components/Card';
import DeckToolbar from './DeckToolbar';
import Styled from './styled';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { DeckStageProps, ToolbarStatus } from './types';

export default function DeckStage<Meta extends CardMeta>({
  backImg,
  className,
  defaultCards,
  size,
  onCardClick,
  onCardContentRender,
  onCardImageRender,
}: DeckStageProps<Meta>) {
  const { deckRef, cards, animate, getCardElements, onCardsChange, onCardsReset } =
    useCardsState<Meta, HTMLDivElement>(defaultCards);

  const { shuffling, onShuffle } = useShuffleCards({
    cards,
    size,
    animate,
    getCardElements,
    onCardsChange,
  });

  const { spreaded, spreading, onSpread, onSpreadReset } = useSpreadCards({
    cards,
    size,
    animate,
    getCardElements,
  });

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
            animationProps={{ animate: { z: cards.length - i } }}
            className="DeckStageCard"
            imgs={{ back: backImg, front: onCardImageRender?.(meta) }}
            onClick={onCardClick}
          >
            {onCardContentRender?.(meta)}
          </Card>
        ))}
      </Styled.Deck>

      <DeckToolbar
        {...{ onShuffle, onSpread }}
        className="DeckStageToolbar"
        status={cx({ shuffling, spreading, spreaded }) as ToolbarStatus}
        onReset={() => {
          onCardsReset();
          onSpreadReset();
        }}
      />
    </Styled.Container>
  );
}
