import type { ArraySlice } from 'type-fest';
import type { RefObject } from 'react';
import type { useAnimate } from 'motion/react';

export type Animate = ReturnType<typeof useAnimate>[1];

export type CardsRef<CardEl extends HTMLElement = HTMLElement> = RefObject<
  readonly CardEl[]
>;

export interface PreseteAnimate {
  (...[elements, keyframes]: ArraySlice<Parameters<Animate>, 0, 2>): ReturnType<Animate>;
}
