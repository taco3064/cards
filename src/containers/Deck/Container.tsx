import cx from 'clsx';

import Button from '~app/styles/Button';
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
  const cardClasses = useExtractClasses<CardProps>('card', classes);

  const { cards, scopeRef, shuffling, ...shuffleFns } = useCardsState<
    HTMLDivElement,
    HTMLDivElement
  >({
    selector: ':scope > .card',
    total,
    generateMeta,
  });

  const { onShuffle } = useShuffleCards<HTMLDivElement>({
    ...shuffleFns,
    cards,
    duration,
    size,
  });

  return (
    <Styled.Container className={cx('deck', classes?.root, className)}>
      <Styled.Deck
        ref={scopeRef}
        className={classes?.deck}
        $width={size.width}
        $height={size.height}
      >
        {cards.map((meta, i) => (
          <Styled.Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: -i } }}
            classes={cardClasses}
          />
        ))}
      </Styled.Deck>

      <Toolbar.Nav className={classes?.nav}>
        {shuffling ? (
          <Styled.Status className={classes?.status}>Shuffling...</Styled.Status>
        ) : (
          <>
            <Button.NavItem
              className={classes?.navItem}
              onClick={() => onShuffle('overhand')}
            >
              Overhand
            </Button.NavItem>

            <Button.NavItem
              className={classes?.navItem}
              onClick={() => onShuffle('riffle')}
            >
              Riffle
            </Button.NavItem>
          </>
        )}
      </Toolbar.Nav>
    </Styled.Container>
  );
}
