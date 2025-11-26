import styled from 'styled-components';

import { BREAKPOINTS, type Breakpoint } from '../GlobalStyle';
import type { FlexProps } from './types';

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  gap: ${({ $gap }) => $gap || 'inherit'};
`;

export default {
  Base: styled(Flex)<{ $width?: Breakpoint }>`
    max-width: ${({ $width }) => ($width ? `${BREAKPOINTS[$width]}px` : '100%')};
    padding: 12px 24px;
  `,
  Flex,
};
