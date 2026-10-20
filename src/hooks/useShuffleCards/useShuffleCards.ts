import { useState } from 'react';

import type { PreseteAnimate } from '../useCardsAnimate';
import type {
  DeckPile,
  ShuffleMode,
  ShuffleOptions,
  UseShuffleAnimate,
} from './ShuffleCards.types';

export function useShuffleCards<Meta extends CardMeta>({
  cardsRef,
  onCardsChange,
  ...options
}: ShuffleOptions<Meta>) {
  const [shuffling, setShuffling] = useState(false);

  const animations = {
    OVERHAND: createOverhand(options),
    RIFFLE: createRiffle(options),
  };

  return {
    shuffling,

    async onShuffle(mode: ShuffleMode) {
      const animation = animations[mode];

      setShuffling(true);
      onCardsChange(await animation(cardsRef.current));
      setShuffling(false);
    },
  };
}

function release<Meta extends CardMeta>(cards: Meta[]) {
  const base = Math.ceil(cards.length / 5);

  return Math.ceil(Math.random() * base);
}

function cut<Meta extends CardMeta>(
  start: number,
  { cards, elements }: Pick<DeckPile<Meta>, 'cards' | 'elements'>,
): [DeckPile<Meta>, DeckPile<Meta>] {
  if (cards.length !== elements.length) {
    throw new Error('Cards and elements length mismatch');
  } else if (!start) {
    throw new Error('Start index must not be 0');
  }

  const temp = { cards: [...cards], elements: [...elements] };

  const cutted = {
    cards: temp.cards.splice(start),
    elements: temp.elements.splice(start),
  };

  return [
    { ...cutted, total: cutted.cards.length },
    { ...temp, total: temp.cards.length },
  ];
}

const createOverhand: UseShuffleAnimate = ({ cards, size, animate }) => {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.2 });
  const total = cards.length;
  const displY = size.height * 1.2;

  return async (elements) => {
    const result: typeof cards = [];
    let deck: DeckPile<(typeof cards)[number]> = { cards, elements, total };

    do {
      const [drawn, pinched] = cut(release(cards) + 3, deck);

      await Promise.allSettled([
        //* 捏住的牌往下掉
        ...pinched.elements.map((el, i) =>
          $animate(el, { z: total - (i + drawn.elements.length) }),
        ),

        //* 抽出的牌往上疊加
        ...drawn.elements.map((el, i) => {
          const z = {
            fm: total - (i + pinched.total),
            to: total - i,
          };

          return $animate(el, { y: [0, displY, displY, 0], z: [z.fm, z.fm, z.to, z.to] });
        }),
      ]);

      deck = drawn;
      result.unshift(...pinched.cards);
    } while (deck.total);

    return result;
  };
};

const createRiffle: UseShuffleAnimate = ({ cards, size, animate }) => {
  const $animate: PreseteAnimate = (...args) => animate(...args, { duration: 0.1 });
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
