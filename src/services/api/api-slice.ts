import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { UNAUTHORISED_ERROR_STATUS } from 'utils/constants/error-conatants';
import { AUTH, CHECK, REFRESH } from 'utils/constants/endpoint-constants';
import { signInUser, signOutUser } from 'store/user-slice';
import { IUser } from 'services/auth/auth-API';
import { BOOK_TAG } from 'utils/constants/tag-constants';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BACKEND_URL || 'http://localhost:4000',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', process.env.BACKEND_URL || 'http://localhost:4000');
    return headers;
  },
  mode: 'cors',
});

const baseQueryWithReauthorise: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  arg,
  api,
  extraOptions,
) => {
  let result = await baseQuery(arg, api, extraOptions);
  if (result.error && result.error.status === UNAUTHORISED_ERROR_STATUS) {
    const refreshResult = await baseQuery(`/${AUTH}/${REFRESH}`, api, extraOptions);
    if (!refreshResult.error) {
      const checkResult = await baseQuery(`/${AUTH}/${CHECK}`, api, extraOptions);
      result = await baseQuery(arg, api, extraOptions);
      api.dispatch(signInUser(checkResult.data as IUser));
    } else {
      api.dispatch(signOutUser());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauthorise,
  tagTypes: [BOOK_TAG],
  endpoints: () => ({}),
});
