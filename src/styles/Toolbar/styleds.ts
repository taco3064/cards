import styled from 'styled-components';

export default {
  Base: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    min-height: 48px;
    width: 100%;
  `,
  Divider: styled.hr`
    height: 100%;
    margin: 0 8px;
    border-color: #555;
  `,
  Navbar: styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    min-height: 48px;
    width: calc(100% - 24px);
  `,
};
