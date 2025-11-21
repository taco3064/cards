import type { CardsFanStageProps } from './types';

export default function CardsFanStage<Meta extends CardMeta>(
  props: CardsFanStageProps<Meta>,
) {
  console.log(props);

  return null;
}
