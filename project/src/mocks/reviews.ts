import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 3,
    comment: 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    date: '2022-01-31T15:13:26.370Z',
  },
  {
    id: 2,
    user: {
      id: 16,
      isPro: true,
      name: 'Mollie',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/7.jpg',
    },
    rating: 4,
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2022-01-31T15:13:26.370Z',
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Wed Feb 23 2022 21:32:51 GMT+0300 (Москва, стандартное время)',
    id: 3,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: false,
      name: 'Oliver.conner',
    },
  },
  {
    id: 4,
    user: {
      id: 14,
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 2,
    comment: 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2022-01-28T15:13:26.371Z',
  },
];
