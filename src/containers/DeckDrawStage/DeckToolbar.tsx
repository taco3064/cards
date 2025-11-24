import Button from '~app/styles/Button';
import CheckIcon from '~app/components/icons/CheckIcon';
import Container from '~app/styles/Container';
import DrawCardIcon from '~app/components/icons/DrawCardIcon';
import ResetIcon from '~app/components/icons/ResetIcon';
import Typography from '~app/styles/Typography';
import type { DeckToolbarProps } from './types';

export default function DeckToolbar<Meta extends CardMeta>({
  currentDrawnCount,
  maxDrawnCount,
  status,
  onConfirm,
  onReset,
  onShuffle,
  onSpread,
}: DeckToolbarProps<Meta>) {
  return (
    <Container.Flex $direction="column">
      {status.shuffling || status.spreading ? (
        <Typography.Status>
          {status.shuffling ? 'Shuffling...' : 'Spreading...'}
        </Typography.Status>
      ) : status.spreaded ? (
        <>
          <Typography.Status>
            Alread Drawn: {currentDrawnCount} / {maxDrawnCount}
          </Typography.Status>

          <Container.Flex $direction="row">
            <Button.Icon
              $colors={{ bg: 'transparent', border: '#609fc0', text: '#609fc0' }}
              onClick={onReset}
            >
              <ResetIcon />
            </Button.Icon>

            {currentDrawnCount === maxDrawnCount && (
              <Button.Icon $colors={{ bg: '#609fc0', text: '#fff' }} onClick={onConfirm}>
                <CheckIcon />
              </Button.Icon>
            )}
          </Container.Flex>
        </>
      ) : (
        <Button.Group>
          <Button.Base onClick={() => onShuffle('OVERHAND')}>Overhand</Button.Base>

          <Button.Icon
            $colors={{ bg: '#609fc0', text: '#fff' }}
            $margin="0 -10px"
            onClick={() => onSpread('ARCHED_RIBBON')}
          >
            <DrawCardIcon />
          </Button.Icon>

          <Button.Base onClick={() => onShuffle('RIFFLE')}>Riffle</Button.Base>
        </Button.Group>
      )}
    </Container.Flex>
  );
}
