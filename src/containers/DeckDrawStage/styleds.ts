import styled from 'styled-components';
import Button from '~app/styles/Button';

export default {
  ShuffleButton: styled(Button.Base)`
    font-size: 14px;
    width: 120px;
  `,
  ActionButton: styled(Button.Base)<{ $disableMargin?: boolean }>`
    width: 60px;
    height: 60px;
    font-size: 36px;
    border-radius: 50% !important;
    margin: ${({ $disableMargin }) => ($disableMargin ? '0' : '-10px')};
    z-index: 1;
  `,
};
