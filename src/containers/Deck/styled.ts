import styled from 'styled-components';
import type { CardSize } from '~app/hooks/useShuffleCards';

export const CardDeck = styled.div<CardSize<'styled'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: ${({ $height }) => `${$height * 1.5}px`};
  transform-style: preserve-3d;
  transform: rotate3d(1, 0.2, -0.5, 45deg);

  & > .card {
    position: absolute;
    left: ${({ $width }) => `calc(50% - ${$width / 2}px)`};
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  min-height: 48px;

  & > button {
    padding: 8px 16px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    opacity: 1;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
