import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import GlobalStyle from '~app/styles/GlobalStyle';
import routes from '~app/pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle.App />

    <RouterProvider
      router={createBrowserRouter(routes, {
        basename: import.meta.env.BASE_URL,
      })}
    />
  </StrictMode>,
);
