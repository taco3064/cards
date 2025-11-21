import type { useShuffleCards } from '~app/hooks/useShuffleCards';
import type { useSpreadCards } from '~app/hooks/useSpreadCards';

export interface DeckDrawStageProps<Meta extends CardMeta> extends BaseStageProps<Meta> {
  maxDrawnCount: number;
  onComplete: (drawnCards: Meta[]) => void;
  onDeckChange: (cards: Meta[]) => void;
  onReset: () => void;
}

export interface DeckToolbarProps<Meta extends CardMeta> {
  className?: string;
  disableConfirm?: boolean;
  status: Record<'shuffling' | 'spreading' | 'spreaded', boolean>;
  onConfirm: () => void;
  onReset: () => void;
  onShuffle: ReturnType<typeof useShuffleCards<Meta>>['onShuffle'];
  onSpread: ReturnType<typeof useSpreadCards>['onSpread'];
}
