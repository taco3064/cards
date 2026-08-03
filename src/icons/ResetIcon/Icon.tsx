import cx from 'clsx';
import Icon, { type IconBaseProps } from '~app/styles/Icon';

import Svg from './icon.svg?react';

export default function ResetIcon({ className, ...props }: IconBaseProps) {
  return (
    <Icon.Base
      {...props}
      as={Svg}
      className={cx('ResetIcon', className)}
    />
  );
}
