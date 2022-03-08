export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomId = '/offer/',
  Room = '/offer/:id',
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
