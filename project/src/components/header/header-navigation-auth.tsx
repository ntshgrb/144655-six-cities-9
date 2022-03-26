import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getUserEmail} from '../../sevrices/user-email';

function HeaderNavigationAuth ():JSX.Element {
  const email = getUserEmail();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}

export default HeaderNavigationAuth;
