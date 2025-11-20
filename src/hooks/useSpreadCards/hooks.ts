import { useEffect, useRef, useImperativeHandle, useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import { useBreakpoint } from '../useBreakpoint';
import type { CardMeta } from '../useCardsState';

import type {
  AnimationMode,
  SpreadAnimations,
  SpreadCardsOptions,
  SpreadHandler,
  Utils,
} from './types';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadCardsOptions<Meta>) {
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
    spreading,

    ...useResponsiveSpread(async (mode: AnimationMode) => {
      const elements = getCardElements();
      const animation = animations[mode];

      setSpreading(true);
      await animation(elements, utils);
      setSpreading(false);
    }),
  };
}

function useResponsiveSpread(onSpread: SpreadHandler) {
  const breakpoint = useBreakpoint();
  const handlerRef = useRef<SpreadHandler>(null);
  const [spreadMode, setSpreadMode] = useState<AnimationMode>();

  useImperativeHandle(handlerRef, () => onSpread, [onSpread]);

  useEffect(() => {
    if (spreadMode) {
      handlerRef.current?.(spreadMode);
    }
  }, [breakpoint, spreadMode]);

  return {
    spreaded: Boolean(spreadMode),
    onSpread: (mode?: AnimationMode) => setSpreadMode(mode),
  };
}
