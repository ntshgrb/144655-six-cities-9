import Logo from '../logo/logo';
import HeaderNavigationAuth from './header-navigation-auth';
import HeaderNavigationNoAuth from './header-navigation-no-auth';
import {useAppSelector} from '../../hooks/';
import {AuthorizationStatus} from '../../const';
import {memo} from 'react';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {
              authorizationStatus === AuthorizationStatus.Auth
                ? <HeaderNavigationAuth />
                : <HeaderNavigationNoAuth />
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
