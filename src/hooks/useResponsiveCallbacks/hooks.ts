import { useEffect, useEffectEvent } from 'react';

import { useBreakpoint } from '../useBreakpoint';
import type { ResponsiveCallback } from './types';

export function useResponsiveCallbacks(
  mode: 'parallel' | 'sequential',
  callbacks: ResponsiveCallback[],
  enabled = true,
) {
  const breakpoint = useBreakpoint();

  const run = useEffectEvent(() => {
    (async () => {
      const $callbacks = enabled ? callbacks : [];

      if (mode === 'sequential') {
        for (const callback of $callbacks) {
          await callback();
        }
      } else {
        Promise.all($callbacks.map((callback) => callback()));
      }
    })();
  });

  useEffect(() => {
    run();
  }, [breakpoint, mode]);
}
