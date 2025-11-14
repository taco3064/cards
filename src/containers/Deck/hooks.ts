import { useState } from 'react';
import type { DemoMeta } from './types';

const MAX_CARD_COUNT = 52;

export function useCardsState() {
  return useState<DemoMeta[]>(
    Array.from({ length: MAX_CARD_COUNT }).map((_, i) => ({
      id: `card-${i + 1}`,
    })),
  );
}

export function useOverhandShuffle(handleChange: () => Promise<void>) {
  const [shuffling, setShuffling] = useState(false);

  const onShuffle = async () => {
    if (shuffling) {
      return;
    }

    setShuffling(true);
    await handleChange();
    setShuffling(false);
  };

  return {
    shuffling,
    onShuffle,
  };
}
