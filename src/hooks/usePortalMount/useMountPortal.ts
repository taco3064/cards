import { createPortal } from 'react-dom';
import { useContext, useEffect, useEffectEvent, useState, type ReactNode } from 'react';

import { PortalMountContext } from '~app/contexts/PortalMount';

export function useMountPortal() {
  const [, setPrepared] = useState(false);
  const containerRef = useContext(PortalMountContext);
  const prepare = useEffectEvent(() => setPrepared(true));

  useEffect(() => {
    if (containerRef?.current) {
      prepare();
    }
  }, [containerRef]);

  return (childrean: ReactNode) => {
    if (containerRef) {
      return containerRef.current ? createPortal(childrean, containerRef.current) : null;
    }

    return childrean;
  };
}
