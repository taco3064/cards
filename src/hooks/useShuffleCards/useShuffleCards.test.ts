import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, expect, test, vi } from 'vitest';

import { useShuffleCards } from './useShuffleCards';
import type { Animate } from '../useCardsAnimate';

afterEach(() => vi.restoreAllMocks());

test.each(['OVERHAND', 'RIFFLE'] as const)(
  '%s preserves cards, input order and animation element identities',
  async (mode) => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const cards = Array.from({ length: 12 }, (_, id) => ({ id }));
    const original = [...cards];
    const elements = cards.map(() => ({} as HTMLElement));
    const animate = vi.fn().mockResolvedValue(undefined);
    const onCardsChange = vi.fn();
    let api!: ReturnType<typeof useShuffleCards>;

    function Harness() {
      api = useShuffleCards({
        cards,
        cardsRef: { current: elements },
        size: { width: 100, height: 200 },
        animate: animate as unknown as Animate,
        onCardsChange,
      });

      return null;
    }

    renderToStaticMarkup(createElement(Harness));
    await api.onShuffle(mode);

    expect(onCardsChange).toHaveBeenCalledTimes(1);
    const shuffled = onCardsChange.mock.calls[0][0];

    expect(shuffled).toHaveLength(cards.length);
    expect(new Set(shuffled)).toEqual(new Set(cards));
    expect(cards).toEqual(original);
    expect(animate).toHaveBeenCalled();

    for (const [element, , options] of animate.mock.calls) {
      expect(elements).toContain(element);
      expect(options).toEqual({ duration: mode === 'OVERHAND' ? 0.2 : 0.1 });
    }
  },
);
