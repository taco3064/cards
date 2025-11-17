import type { CardMeta } from '../useCardsState';
import type { ShuffleHandlerHook } from './types';

const useRiffle: ShuffleHandlerHook = (
  { cards, duration, size, animate, getCardElements },
  { getRelease, getSplited },
) => {
  const animateOptions = { duration: duration / 2 };

  return async () => {
    const elements = getCardElements();
    const x = size.width * 0.6;
    const total = cards.length;
    const left = getSplited(cards, elements, 0, Math.ceil(cards.length / 2));
    const result: CardMeta[] = [];

    await Promise.allSettled([
      ...left.elements.map((el, i) =>
        animate(el, { x: [0, -x], z: [-i, total - i] }, animateOptions),
      ),
      ...elements.map((el, i) =>
        animate(el, { x: [0, x], z: [-(i + left.total), total - i] }, animateOptions),
      ),
    ]);

    while (left.elements.length || elements.length) {
      const baseZ = -(total - result.length - 1);

      const leftFall = getSplited(
        left.cards,
        left.elements,
        Math.max(0, left.elements.length - getRelease(cards) - 1),
      );

      const rightFall = getSplited(
        cards,
        elements,
        Math.max(0, elements.length - getRelease(cards) - 1),
      );

      await Promise.allSettled(
        leftFall.elements.map((el, i) => {
          const z = { fm: total - i, to: baseZ + i };

          return animate(el, { x: [-x, 0], z: [z.fm, z.to] }, animateOptions);
        }),
      );

      await Promise.allSettled(
        rightFall.elements.map((el, i) => {
          const z = { fm: total - i, to: baseZ + leftFall.total + i };

          return animate(el, { x: [x, 0], z: [z.fm, z.to] }, animateOptions);
        }),
      );

      result.unshift(...rightFall.cards, ...leftFall.cards);
    }

    return result;
  };
};

export default useRiffle;
