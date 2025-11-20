import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import DeckStage from '~app/containers/DeckStage';
import GlobalStyle from '~app/styles/GlobalStyle';

const POKER_DATA = Array.from({ length: 52 }).map((_, i) => ({ id: i }));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />

    <DeckStage
      backImg={CARD_BACK_IMG}
      defaultCards={POKER_DATA}
      size={{ width: 180, height: 260 }}
    />
  </StrictMode>,
);
