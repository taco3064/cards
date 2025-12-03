import styled from 'styled-components';
import type { BaseProps, ContainerWidth, FlexProps } from './types';

const BREAKPOINTS: Breakpoints<ContainerWidth> = {
  xs: 600,
  sm: 900,
  md: 1200,
  lg: 1536,
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  gap: ${({ $gap }) => $gap || 'inherit'};
  line-height: ${({ $lineHeight = 1.5 }) => $lineHeight};
`;

export default {
  Base: styled(Flex)<BaseProps>`
    width: calc(100% - 24px);
    max-width: ${({ $width }) => ($width ? `${BREAKPOINTS[$width]}px` : '100%')};
    padding: 12px 24px;
  `,
  Flex,
};
