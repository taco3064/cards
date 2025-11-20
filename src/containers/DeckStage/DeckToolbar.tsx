import { useState } from 'react';

import Button from '~app/styles/Button';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar/Styled';
import { useShuffleCards } from '~app/hooks/useShuffleCards';
import { useSpreadCards } from '~app/hooks/useSpreadCards';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { DeckToolbarProps } from './types';

const { ShuffleButton, ActionButton, Status } = Styled;

export default function DeckToolbar<Meta extends CardMeta>({
  cards,
  duration,
  size,
  onCardsReset,
  ...props
}: DeckToolbarProps<Meta>) {
  const [spreaded, setSpreaded] = useState(false);

  const { shuffling, onShuffle } = useShuffleCards({
    ...props,
    cards,
    duration,
    size,
  });

  const { spreading, onSpread } = useSpreadCards({
    ...props,
    cards,
    duration,
    size,
  });

  return (
    <Toolbar.Base>
      {shuffling || spreading ? (
        <Status>{shuffling ? 'Shuffling...' : 'Spreading...'}</Status>
      ) : (
        <Button.Group>
          {spreaded ? (
            <ActionButton
              onClick={() => {
                onCardsReset();
                setSpreaded(false);
              }}
            >
              <ResetIcon />
            </ActionButton>
          ) : (
            <>
              <ShuffleButton onClick={() => onShuffle('OVERHAND')}>
                Overhand
              </ShuffleButton>

              <ActionButton
                onClick={() => {
                  onSpread('ARCHED_RIBBON');
                  setSpreaded(true);
                }}
              >
                <DrawCardIcon />
              </ActionButton>

              <ShuffleButton onClick={() => onShuffle('RIFFLE')}>Riffle</ShuffleButton>
            </>
          )}
        </Button.Group>
      )}
    </Toolbar.Base>
  );
}
