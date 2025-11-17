import styled from 'styled-components';
import { motion } from 'motion/react';

import type { CardSize } from '~app/hooks/useShuffleCards';

export const CardRoot = styled(motion.div)<CardSize<'styled'>>`
  transform-style: preserve-3d;
  border-radius: ${({ $width }) => `${$width * 0.07}px`};
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
`;

export const CardFront = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color: #fff;
  transform: rotateY(180deg) translateZ(1px);
`;

export const CardBack = styled.div<{ $backImg: string }>`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-image: url(${({ $backImg }) => $backImg});
  background-size: cover;
`;
