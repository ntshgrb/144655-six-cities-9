import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';

type InitialState = {
  error: string,
  authorizationStatus: AuthorizationStatus,
  userEmail: string,
}

const initialState: InitialState = {
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
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
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const {setError, requireAuthorization, setUserEmail} = utility.actions;
