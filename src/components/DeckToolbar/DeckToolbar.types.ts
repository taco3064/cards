import type { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { useSpreadCards } from '~app/hooks/useSpreadCards';

export interface DeckToolbarProps<Meta extends CardMeta> {
  maxDrawnCount: number;
  currentDrawnCount: number;
  status: Record<'shuffling' | 'spreading' | 'spreaded', boolean>;
  onConfirm: () => void;
  onReset: () => void;
  onShuffle: ReturnType<typeof useShuffleCards<Meta>>['onShuffle'];
  onSpread: ReturnType<typeof useSpreadCards>['onSpread'];
}
