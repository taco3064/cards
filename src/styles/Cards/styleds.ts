import styled from 'styled-components';
import { motion } from 'motion/react';

import type { DeckProps } from './types';

export default {
  Deck: styled(motion.div)<DeckProps>`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
    transform-origin: center;

    ${({ $position: { top, bottom, left, right, zIndex } = {} }) => `
      ${top ? `top: ${top};` : !bottom ? 'top: 50%;' : ''}
      ${left ? `left: ${left};` : !right ? 'left: 50%;' : ''}
      ${bottom ? `bottom: ${bottom};` : ''}
      ${right ? `right: ${right};` : ''}
      z-index: ${zIndex || 0};
    `}

    ${({ $size, $selector = '> *', $selectionClasses }) => `
      & ${$selector} {
        position: absolute;
        top: calc(50% - ${$size.height / 2}px);
        left: calc(50% - ${$size.width / 2}px);

        &.${$selectionClasses?.drawable || 'drawable'}:hover {
          cursor: pointer;
          
          & > .target {
            filter: brightness(1.2);
          }
        }

        &.${$selectionClasses?.drawn || 'drawn'} {
          cursor: pointer;

          & > .target {
            filter: brightness(1.5);
          }
        }
      }
    `}
  `,
};
