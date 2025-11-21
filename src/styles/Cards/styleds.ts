import styled from 'styled-components';
import { motion } from 'motion/react';

import type { DeckProps } from './types';

export default {
  Deck: styled(motion.div)<DeckProps>`
    position: relative;
    top: -10%;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform-origin: center;

    ${({ $width, $height, $selector = '> *', $selectionClasses }) => `
      & ${$selector} {
        position: absolute;
        top: calc(50% - ${$height / 2}px);
        left: calc(50% - ${$width / 2}px);

        &.${$selectionClasses?.drawable || 'drawable'}:hover {
          cursor: pointer;
          border: 3px solid white;
        }

        &.${$selectionClasses?.drawn || 'drawn'} {
          cursor: pointer;
          filter: brightness(1.5);
          border: 3px solid white;
        }
      }
    `}
  `,
};
