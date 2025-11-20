import { usePresetAnimate } from '../usePresetAnimate';
import type { UseShuffleHandler } from './types';

const useOverhand: UseShuffleHandler = ({ cards, duration, size, animate }) => {
  const presetAnim = usePresetAnimate(animate, { duration });
  const total = cards.length;
  const displY = size.height * 1.2;

  return async (elements, { release, cut }) => {
    const result: typeof cards = [];

    while (cards.length) {
      const pinched = cut(cards, elements, 0, release(cards) + 3);

      await Promise.allSettled([
        ...pinched.elements.map((el, i) => {
          const z = {
            fm: total - i,
            to: total - (i + elements.length),
          };

          return presetAnim(el, { y: 0, z: [z.fm, z.to] });
        }),

        ...elements.map((el, i) => {
          const z = {
            fm: total - (i + pinched.total),
            to: total - i,
          };

          return presetAnim(el, {
            y: [0, displY, displY, 0],
            z: [z.fm, z.fm, z.to, z.to],
          });
        }),
      ]);

      result.unshift(...pinched.cards);
    }

    return result;
  };
};

export default useOverhand;
