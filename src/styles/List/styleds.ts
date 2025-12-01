import styled from 'styled-components';
import type { BaseProps } from './types';

export default {
  Base: styled.ul<BaseProps>`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 4px;
    width: 100%;

    ${({ $variant = 'normal' }) => {
      switch ($variant) {
        case 'outlined':
          return `
            & > * {
              gap: 8px;
              border: 1px solid #444;
              border-radius: 8px;
              margin-bottom: 8px;
            }
          `;

        default:
          return '';
      }
    }}
  `,
  Item: styled.li`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 8px 12px;
  `,
};
