import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test, vi } from 'vitest';

import { useSpreadCards } from './useSpreadCards';
import type { Animate } from '../useCardsAnimate';

vi.mock('../useBreakpoint', () => ({
  useBreakpointMatches: (values: Record<string, number>) => ({ matched: values.xs }),
}));

test.each(['STRAIGHT', 'HAND_FAN', 'ARCHED_RIBBON'] as const)(
  '%s animates every card in sequence without changing the supplied collection',
  async (mode) => {
    const elements = Array.from({ length: 10 }, () => ({} as HTMLElement));
    const original = [...elements];
    const animate = vi.fn().mockResolvedValue(undefined);
    let api!: ReturnType<typeof useSpreadCards>;

    function Harness() {
      api = useSpreadCards({
        cardsRef: { current: elements },
        size: { width: 100, height: 200 },
        animate: animate as unknown as Animate,
      });

      return null;
    }

    renderToStaticMarkup(createElement(Harness));
    await api.onSpread(mode);

    expect(animate).toHaveBeenCalledTimes(elements.length);
    expect(elements).toEqual(original);

    animate.mock.calls.forEach(([targets, position, options], index) => {
      expect(targets).toEqual(elements.slice(0, elements.length - index));
      expect(Object.values(position).every(Number.isFinite)).toBe(true);
      expect(options.duration).toBe(mode === 'ARCHED_RIBBON' ? 0.01 : 0.1);
    });

    if (mode === 'STRAIGHT') {
      expect(animate.mock.calls[0][1]).toEqual({ x: -40, y: -30, rotate: 0 });
      expect(animate.mock.calls[5][1]).toEqual({ x: -40, y: 30, rotate: 0 });
    }
  },
);
