import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getPlaceRatingStars, getPlaceType, getButtonFavoriteClassName} from '../../utils/card';
import {toggleFavoriteAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';

type PlaceCardProps = {
  offer: Offer;
  onActiveCardChange?: (id: number) => void,
  placeCardClasses: {
    CardClass: string,
    ImageWrapper: string,
    ListClass: string
  },
}

function PlaceCard({offer, onActiveCardChange, placeCardClasses}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {isPremium, previewImage, price, rating, isFavorite, title, type, id} = offer;

  const authStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);

  const placeRatingStars = getPlaceRatingStars(rating);

  const placeType = getPlaceType(type);

  const buttonFavoriteClassName = getButtonFavoriteClassName(isFavorite);

  const handleButtonClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }

    const status = +(!isFavorite);
    dispatch(toggleFavoriteAction({id, status}));
  };

  return (
    <article
      className={`${placeCardClasses.CardClass} place-card`}
      onMouseOver={() => {onActiveCardChange?.(id);}}
    >
      {
        isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null
      }
      <div className={`${placeCardClasses.ImageWrapper} place-card__image-wrapper`}>
        <a>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleButtonClick}
            className={buttonFavoriteClassName}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={placeRatingStars}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.RoomId}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
