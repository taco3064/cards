import { useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import type { SpreadMode, SpreadOptions } from './types';
import type { CardMeta } from '../useCardsState';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadOptions<Meta>) {
  const [spreadMode, setSpreadMode] = useState<SpreadMode>();
  const [spreading, setSpreading] = useState(false);

  const animations = {
    ARCHED_RIBBON: useArchedRibbon(options),
  };

  return {
    spreaded: Boolean(spreadMode),
    spreading,

    onSpreadReset: () => setSpreadMode(undefined),
    onSpread: async (mode = spreadMode) => {
      if (!mode) return;
      const elements = getCardElements();
      const animation = animations[mode];

      setSpreadMode(mode);
      setSpreading(true);
      await animation(elements);
      setSpreading(false);
    },
  };
}
