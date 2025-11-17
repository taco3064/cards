import cx from 'clsx';

import Card from '~app/components/Card';
import { CardDeck, Button, Status, Toolbar } from './styled';
import { useCardsState } from '~app/hooks/useCardsState';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { DeckProps } from './types';

export default function Deck({
  cardOptions: { backImg, size, ...cardOptions },
  className,
  duration = 0.2,
}: DeckProps) {
  const { cards, shuffling, onCardsChange } = useCardsState(cardOptions);

  const { scopeRef, onShuffle } = useShuffleCards<HTMLDivElement>(
    {
      cards,
      duration,
      selector: ':scope > .card',
      size,
    },
    onCardsChange,
  );

  return (
    <section className={cx('deck', className)}>
      <CardDeck ref={scopeRef} $width={size.width} $height={size.height}>
        {cards.map((meta, i) => (
          <Card
            {...{ backImg, meta, size }}
            key={meta.id}
            animationProps={{ animate: { z: -i } }}
          />
        ))}
      </CardDeck>

      <Toolbar>
        {shuffling ? (
          <Status>Shuffling...</Status>
        ) : (
          <>
            <Button onClick={() => onShuffle('overhand')}>Overhand</Button>
            <Button onClick={() => onShuffle('riffle')}>Riffle</Button>
          </>
        )}
      </Toolbar>
    </section>
  );
}
