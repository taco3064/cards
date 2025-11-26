import { Outlet } from 'react-router-dom';

import Button from '~app/styles/Button';
import LogoIcon from '~app/components/icons/LogoIcon';
import Toolbar from '~app/styles/Toolbar';

export default function AppPage() {
  return (
    <>
      <title>Cards</title>

      <Toolbar.Navbar
        style={{ position: 'sticky', top: 0, zIndex: 10, background: 'inherit' }}
      >
        <Button.NavLink
          to="/"
          $colors={{ text: '#609fc0' }}
          $fontSize={24}
          style={{ marginRight: 'auto' }}
        >
          <LogoIcon /> Cards
        </Button.NavLink>

        <Button.NavLink to="/example" $colors={{ text: 'white' }}>
          Example
        </Button.NavLink>
      </Toolbar.Navbar>

      <Outlet />
    </>
  );
}
