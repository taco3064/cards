import cx from 'clsx';

import Button from '~app/styles/Button';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Styled from './styled';
import Toolbar from '~app/styles/Toolbar/Styled';
import Typography from '~app/styles/Typography';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { DeckToolbarProps } from './types';

const { ShuffleButton, ActionButton } = Styled;

export default function DeckToolbar<Meta extends CardMeta>({
  className,
  status,
  onReset,
  onShuffle,
  onSpread,
}: DeckToolbarProps<Meta>) {
  return (
    <Toolbar.Base
      className={cx('DeckToolbar', className, { spreaded: status === 'spreaded' })}
    >
      {status === 'shuffling' || status === 'spreading' ? (
        <Typography.Status>
          {status === 'shuffling' ? 'Shuffling...' : 'Spreading...'}
        </Typography.Status>
      ) : (
        <Button.Group>
          {status === 'spreaded' ? (
            <ActionButton onClick={onReset}>
              <ResetIcon />
            </ActionButton>
          ) : (
            <>
              <ShuffleButton onClick={() => onShuffle('OVERHAND')}>
                Overhand
              </ShuffleButton>

              <ActionButton onClick={() => onSpread('ARCHED_RIBBON')}>
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
