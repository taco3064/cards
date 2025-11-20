import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CARD_BACK_IMG from '~app/assets/imgs/poker-pattern.png';
import DeckDrawStage from '~app/containers/DeckDrawStage';
import GlobalStyle from '~app/styles/GlobalStyle';

const POKER_INFO = {
  backImg: CARD_BACK_IMG,
  defaultCards: Array.from({ length: 52 }).map((_, i) => ({ id: i })),
  size: { width: 180, height: 260 },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />
    <DeckDrawStage {...POKER_INFO} maxDrawCount={5} />
  </StrictMode>,
);
