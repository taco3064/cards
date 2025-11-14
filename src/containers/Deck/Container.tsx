import { DeckRoot, DeckCard, Toolbar } from './styled';
import { useOverhandShuffle, useCardsState } from './hooks';
import type { DeckProps } from './types';

const ROTATE_3D = 'rotate3d(1, 1, -1, 60deg)';

export default function Deck({ backImg, className, duration = 0.2 }: DeckProps) {
  const [cards, setCards] = useCardsState();

  const { shuffling, onShuffle } = useOverhandShuffle(async () => {
    const count = Math.ceil(Math.random() * 5) + 3;

    for (let i = 0; i < count; i++) {
      await new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          setCards((cards) => {
            const pinch = Math.ceil(Math.random() * 6) + 4;
            const pinching = cards.slice(0, pinch);
            const remaining = cards.slice(pinch);

            return [
              ...remaining.map((meta) => ({
                ...meta,
                transform: [
                  'translateY(200px)',
                  `translateZ(${pinching.length}px)`,
                  'translateY(0px)',
                ],
              })),
              ...pinching.map((meta) => ({
                ...meta,
                transform: [`translateZ(-${remaining.length}px)`, 'translateY(0px)'],
              })),
            ];
          });

          resolve();
          clearTimeout(timer);
        }, duration * 400);
      });
    }
  });

  return (
    <DeckRoot className={className}>
      {cards.map(({ transform = [''], ...meta }, i) => (
        <DeckCard
          {...{ backImg, meta }}
          key={meta.id}
          className={`card ${meta.id}`}
          index={i}
          total={cards.length}
          animationProps={{
            transition: { duration: duration * transform.length, ease: 'easeInOut' },
            animate: {
              top: i * 1,
              transform: transform.map((t) => `${ROTATE_3D} ${t}`),
            },
          }}
        />
      ))}

      <Toolbar>
        <button
          onClick={onShuffle}
          disabled={shuffling}
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            border: 'none',
            cursor: shuffling ? 'default' : 'pointer',
            opacity: shuffling ? 0.6 : 1,
          }}
        >
          {shuffling ? 'Shuffling...' : 'Overhand Shuffle'}
        </button>
      </Toolbar>
    </DeckRoot>
  );
}
