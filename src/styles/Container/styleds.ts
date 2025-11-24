import styled from 'styled-components';
import type { FlexProps } from './types';

export default {
  Flex: styled.div<FlexProps>`
    display: flex;
    flex-direction: ${({ $direction }) => $direction || 'row'};
    align-items: ${({ $alignItems }) => $alignItems || 'center'};
    justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
    gap: ${({ $gap }) => $gap || 'inherit'};
  `,
};
