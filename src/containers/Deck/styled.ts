import styled from 'styled-components';

import Card from '~app/components/Card';
import type { CardSize } from '~app/hooks/useCardsState';

export default {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 48px);
    height: 100%;
    padding: 12px 24px;
    gap: 24px;
    overflow: hidden;
  `,
  Deck: styled.div<CardSize<'styled'>>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: calc(100dvh / 5);
    min-height: ${({ $height }) => `${$height * 2}px`};
    transform-style: preserve-3d;
    transform: rotate3d(1, 0.2, -0.5, 45deg);
  `,
  Card: styled(Card)`
    position: absolute;
    left: ${({ size }) => `calc(50% - ${size.width / 2.5}px)`};
  `,
  Status: styled.span`
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 600;
    color: #b6b7b6;
  `,
};
