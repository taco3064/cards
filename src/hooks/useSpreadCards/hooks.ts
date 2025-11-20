import { useEffect, useRef, useImperativeHandle, useState } from 'react';

import useArchedRibbon from './useArchedRibbon';
import { useBreakpoint } from '../useBreakpoint';
import type { CardMeta } from '../useCardsState';

import type {
  HandlerRef,
  SpreadCardsOptions,
  SpreadHandlers,
  SpreadMode,
  Utils,
} from './types';

export function useSpreadCards<Meta extends CardMeta>({
  getCardElements,
  ...options
}: SpreadCardsOptions<Meta>) {
  const [spreading, setSpreading] = useState(false);

  const spreads: SpreadHandlers = {
    ARCHED_RIBBON: useArchedRibbon(options),
  };

  const utils: Utils = {
    split(elements, rows) {
      const total = elements.length;
      const base = Math.floor(total / rows);
      const extra = total % rows; // 前 extra 份多分 1 個
      const result: Element[][] = [];

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

    ...useSpreadCardsRWD(async (mode: SpreadMode) => {
      const elements = getCardElements();
      const spread = spreads[mode];

      setSpreading(true);
      await spread(elements, utils);
      setSpreading(false);
    }),
  };
}

function useSpreadCardsRWD(onSpread: HandlerRef['handler']) {
  const breakpoint = useBreakpoint();
  const handlerRef = useRef<HandlerRef>(null);
  const [spreaded, setSpreaded] = useState<SpreadMode>();

  useImperativeHandle(
    handlerRef,
    () => ({
      spreaded,
      handler: onSpread,
    }),
    [spreaded, onSpread],
  );

  useEffect(() => {
    const { spreaded, handler } = handlerRef.current || {};

    if (spreaded) {
      handler?.(spreaded);
    }
  }, [breakpoint]);

  return {
    spreaded: Boolean(spreaded),

    onSpreadReset: () => setSpreaded(undefined),
    onSpread: async (mode: SpreadMode) => {
      setSpreaded(mode);
      await onSpread(mode);
    },
  };
}
