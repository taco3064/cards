import styled from 'styled-components';

export default {
  Base: styled.button`
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
  `,
};
