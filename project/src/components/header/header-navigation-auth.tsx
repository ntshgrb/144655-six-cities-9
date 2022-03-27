import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getUserEmail} from '../../sevrices/user-email';
import {logoutAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks/index';

function HeaderNavigationAuth ():JSX.Element {
  const dispatch = useAppDispatch();
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
        <Link
          className="header__nav-link"
          onClick={(event) => {
            event.preventDefault();
            dispatch(logoutAction());
          }}
          to='/'
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default HeaderNavigationAuth;
