import styled from 'styled-components';
import Button from '~app/styles/Button';
import type { CardSize } from '~app/hooks/useCardsState';

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
  Deck: styled.div<CardSize<'styled'>>`
    position: relative;
    top: -10%;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(1, 0.2, -0.5, 45deg);
    transform-origin: center;

    ${({ $width, $height }) => `
      & > * {
        position: absolute;
        top: calc(50% - ${$height / 2}px);
        left: calc(50% - ${$width / 2}px);
      }
    `}
  `,
  ShuffleButton: styled(Button.Base)`
    font-size: 14px;
    width: 120px;
  `,
  ActionButton: styled(Button.Base)`
    background: #609fc0;
    color: #fff;
    width: 60px;
    height: 60px;
    font-size: 36px;
    border-radius: 50% !important;
    margin: -10px;
    z-index: 1;
  `,
  Status: styled.span`
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 600;
    color: #b6b7b6;
  `,
};
