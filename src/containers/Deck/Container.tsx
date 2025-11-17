import cx from 'clsx';

import Card from '~app/components/Card';
import { CardDeck, Toolbar } from './styled';
import { useCardsState } from '~app/hooks/useCardsState';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { DeckProps } from './types';

export default function Deck({
  cardOptions: { backImg, size, ...cardOptions },
  className,
  duration = 0.2,
}: DeckProps) {
  const { cards, shuffling, onCardsChange } = useCardsState(cardOptions);

  const { scopeRef, onOverhand } = useShuffleCards<HTMLDivElement>(
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
        <button onClick={onOverhand} disabled={shuffling}>
          {shuffling ? 'Shuffling...' : 'Overhand Shuffle'}
        </button>
      </Toolbar>
    </section>
  );
}
