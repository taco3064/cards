import { useCallback } from 'react';

import type { CardMeta } from '../useCardsState';
import type { HandlerOptions, OverrideAnimate, ShuffleHandler } from './types';

export default function useOverhand<Meta extends CardMeta>({
  cards,
  duration,
  size,
  animate,
}: HandlerOptions<Meta>): ShuffleHandler<Meta> {
  const total = cards.length;
  const displY = size.height * 1.2;

  const anim = useCallback<OverrideAnimate>(
    (...args) => animate(...args, { duration }),
    [animate, duration],
  );

  return async (elements, { getRelease, getSplited }) => {
    const result: Meta[] = [];

    while (cards.length) {
      const pinched = getSplited(cards, elements, 0, getRelease(cards));

      await Promise.allSettled([
        ...pinched.elements.map((el, i) => {
          const z = {
            fm: total - i,
            to: total - (i + elements.length),
          };

          return anim(el, { y: 0, z: [z.fm, z.to] });
        }),

        ...elements.map((el, i) => {
          const z = {
            fm: total - (i + pinched.total),
            to: total - i,
          };

          return anim(el, { y: [0, displY, displY, 0], z: [z.fm, z.fm, z.to, z.to] });
        }),
      ]);

      result.unshift(...pinched.cards);
    }

    result.unshift(...cards);

    return result;
  };
}
