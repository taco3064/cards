import type { CardProps } from '~app/components/Card';

export interface DemoMeta {
  transform?: string[];
  id: string;
}

export interface DeckCardProps {
  index: number;
  total: number;
}

export interface DeckProps extends Pick<CardProps, 'backImg'> {
  className?: string;
  duration?: number;
}
