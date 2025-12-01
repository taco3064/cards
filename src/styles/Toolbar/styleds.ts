import styled from 'styled-components';
import type { NavbarProps } from './types';

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
  Navbar: styled.nav<NavbarProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    min-height: 48px;
    width: calc(100% - 24px);

    ${({ $colors }) => `
      ${$colors?.bg ? `background: ${$colors.bg};` : ''}
      ${$colors?.text ? `color: ${$colors.text};` : ''}
      ${$colors?.border ? `border: 1px solid ${$colors.border};` : ''}
    `}

    ${({ $position: { top, bottom, left, right, zIndex, variant } = {} }) => `
      position: ${variant};
      ${top != null ? `top: ${top};` : !bottom ? 'top: 50%;' : ''}
      ${left != null ? `left: ${left};` : !right ? 'left: 50%;' : ''}
      ${bottom != null ? `bottom: ${bottom};` : ''}
      ${right != null ? `right: ${right};` : ''}
      z-index: ${zIndex || 0};
    `}
  `,
};
