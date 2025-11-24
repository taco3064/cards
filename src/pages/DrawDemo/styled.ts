import styled from 'styled-components';
import Toolbar from '~app/styles/Toolbar/styleds';

export default {
  Toolbar: styled(Toolbar.Base)<{ $zIndex: number }>`
    position: fixed;
    bottom: 8px;
    left: 0;
    width: 100%;
    z-index: ${({ $zIndex }) => $zIndex};
  `,
};
