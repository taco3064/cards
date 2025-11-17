import type { CardMeta } from '../useCardsState';
import type { GetShuffleHandlers } from './types';

export const getShuffleHandlers: GetShuffleHandlers = (
  { cards, duration, selector, size },
  scopeEl,
  animate,
) => {
  const elements = getCardElements(scopeEl, selector);
  const base = getRandomBase(cards);
  const animOpts = { duration };

  return {
    async overhand() {
      const y = size.height * 1.2;
      const result: CardMeta[] = [];

      while (cards.length > base) {
        const pinched = getSplited(cards, elements, 0, Math.ceil(Math.random() * base));

        await Promise.allSettled([
          ...pinched.elements.map((el, i) => {
            const z = { fm: -i, to: -(i + elements.length) };

            return animate(el, { y: 0, z: [z.fm, z.to] }, animOpts);
          }),

          ...elements.map((el, i) => {
            const z = { fm: -(i + pinched.total), to: -i };

            return animate(
              el,
              { y: [0, y, y, 0], z: [z.fm, z.fm, z.to, z.to] },
              animOpts,
            );
          }),
        ]);

        result.unshift(...pinched.cards);
      }

      result.unshift(...cards);

      return result;
    },

    async riffle() {
      const x = size.width * 0.6;
      const total = cards.length;
      const left = getSplited(cards, elements, 0, Math.ceil(cards.length / 2));
      const result: CardMeta[] = [];

      await Promise.allSettled([
        ...left.elements.map((el, i) =>
          animate(el, { x: [-x, -x], z: [-i, total - i] }, animOpts),
        ),
        ...elements.map((el, i) =>
          animate(el, { x: [x, x], z: [-(i + left.total), total - i] }, animOpts),
        ),
      ]);

      while (left.elements.length || elements.length) {
        const baseZ = -(total - result.length - 1);

        const leftFall = getSplited(
          left.cards,
          left.elements,
          Math.max(0, left.elements.length - Math.ceil(Math.random() * base) - 1),
        );

        const rightFall = getSplited(
          cards,
          elements,
          Math.max(0, elements.length - Math.ceil(Math.random() * base) - 1),
        );

        await Promise.allSettled(
          leftFall.elements.map((el, i) => {
            const z = { fm: total - i, to: baseZ + i };

            return animate(el, { x: [-x, 0], z: [z.fm, z.to] }, animOpts);
          }),
        );

        await Promise.allSettled(
          rightFall.elements.map((el, i) => {
            const z = { fm: total - i, to: baseZ + leftFall.total + i };

            return animate(el, { x: [x, 0], z: [z.fm, z.to] }, animOpts);
          }),
        );

        result.unshift(...rightFall.cards, ...leftFall.cards);
      }

      return result;
    },
  };
};

function getRandomBase(cards: CardMeta[]) {
  return Math.ceil(cards.length / 5);
}

function getSplited(
  cards: CardMeta[],
  elements: Element[],
  start: number,
  deleteCount: number = cards.length,
) {
  if (cards.length !== elements.length) {
    throw new Error('Cards and elements length mismatch');
  }

  return {
    total: deleteCount - start,
    cards: cards.splice(start, deleteCount),
    elements: elements.splice(start, deleteCount),
  };
}

function getCardElements(scopeEl: HTMLElement, selector: string) {
  if (!scopeEl) {
    throw new Error('Scope element is not defined');
  }

  return Array.from(scopeEl.querySelectorAll(selector));
}
