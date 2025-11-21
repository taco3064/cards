import cx from 'clsx';

import Button from '~app/styles/Button';
import CheckIcon from '~app/components/icons/CheckIcon';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Styled from './styleds';
import Toolbar from '~app/styles/Toolbar/styleds';
import Typography from '~app/styles/Typography';
import type { DeckToolbarProps } from './types';

const { ShuffleButton, ActionButton } = Styled;

export default function DeckToolbar<Meta extends CardMeta>({
  className,
  disableConfirm = false,
  status,
  onConfirm,
  onReset,
  onShuffle,
  onSpread,
}: DeckToolbarProps<Meta>) {
  return (
    <Toolbar.Base className={cx('DeckToolbar', className, status)}>
      {status.shuffling || status.spreading ? (
        <Typography.Status>
          {status.shuffling ? 'Shuffling...' : 'Spreading...'}
        </Typography.Status>
      ) : status.spreaded || status.completed ? (
        <>
          <ActionButton
            $disableMargin
            $colors={{ bg: 'transparent', border: '#609fc0', text: '#609fc0' }}
            onClick={onReset}
          >
            <ResetIcon />
          </ActionButton>

          {!disableConfirm && (
            <ActionButton
              $disableMargin
              $colors={{ bg: '#609fc0', text: '#fff' }}
              onClick={onConfirm}
            >
              <CheckIcon />
            </ActionButton>
          )}
        </>
      ) : (
        <Button.Group>
          <ShuffleButton onClick={() => onShuffle('OVERHAND')}>Overhand</ShuffleButton>

          <ActionButton
            $colors={{ bg: '#609fc0', text: '#fff' }}
            onClick={() => onSpread('ARCHED_RIBBONS')}
          >
            <DrawCardIcon />
          </ActionButton>

          <ShuffleButton onClick={() => onShuffle('RIFFLE')}>Riffle</ShuffleButton>
        </Button.Group>
      )}
    </Toolbar.Base>
  );
}
