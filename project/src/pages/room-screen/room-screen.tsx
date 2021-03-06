import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../hooks';
import ReviewForm from '../../components/review-form/review-form';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import {getPlaceRatingStars, getPlaceType} from '../../utils/card';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import {PROPERTY_MAP_HEIGHT} from '../../map-settings';
import {AppRoute, AuthorizationStatus, PropertyCardClasses} from '../../const';
import {fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction, toggleFavoriteAction} from '../../store/api-actions';
import RoomFeatures from '../../components/room-features/room-features';
import {useLayoutEffect} from 'react';
import { redirectToRoute } from '../../store/action';

function RoomScreen(): JSX.Element | null {
  const MAX_IMAGES_COUNT = 6;

  const dispatch = useDispatch();
  const params = useParams();

  const currentRoom = useAppSelector((state) => state.OFFERS.currentOffer);
  const currentRoomReviews = useAppSelector((state) => state.REVIEWS.currenOfferReviews);
  const nearbyOffers = useAppSelector((state) => state.NEARBY_OFFERS.nearbyOffers);
  const authorizationStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);

  useLayoutEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(+params.id));
      dispatch(fetchReviewsAction(+params.id));
      dispatch(fetchNearbyOffersAction(+params.id));
    }
  }, [params.id, dispatch]);

  if (currentRoom === null) {
    return null;
  }

  const {images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, description, host, id, isFavorite} = currentRoom;

  let imagesToRender = images;

  if (images.length > MAX_IMAGES_COUNT) {
    imagesToRender = images.slice(0, MAX_IMAGES_COUNT);
  }

  const placeRatingStars = getPlaceRatingStars(rating);
  const placeType = getPlaceType(type);

  const {avatarUrl, isPro, name} = host;
  const reviewsCount = currentRoomReviews.length;

  const handleButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }
    const status = +(!isFavorite);
    dispatch(toggleFavoriteAction({id, status}));
  };

  return (
    <div className='page'>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                imagesToRender.map((image) => (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt={`Photo ${currentRoom.type}`} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : null
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  onClick={handleButtonClick}
                  className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active': ''}`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span
                    style={placeRatingStars}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>

              <RoomFeatures
                placeType={placeType}
                bedrooms={bedrooms}
                maxAdults={maxAdults}
              />

              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good) => (
                      <li className="property__inside-item" key={good}>
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro': ''}`}>
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
                <ReviewsList reviews={currentRoomReviews} />
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <ReviewForm id={id} />
                    : null
                }
              </section>
            </div>
          </div>
          <Map
            currentCityInfo={currentRoom.city}
            offers={[currentRoom, ...nearbyOffers]}
            selectedOffer={currentRoom}
            className={'property__map'}
            mapHeight={PROPERTY_MAP_HEIGHT}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={nearbyOffers.slice(0, 3)}
              cardClasses={PropertyCardClasses}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
