import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import DeckDraw from '~app/pages/DeckDraw';
import GlobalStyle from '~app/styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />
    <DeckDraw />
  </StrictMode>,
);
