import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

export default [
  {
    path: '/',
    Component: lazy(() => import('./App')),
    children: [
      {
        path: '/',
        Component: lazy(() => import('./Home')),
      },
      {
        path: 'example',
        Component: lazy(() => import('./Example')),
      },
    ],
  },
] satisfies RouteObject[];
