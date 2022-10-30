import { AUTH, CHECK, LOGIN, LOGOUT, REGISTER } from 'utils/constants/endpointConstants';
import { signInUser, signOutUser } from 'store/user-slice';
import { apiSlice } from '../api/api-slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface ISignUpReq {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ISignInReq {
  email: string;
  password: string;
}

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, ISignUpReq>({
      query: (body) => ({
        url: `/${AUTH}/${REGISTER}`,
        method: 'POST',
        body,
      }),
      transformResponse: (baseQueryReturnValue: IUser) => baseQueryReturnValue,
    }),

    signIn: build.mutation<IUser, ISignInReq>({
      query: (body) => ({
        url: `/${AUTH}/${LOGIN}`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signInUser(data));
        } catch {
          dispatch(signOutUser());
        }
      },
    }),

    signOut: build.mutation<void, void>({
      query: () => ({
        url: `/${AUTH}/${LOGOUT}`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(signOutUser());
        } catch {}
      },
    }),

    authorise: build.query<IUser, void>({
      queryFn: async (args, { dispatch }, extraOptions, baseQuery) => {
        const result = await baseQuery(`/${AUTH}/${CHECK}`);
        if ('error' in result) {
          return { error: result.error as FetchBaseQueryError };
        }
        dispatch(signInUser(result.data as IUser));
        return { data: result.data as IUser };
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation, useAuthoriseQuery } = authAPI;