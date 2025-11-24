import styled from 'styled-components';
import type { IconButtonProps } from './types';

const BORDER_RADIUS = '18px';

const Base = styled.button<{ $colors?: { [K in 'bg' | 'text' | 'border']?: string } }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 11px 20px;
  border-radius: ${BORDER_RADIUS};
  border: none;
  cursor: pointer;
  opacity: 1;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  width: 120px;

  ${({ $colors }) => `
      ${$colors?.bg ? `background: ${$colors.bg};` : ''}
      ${$colors?.text ? `color: ${$colors.text};` : ''}
      ${$colors?.border ? `border: 1px solid ${$colors.border};` : ''}
    `}

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%);
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    filter: brightness(0.8);
  }
`;

export default {
  Base,
  Group: styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 1px;
    border-radius: ${BORDER_RADIUS};

    & > * {
      border-radius: ${BORDER_RADIUS};

      &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `,
  Icon: styled(Base)<IconButtonProps>`
    width: 60px;
    height: 60px;
    font-size: 36px;
    border-radius: 50% !important;
    z-index: 1;

    ${({ $margin }) => ($margin ? `margin: ${$margin};` : '')}
  `,
};
