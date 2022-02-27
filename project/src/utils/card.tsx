const getPlaceRatingStars = (rating: number) => ({
  width: `${Math.round(rating) * 20}%`,
});

const getPlaceType = (type: string) => type[0].toUpperCase() + type.slice(1);

const getButtonFavoriteClassName = (isFavorite: boolean) => (isFavorite ?
  'place-card__bookmark-button place-card__bookmark-button--active button' :
  'place-card__bookmark-button button');

export {getPlaceRatingStars, getPlaceType, getButtonFavoriteClassName};
