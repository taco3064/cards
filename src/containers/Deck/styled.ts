import styled from 'styled-components';

import Card from '~app/components/Card';
import type { DeckCardProps } from './types';

export const DeckRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 320px;

  & > .card {
    position: absolute;
    left: calc(50% - 70px);
  }
`;

export const DeckCard = styled(Card)<DeckCardProps>`
  z-index: ${({ index, total }) => total - index};
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  min-height: 48px;
`;
