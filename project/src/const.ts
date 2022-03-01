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
