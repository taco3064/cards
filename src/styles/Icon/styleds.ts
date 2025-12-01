import styled from 'styled-components';
import type { BaseProps } from './types';

export default {
  Base: styled.svg<BaseProps>`
    width: 1em;
    height: 1em;
    fill: currentColor;
    transform: scale(${({ $scale = 1 }) => $scale});
  `,
};
