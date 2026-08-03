import cx from 'clsx';
import Icon, { type IconBaseProps } from '~app/styles/Icon';

import Svg from './icon.svg?react';

export default function LogoIcon({ className, ...props }: IconBaseProps) {
  return (
    <Icon.Base
      {...props}
      as={Svg}
      className={cx('LogoIcon', className)}
      $scale={1.4}
    />
  );
}
