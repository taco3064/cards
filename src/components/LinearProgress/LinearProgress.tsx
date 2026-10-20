import Styled from './LinearProgress.styles';
import { useBreakpointMatches } from '~app/hooks/useBreakpoint';
import { useContainerWidth } from './useContainerWidth';
import type { LinearProgressProps } from './LinearProgress.types';

export default function LinearProgress({ barWidth = 96, color }: LinearProgressProps) {
  const { ref, width } = useContainerWidth();

  const { matched: duration } = useBreakpointMatches({
    xs: 1,
    sm: 1.5,
    md: 2,
    lg: 2.5,
    xl: 3,
  });

  return (
    <Styled.Container ref={ref}>
      <Styled.Slider
        $barWidth={barWidth}
        $color={color}
        animate={{ x: [width, -barWidth] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </Styled.Container>
  );
}
