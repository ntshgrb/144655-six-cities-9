import {utility} from './utility';
import {AuthorizationStatus} from '../../const';
import {requireAuthorization, setError} from './utility';

describe('Reducer: utility', () => {
  it('without additional parameters should return initial state', () => {
    expect(utility.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({error: '', authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {error: '', authorizationStatus: AuthorizationStatus.NoAuth};

    expect(utility.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({error: '', authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {error: '', authorizationStatus: AuthorizationStatus.NoAuth};

    expect(utility.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({error: '', authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should set error description', () => {
    const state = {error: '', authorizationStatus: AuthorizationStatus.NoAuth};

    expect(utility.reducer(state, setError('some error text')))
      .toEqual({error: 'some error text', authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
