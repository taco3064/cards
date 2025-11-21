import { useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import useArchedRibbons from './useArchedRibbons';
import type { SpreadMode, SpreadOptions } from './types';

export function useSpreadCards({ cardsRef, ...options }: SpreadOptions) {
  const [spreadMode, setSpreadMode] = useState<SpreadMode>();
  const [spreading, setSpreading] = useState(false);

  const animations = {
    ARCHED_RIBBON: useArchedRibbon(options),
    ARCHED_RIBBONS: useArchedRibbons(options),
  };

  return {
    spreaded: Boolean(spreadMode),
    spreading,

    onSpreadReset: () => setSpreadMode(undefined),
    onSpread: async (mode = spreadMode) => {
      if (!mode) return;
      const animation = animations[mode];

      setSpreadMode(mode);
      setSpreading(true);
      await animation(cardsRef.current);
      setSpreading(false);
    },
  };
}
