import styled from 'styled-components';
import { motion } from 'motion/react';

export const CardRoot = styled(motion.div)`
  width: 135px;
  height: 195px;
  border-radius: 12px;
  transform-style: preserve-3d;
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
  background-image: url(${(props) => props.$backImg});
  background-size: cover;
`;
