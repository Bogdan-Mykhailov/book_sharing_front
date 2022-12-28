import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type UserStateType = {
  isAuthorised: boolean;
  id: undefined | number;
  name: undefined | string;
  email: undefined | string;
};

export type PayloadType = {
  id: number;
  name: string;
  email: string;
};

const initialState: UserStateType = {
  isAuthorised: false,
  id: undefined,
  name: undefined,
  email: undefined,
};

const USER = 'user';

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    signInUser: (state, { payload }: PayloadAction<PayloadType>): UserStateType => {
      return { ...payload, isAuthorised: true };
    },
    signOutUser: () => initialState,
  },
});

export const userPersistedReducer = persistReducer({ key: USER, storage }, userSlice.reducer);

export const { signInUser, signOutUser } = userSlice.actions;
