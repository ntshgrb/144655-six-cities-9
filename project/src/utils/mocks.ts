import {datatype, address, lorem, name, image} from 'faker';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {NewReview} from '../types/new-review';

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    },
    name: address.city(),
  },
  description: lorem.word(7),
  goods: new Array(3).fill(null).map(() => datatype.string()),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
  id: datatype.number(),
  images: new Array(3).fill(null).map(() => datatype.string()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(5),
  type: datatype.string(1),
} as Offer);

export const makeFakeReview = (): Review => ({
  comment: lorem.word(10),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
} as Review);

export const makeFakeComment = ():NewReview  => ({
  comment: lorem.word(10),
  rating: datatype.number(),
  offerId: datatype.number(),
} as NewReview);

export const makeFakeOffersList = (length: number) => new Array(length).fill(null).map(() => makeFakeOffer());

export const makeReviewsList = (length: number) => new Array(length).fill(null).map(() => makeFakeReview());

export enum listsLength {
  OffersLength = 20,
  FavoritesLength = 5,
  ReviewsLength = 4,
  OffersNearby = 3,
}
