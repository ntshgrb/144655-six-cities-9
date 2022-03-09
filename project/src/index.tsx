import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';

const Setting = {
  PLACES_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      placesCount = {Setting.PLACES_COUNT}
      offers = {offers}
      reviews = {reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
