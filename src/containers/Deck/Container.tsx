import cx from 'clsx';

import Button from '~app/styles/Button';
import Card from '~app/components/Card';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar';
import { useCardsState } from '~app/hooks/useCardsState';
import { useExtractClasses } from '~app/hooks/useExtractClasses';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { CardProps } from '~app/components/Card';
import type { DeckProps } from './types';

export default function Deck({
  cardOptions: { backImg, size, total, generateMeta },
  className,
  classes,
  duration = 0.2,
}: DeckProps) {
  const { cards, scopeRef, shuffling, ...shuffleFns } = useCardsState<
    HTMLDivElement,
    HTMLDivElement
  >({
    selector: ':scope > .card',
    total,
    generateMeta,
  });

  const { onShuffle } = useShuffleCards({ ...shuffleFns, cards, duration, size });
  const cardClasses = useExtractClasses<CardProps>('card', classes);

  return (
    <Styled.Container className={cx('deck', classes?.root, className)}>
      <Styled.CardDeck
        ref={scopeRef}
        className={classes?.deck}
        $cardClassName="card"
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: -i } }}
            classes={cardClasses}
          />
        ))}
      </Styled.CardDeck>

      <Toolbar.Base className={classes?.toolbar}>
        {shuffling ? (
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
          </>
        )}
      </Toolbar.Base>
    </Styled.Container>
  );
}
