import { cut, release } from './utils';
import { usePresetAnimate } from '../useCardsAnimate';
import type { UseShuffleAnimate } from './types';

const useRiffle: UseShuffleAnimate = ({ cards, size, animate }) => {
  const $animate = usePresetAnimate(animate, { duration: 0.1 });
  const total = cards.length;
  const displX = size.width * 0.6;

  return async (elements) => {
    const result: typeof cards = [];
    let [left, right] = cut(Math.ceil(cards.length / 2), { cards, elements });

    //* 把牌堆分為左右兩半並往外撥開
    await Promise.allSettled([
      ...left.elements.map((el, i) => $animate(el, { x: -displX, z: total * 2 + i })),
      ...right.elements.map((el, i) => $animate(el, { x: displX, z: total * 2 + i })),
    ]);

    //* 左右兩邊的牌交錯落下
    while (left.elements.length || right.elements.length) {
      const [fallLeft, pinchedLeft] = cut(-release(cards), left);
      const [fallRight, pinchedRight] = cut(-release(cards), right);

      await Promise.allSettled(
        fallLeft.elements.map((_, i, arr) =>
          $animate(arr[arr.length - 1 - i], { x: 0, z: result.length + i }),
        ),
      );

      await Promise.allSettled(
        fallRight.elements.map((_, i, arr) =>
          $animate(arr[arr.length - 1 - i], {
            x: 0,
            z: result.length + fallLeft.total + i,
          }),
        ),
      );

      left = pinchedLeft;
      right = pinchedRight;
      result.unshift(...fallRight.cards, ...fallLeft.cards);
    }

    return result;
  };
};

export default useRiffle;
