import { useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import type { AnimationMode, SpreadAnimations, SpreadCardsOptions, Utils } from './types';
import type { CardMeta } from '../useCardsState';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadCardsOptions<Meta>) {
  const [spreadMode, setSpreadMode] = useState<AnimationMode>();
  const [spreading, setSpreading] = useState(false);

  const animations: SpreadAnimations = {
    ARCHED_RIBBON: useArchedRibbon(options),
  };

  const utils: Utils = {
    split(elements, rows) {
      const total = elements.length;
      const base = Math.floor(total / rows);
      const extra = total % rows; // 前 extra 份多分 1 個
      const result: HTMLElement[][] = [];

      for (let i = 0, start = 0; i < rows; i++) {
        const count = base + (rows - i <= extra ? 1 : 0);

        result.push(elements.slice(start, start + count));
        start += count;
      }

      return result;
    },
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
      await animation(elements, utils);
      setSpreading(false);
    },
  };
}
