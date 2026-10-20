import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import { useCardsState } from './useCardsState';

test('initial shuffling preserves every card and never mutates the supplied deck', () => {
  const cards = Array.from({ length: 52 }, (_, id) => ({ id }));
  const original = [...cards];

  function Harness() {
    const state = useCardsState(cards);

    expect(state.cards).not.toBe(cards);
    expect(new Set(state.cards)).toEqual(new Set(original));
    expect(cards).toEqual(original);

    return null;
  }

  for (let i = 0; i < 20; i++) {
    renderToStaticMarkup(createElement(Harness));
  }
});

test('an empty deck stays empty', () => {
  function Harness() {
    expect(useCardsState([]).cards).toEqual([]);

    return null;
  }

  renderToStaticMarkup(createElement(Harness));
});
