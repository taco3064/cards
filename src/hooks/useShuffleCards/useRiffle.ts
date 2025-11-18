import { useCallback } from 'react';

import type { CardMeta } from '../useCardsState';
import type { HandlerOptions, OverrideAnimate, ShuffleHandler } from './types';

export default function useRiffle<Meta extends CardMeta>({
  cards,
  duration,
  size,
  animate,
}: HandlerOptions<Meta>): ShuffleHandler<Meta> {
  const total = cards.length;
  const displX = size.width * 0.6;

  const anim = useCallback<OverrideAnimate>(
    (...args) => animate(...args, { duration: duration / 2 }),
    [animate, duration],
  );

  return async (elements, { getRelease, getSplited }) => {
    const left = getSplited(cards, elements, 0, Math.ceil(cards.length / 2));
    const result: Meta[] = [];

    await Promise.allSettled([
      ...left.elements.map((el, i) =>
        anim(el, { x: [0, -displX], z: [total - i, total * 2 + i] }),
      ),
      ...elements.map((el, i) =>
        anim(el, { x: [0, displX], z: [total - (i + left.total), total * 2 + i] }),
      ),
    ]);

    while (left.elements.length || elements.length) {
      const fall = {
        left: getSplited(
          left.cards,
          left.elements,
          Math.max(0, left.elements.length - getRelease(cards) - 1),
        ),
        right: getSplited(
          cards,
          elements,
          Math.max(0, elements.length - getRelease(cards) - 1),
        ),
      };

      await Promise.allSettled(
        fall.left.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + i };

          return anim(el, { x: [-displX, 0], z: [z.fm, z.to] });
        }),
      );

      await Promise.allSettled(
        fall.right.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + fall.left.total + i };

          return anim(el, { x: [displX, 0], z: [z.fm, z.to] });
        }),
      );

      result.unshift(...fall.right.cards, ...fall.left.cards);
    }

    return result;
  };
}
