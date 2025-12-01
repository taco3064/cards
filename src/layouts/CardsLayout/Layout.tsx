import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

import BackIcon from '~app/icons/BackIcon';
import Button from '~app/styles/Button';
import LinearProgress from '~app/components/LinearProgress';
import LogoIcon from '~app/icons/LogoIcon';
import Toolbar from '~app/styles/Toolbar';

export default function CardsLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <Toolbar.Navbar
        $colors={{ bg: 'inherit' }}
        $position={{ variant: 'sticky', top: 0, left: 0, zIndex: 10 }}
      >
        <Button.NavLink
          to="/"
          $colors={{ text: '#609fc0' }}
          $fontSize={24}
          style={{ marginRight: 'auto' }}
        >
          <LogoIcon /> Cards
        </Button.NavLink>

        {pathname !== '/examples' && (
          <Button.NavLink to="/examples" $colors={{ text: 'white' }}>
            {pathname.startsWith('/examples') ? <BackIcon /> : null}
            Examples
          </Button.NavLink>
        )}
      </Toolbar.Navbar>

      <Suspense fallback={<LinearProgress color="#609fc0" />}>
        <Outlet />
      </Suspense>
    </>
  );
}
