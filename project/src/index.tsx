import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {store} from './store/';
import {fetchOffersAction, checkAuthAction, fetchFavoriteOffers} from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffers());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
