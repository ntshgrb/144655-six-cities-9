import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';

type InitialState = {
  error: string,
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitialState = {
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const utility = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {setError, requireAuthorization} = utility.actions;
