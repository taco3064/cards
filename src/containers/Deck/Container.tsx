import cx from 'clsx';

import Button from '~app/styles/Button';
import Card from '~app/components/Card';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar';
import { useCardsState, type CardMeta } from '~app/hooks/useCardsState';
import { useExtractClasses } from '~app/hooks/useExtractClasses';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardProps } from '~app/components/Card';
import type { DeckProps } from './types';

const CARD_CLASS_NAME = 'card';

export default function Deck<Meta extends CardMeta>({
  cardOptions: { backImg, size, total, generateMeta },
  className,
  classes,
  duration = 0.2,
}: DeckProps<Meta>) {
  const { cards, scopeRef, animating, ...stateFns } = useCardsState<Meta, HTMLDivElement>(
    {
      selector: `:scope > .${CARD_CLASS_NAME}`,
      total,
      generateMeta,
    },
  );

  const onShuffle = useShuffleCards({ ...stateFns, cards, duration, size });
  const onSpread = useSpreadCards({ ...stateFns, cards, duration });
  const cardClasses = useExtractClasses<CardProps>(CARD_CLASS_NAME, classes);

  return (
    <Styled.Container className={cx('deck', classes?.root, className)}>
      <Styled.CardDeck
        ref={scopeRef}
        className={classes?.deck}
        $cardClassName={CARD_CLASS_NAME}
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: total - i } }}
            classes={cardClasses}
          />
        ))}
      </Styled.CardDeck>

      <Toolbar.Base className={classes?.toolbar}>
        {animating ? (
          <Styled.Status className={classes?.status}>Shuffling...</Styled.Status>
        ) : (
          <>
            <Button.Base
              className={classes?.button}
              onClick={() => onShuffle('overhand')}
            >
              Overhand
            </Button.Base>

            <Button.Base className={classes?.button} onClick={() => onShuffle('riffle')}>
              Riffle
            </Button.Base>

            <Button.Base className={classes?.button} onClick={onSpread}>
              Spread
            </Button.Base>
          </>
        )}
      </Toolbar.Base>
    </Styled.Container>
  );
}
