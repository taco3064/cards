import styled, { css } from 'styled-components';

import BackSvg from '~app/assets/svg/back.svg?react';
import CheckSvg from '~app/assets/svg/check.svg?react';
import DrawCardSvg from '~app/assets/svg/draw-card.svg?react';
import LogoSvg from '~app/assets/svg/logo.svg?react';
import ResetSvg from '~app/assets/svg/reset.svg?react';
import type { BaseProps } from './Icon.types';

// Every icon is this shape — sized in em so it tracks the caller's font-size,
// filled with currentColor so it tracks the caller's colour.
const base = css<BaseProps>`
  width: 1em;
  height: 1em;
  fill: currentColor;
  transform: scale(${({ $scale = 1 }) => $scale});
`;

export default {
  Base: styled.svg<BaseProps>`
    ${base}
  `,
  Back: styled(BackSvg).attrs({ className: 'BackIcon' })<BaseProps>`
    ${base}
  `,
  Check: styled(CheckSvg).attrs({ className: 'CheckIcon', $scale: 1.4 })<BaseProps>`
    ${base}
  `,
  DrawCard: styled(DrawCardSvg).attrs({
    className: 'DrawCardIcon',
    $scale: 1.6,
  })<BaseProps>`
    ${base}
  `,
  Logo: styled(LogoSvg).attrs({ className: 'LogoIcon', $scale: 1.4 })<BaseProps>`
    ${base}
  `,
  Reset: styled(ResetSvg).attrs({ className: 'ResetIcon' })<BaseProps>`
    ${base}
  `,
};
