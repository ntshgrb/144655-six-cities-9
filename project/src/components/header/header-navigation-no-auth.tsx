import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';


function HeaderNavigationNoAuth (): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default HeaderNavigationNoAuth;
