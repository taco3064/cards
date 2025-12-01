import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

export default [
  {
    path: '/',
    Component: lazy(() => import('~app/layouts/CardsLayout')),
    children: [
      {
        path: '/',
        Component: lazy(() => import('./Welcome')),
      },
      {
        path: 'examples',
        Component: lazy(() => import('./Examples')),
      },
      {
        path: 'examples/draw',
        Component: lazy(() => import('./DrawExample')),
      },
    ],
  },
] satisfies RouteObject[];
