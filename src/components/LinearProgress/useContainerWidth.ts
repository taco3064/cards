import { useEffect, useEffectEvent, useRef, useState } from 'react';

export function useContainerWidth() {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onContainerResize = useEffectEvent(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  });

  useEffect(() => {
    onContainerResize();
    window.addEventListener('resize', onContainerResize);

    return () => {
      window.removeEventListener('resize', onContainerResize);
    };
  }, []);

  return {
    ref,
    width,
  };
}
