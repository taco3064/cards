import cx from 'clsx';

import { CardRoot, CardFront, CardBack } from './styled';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { CardProps } from './types';

export default function Card<Meta extends CardMeta>({
  animationProps,
  backImg,
  className,
  classes,
  meta,
  size,
  onClick,
}: CardProps<Meta>) {
  return (
    <CardRoot
      {...animationProps}
      $width={size.width}
      $height={size.height}
      data-id={meta.id}
      className={cx('card', classes?.root, className)}
      onClick={(e) => onClick?.(e, meta)}
    >
      <CardFront className={classes?.front} />
      <CardBack className={classes?.back} $backImg={backImg} />
    </CardRoot>
  );
}
