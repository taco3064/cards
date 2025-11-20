import cx from 'clsx';

import Styled from './styled';
import type { CardMeta } from '~app/hooks/useCardsState';
import type { CardProps } from './types';

export default function Card<Meta extends CardMeta>({
  animationProps,
  children,
  className,
  imgs,
  meta,
  size,
  onClick,
}: CardProps<Meta>) {
  return (
    <Styled.Container
      {...animationProps}
      $width={size.width}
      $height={size.height}
      className={cx('CardContainer', className)}
      data-id={meta.id}
      onClick={(e) => onClick?.(meta, e)}
    >
      <Styled.CardFront className="CardFront" $img={imgs.front}>
        {children}
      </Styled.CardFront>

      <Styled.CardBack className="CardBack" $img={imgs.back} />
    </Styled.Container>
  );
}
