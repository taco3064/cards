import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import DrawDemoPage from '~app/pages/DrawDemo';
import GlobalStyle from '~app/styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />
    <DrawDemoPage />
  </StrictMode>,
);
