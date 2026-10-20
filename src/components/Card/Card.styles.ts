import styled from 'styled-components';
import { motion } from 'motion/react';

const CardBack = styled.div<{ $img?: string; $revealed?: boolean }>`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: ${({ $img }) => ($img ? `url(${$img})` : 'none')};
  transform: ${({ $revealed }) =>
    $revealed ? 'rotateY(180deg) translateZ(1px)' : 'rotateY(0deg) translateZ(0px)'};
`;

export default {
  Container: styled(motion.div)<{ $size: CardSize }>`
    transform-style: preserve-3d;
    transform-origin: center;
    border-radius: ${({ $size }) => `${$size.width * 0.07}px`};
    width: ${({ $size }) => `${$size.width}px`};
    height: ${({ $size }) => `${$size.height}px`};
  `,
  CardBack,
  CardFront: styled(CardBack)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #888;
    background-color: #ddd;
    transform: ${({ $revealed }) =>
      $revealed ? 'rotateY(0deg) translateZ(0px)' : 'rotateY(180deg) translateZ(1px)'};
  `,
};
