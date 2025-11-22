import { createPortal } from 'react-dom';
import { useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { PortalMountContext } from '~app/contexts/PortalMount';

export function useMountPortal() {
  const [, setPrepared] = useState(false);
  const containerRef = useContext(PortalMountContext);
  const prepareRef = useRef(setPrepared);

  useEffect(() => {
    if (containerRef?.current) {
      prepareRef.current(true);
    }
  }, [containerRef]);

  return (childrean: ReactNode) => {
    if (containerRef) {
      return containerRef.current ? createPortal(childrean, containerRef.current) : null;
    }

    return childrean;
  };
}
