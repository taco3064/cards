import type { Animate, ShuffleCardsOptions } from './types';
import type { CardMeta } from '../useCardsState';

export async function getOverhandCards<ScopeEl extends HTMLElement>(
  scopeEl: ScopeEl,
  { cards, duration, selector, size }: ShuffleCardsOptions,
  animate: Animate,
) {
  const elements = getCardElements<ScopeEl>(scopeEl, selector);
  const base = Math.ceil(cards.length / 5);
  const y = size.height * 1.2;
  const result: CardMeta[] = [];

  while (cards.length > base) {
    const splitAt = Math.ceil(Math.random() * base);
    const pinched = elements.splice(0, splitAt);

    await Promise.allSettled([
      ...pinched.map((el, i) => {
        const z = { fm: -i, to: -(i + elements.length) };

        return animate(el, { y: 0, z: [z.fm, z.to] }, { duration });
      }),
      ...elements.map((el, i) => {
        const z = { fm: -(i + splitAt), to: -i };

        return animate(
          el,
          { y: [0, y, y, 0], z: [z.fm, z.fm, z.to, z.to] },
          { duration },
        );
      }),
    ]);

    result.unshift(...cards.splice(0, splitAt));
  }

  result.unshift(...cards);

  return result;
}

function getCardElements<ScopeEl extends HTMLElement>(
  scopeEl: ScopeEl,
  selector: string,
) {
  if (!scopeEl) {
    throw new Error('Scope element is not defined');
  }

  return Array.from(scopeEl.querySelectorAll(selector));
}
