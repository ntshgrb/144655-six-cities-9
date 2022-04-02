import {datatype, address, lorem, name, image} from 'faker';
import {Offer} from '../types/offer';

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
  goods: new Array(3).fill(null).map(() => lorem.word(1)),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
  id: datatype.number(),
  images: new Array(3).fill(null).map(() => image.imageUrl()),
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
