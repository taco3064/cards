import { createContext } from 'react';
import type { PortalMountContextValue, PortalMountProviderProps } from './types';

export const PortalMountContext = createContext<PortalMountContextValue>(null);

export default function PortalMountProvider<El extends HTMLElement>({
  children,
  containerRef,
}: PortalMountProviderProps<El>) {
  return (
    <PortalMountContext.Provider value={containerRef}>
      {children}
    </PortalMountContext.Provider>
  );
}
