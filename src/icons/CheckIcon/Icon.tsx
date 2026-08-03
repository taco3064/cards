import cx from 'clsx';
import Icon, { type IconBaseProps } from '~app/styles/Icon';

import Svg from './icon.svg?react';

export default function CheckIcon({ className, ...props }: IconBaseProps) {
  return (
    <Icon.Base
      {...props}
      as={Svg}
      className={cx('CheckIcon', className)}
      $scale={1.4}
    />
  );
}
