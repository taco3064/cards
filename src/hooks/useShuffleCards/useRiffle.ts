import { usePresetAnimate } from '../usePresetAnimate';
import type { UseShuffleHandler } from './types';

const useRiffle: UseShuffleHandler = ({ cards, duration, size, animate }) => {
  const presetAnim = usePresetAnimate(animate, { duration: duration / 2 });
  const total = cards.length;
  const displX = size.width * 0.6;

  return async (elements, { release, cut }) => {
    const left = cut(cards, elements, 0, Math.ceil(cards.length / 2));
    const result: typeof cards = [];

    await Promise.allSettled([
      ...left.elements.map((el, i) =>
        presetAnim(el, { x: [0, -displX], z: [total - i, total * 2 + i] }),
      ),
      ...elements.map((el, i) =>
        presetAnim(el, {
          x: [0, displX],
          z: [total - (i + left.total), total * 2 + i],
        }),
      ),
    ]);

    while (left.elements.length || elements.length) {
      const fall = {
        left: cut(
          left.cards,
          left.elements,
          Math.max(0, left.elements.length - release(cards) - 1),
        ),
        right: cut(cards, elements, Math.max(0, elements.length - release(cards) - 1)),
      };

      await Promise.allSettled(
        fall.left.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + i };

          return presetAnim(el, { x: [-displX, 0], z: [z.fm, z.to] });
        }),
      );

      await Promise.allSettled(
        fall.right.elements.reverse().map((el, i) => {
          const z = { fm: total * 2 + i, to: result.length + fall.left.total + i };

          return presetAnim(el, { x: [displX, 0], z: [z.fm, z.to] });
        }),
      );

      result.unshift(...fall.right.cards, ...fall.left.cards);
    }

    return result;
  };
};

export default useRiffle;
