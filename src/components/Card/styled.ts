import styled from 'styled-components';
import { motion } from 'motion/react';

import type { CardSize } from '~app/hooks/useCardsState';

const BaseCard = styled.div<{ $img?: string }>`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: ${({ $img }) => ($img ? `url(${$img})` : 'none')};
`;

export default {
  Container: styled(motion.div)<CardSize<'styled'>>`
    transform-style: preserve-3d;
    border-radius: ${({ $width }) => `${$width * 0.07}px`};
    width: ${({ $width }) => `${$width}px`};
    height: ${({ $height }) => `${$height}px`};
  `,
  CardBack: BaseCard,
  CardFront: styled(BaseCard)`
    background-color: #fff;
    transform: rotateY(180deg) translateZ(1px);
  `,
};
