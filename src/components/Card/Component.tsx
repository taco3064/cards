import cx from 'clsx';

import { CardRoot, CardFront, CardBack } from './styled';
import type { CardMeta, CardProps } from './types';

export default function Card<Meta extends CardMeta>({
  animationProps,
  backImg,
  className,
  classes,
  meta,
  onClick,
}: CardProps<Meta>) {
  return (
    <CardRoot
      {...animationProps}
      className={cx(classes?.root, className)}
      onClick={(e) => onClick?.(e, meta)}
    >
      <CardFront className={classes?.front} />
      <CardBack className={classes?.back} $backImg={backImg} />
    </CardRoot>
  );
}
