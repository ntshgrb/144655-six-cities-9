import {Offer} from '../../types/offer';
import {getPlaceRatingStars, getPlaceType, getButtonFavoriteClassName} from '../../utils/card';

type FavoritePlaceCardProps = {
  offer: Offer;
}

function FavoritePlaceCard({offer}: FavoritePlaceCardProps): JSX.Element {
  const {previewImage, isPremium, price, rating, title, type, isFavorite} = offer;

  const placeRatingStars = getPlaceRatingStars(rating);

  const placeType = getPlaceType(type);

  const buttonFavoriteClassName = getButtonFavoriteClassName(isFavorite);

  return (
    <article className="favorites__card place-card">
      {
        isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={buttonFavoriteClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
}

export default FavoritePlaceCard;
