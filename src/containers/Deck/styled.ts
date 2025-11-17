import styled from 'styled-components';
import type { CardDeckProps } from './types';

export default {
  Container: styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: calc(100% - 48px);
    height: 100%;
    padding: 12px 24px;
    gap: 24px;
    overflow: hidden;
  `,
  CardDeck: styled.div<CardDeckProps>`
    position: relative;
    top: -10%;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(1, 0.2, -0.5, 45deg);
    transform-origin: center;

    ${({ $cardClassName, $width, $height }) => `
      & > .${$cardClassName} {
        position: absolute;
        top: calc(50% - ${$height / 2}px);
        left: calc(50% - ${$width / 2}px);
      }
    `}
  `,
  Status: styled.span`
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 600;
    color: #b6b7b6;
  `,
};
