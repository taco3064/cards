import type { RefObject } from 'react';

export type PortalMountContextValue<El extends HTMLElement = HTMLElement> =
  RefObject<El | null> | null;
