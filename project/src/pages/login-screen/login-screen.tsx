import {useRef, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/';
import Logo from '../../components/logo/logo';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {isEmpty, getRandomItem} from '../../utils/utils';
import {AppRoute, AuthorizationStatus, citiesList} from '../../const';
import {changeCityAction} from '../../store/reducers/offers';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const authStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);

  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const onSubmit = (authData: AuthData) => dispatch(loginAction(authData));

  const passwordIsValid = (password: string) => {
    const letterCheck = /[A-Za-z]/;
    const numberCheck = /[0-9]/;
    return letterCheck.test(password) && numberCheck.test(password);
  };

  const onPasswordChange = () => {
    if (passwordRef.current !== null && isEmpty(passwordRef.current.value)) {
      passwordRef.current.setCustomValidity('Password can\'t consist of spaces');
    } else if (passwordRef.current !== null && !passwordIsValid(passwordRef.current.value)) {
      passwordRef.current.setCustomValidity('Passwords must contain: a minimum of 1 letter and of 1 number');
    } else if (passwordRef.current !== null ) {
      passwordRef.current.setCustomValidity('');
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const randomCity = getRandomItem(citiesList);

  const handleLinkClick = () => {
    dispatch(changeCityAction(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              onSubmit={handleFormSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="login"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  onChange={onPasswordChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>

          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                onClick={handleLinkClick}
                className="locations__item-link"
                to={AppRoute.Root}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
