import request from 'axios';
import {store} from '../store';
import {setError} from '../store/reducers/utility';
import {ErrorType} from '../types/error';
import {clearErrorAction} from '../store/api-actions';
import {HTTP_CODE, AppRoute} from '../const';
import {redirectToRoute} from '../store/action';


export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        handleError(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        handleError(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        store.dispatch(redirectToRoute(AppRoute.NotFound));
        handleError(response.data.error);
        break;
    }
  }
};
