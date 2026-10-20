import styled from 'styled-components';
import { motion } from 'motion/react';

export default {
  Container: styled.div`
    height: 4px;
    width: 100%;
    background: inherit;
  `,
  Slider: styled(motion.div)<{ $barWidth: number; $color: string }>`
    width: ${({ $barWidth }) => $barWidth}px;
    height: 100%;
    background: ${({ $color }) => $color};
  `,
};
