import type { RefObject, ReactNode } from 'react';

export type PortalMountContextValue<El extends HTMLElement = HTMLElement> =
  RefObject<El | null> | null;

export interface PortalMountProviderProps<El extends HTMLElement> {
  children: ReactNode;
  containerRef: RefObject<El | null>;
}
