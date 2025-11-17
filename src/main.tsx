import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Deck from '~app/containers/Deck';
import CardBackImg from '~app/assets/imgs/poker-pattern.png';
import GlobalStyle from '~app/styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />

    <Deck
      cardOptions={{
        backImg: CardBackImg,
        size: { width: 180, height: 260 },
        total: 52,
        generateMeta: (index) => ({ id: index }),
      }}
    />
  </StrictMode>,
);
