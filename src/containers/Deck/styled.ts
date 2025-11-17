import styled from 'styled-components';
import type { CardSize } from '~app/hooks/useShuffleCards';

export const CardDeck = styled.div<CardSize<'styled'>>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 48px;
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
  gap: 8px;
  margin-top: auto;
  min-height: 48px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  opacity: 1;
  font-size: 16px;
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Status = styled.span`
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 600;
  color: #555;
`;
