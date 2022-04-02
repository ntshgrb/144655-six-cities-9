export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomId = '/offer/',
  Room = '/offer/:id',
  NotFound = '/notfound',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MainCardClasses {
  ListClass = 'cities__places-list tabs__content',
  CardClass = 'cities__place-card',
  ImageWrapper = 'cities__image-wrapper',
}

export enum PropertyCardClasses {
  ListClass = 'near-places__list',
  CardClass = 'near-places__card',
  ImageWrapper = 'near-places__image-wrapper',
}

export const citiesList = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_CITY = 'Paris';

export enum SortingTypes {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum ReviewLength {
  MinReviewLength = 50,
  MaxReviewLength = 300,
}

export const REVIEW_RATE = [
  {
    value: 5,
    rating: 'perfect',
  },
  {
    value: 4,
    rating: 'good',
  },
  {
    value: 3,
    rating: 'not bad',
  },
  {
    value: 2,
    rating: 'badly',
  },
  {
    value: 1,
    rating: 'terribly',
  },
];

export enum NameSpaces {
  offers = 'OFFERS',
  reviews = 'REVIEWS',
  utility = 'UTILITY',
  nearbyOffers = 'NEARBY_OFFERS',
}

export const MAX_REVIEWS_COUNT = 10;
