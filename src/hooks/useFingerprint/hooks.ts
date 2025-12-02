import { create } from 'zustand';
import fingerprint from '@fingerprintjs/fingerprintjs';

import type { FingerprintValues } from './types';

export const useFingerprint = create<FingerprintValues>((set) => {
  fingerprint
    .load()
    .then((fp) => fp.get())
    .then((result) => set(result.visitorId));

  return undefined;
});
