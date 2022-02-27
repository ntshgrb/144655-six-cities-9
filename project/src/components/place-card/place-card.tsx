import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {AppRoute} from '../../const';
import {getPlaceRatingStars, getPlaceType, getButtonFavoriteClassName} from '../../utils/card';

type PlaceCardProps ={
  offer: Offer;
  onActiveCardChange: (par: number) => void,
}

function PlaceCard({offer, onActiveCardChange}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, isFavorite, title, type, id} = offer;

  const placeRatingStars = getPlaceRatingStars(rating);

  const placeType = getPlaceType(type);

  const buttonFavoriteClassName = getButtonFavoriteClassName(isFavorite);

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={ ( {target}: React.MouseEvent<HTMLElement, MouseEvent>) => {onActiveCardChange(id);} }
    >
      {
        isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={buttonFavoriteClassName} type="button">
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
