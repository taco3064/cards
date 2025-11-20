import styled from 'styled-components';

const BORDER_RADIUS = '18px';

export default {
  Base: styled.button<{ $colors?: { [K in 'bg' | 'text' | 'border']?: string } }>`
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

    ${({ $colors }) => `
      ${$colors?.bg ? `background: ${$colors.bg};` : ''}
      ${$colors?.text ? `color: ${$colors.text};` : ''}
      ${$colors?.border ? `border: 1px solid ${$colors.border};` : ''}
    `}

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
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
};
