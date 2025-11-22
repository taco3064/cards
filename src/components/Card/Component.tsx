import cx from 'clsx';

import Styled from './styleds';
import type { CardProps } from './types';

export default function Card<Meta extends CardMeta>({
  animationProps,
  children,
  className,
  imgs,
  meta,
  revealed,
  size,
  onClick,
}: CardProps<Meta>) {
  return (
    <Styled.Container
      {...animationProps}
      $size={size}
      className={cx('CardContainer', className)}
      onClick={(e) => onClick?.(e, meta)}
    >
      <Styled.CardFront className="CardFront" $img={imgs.front} $revealed={revealed}>
        {children}
      </Styled.CardFront>

      <Styled.CardBack className="CardBack" $img={imgs.back} $revealed={revealed} />
    </Styled.Container>
  );
}
