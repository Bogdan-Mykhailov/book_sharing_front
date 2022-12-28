import { ALL, BOOK, GENRE, SEARCH } from 'utils/constants/endpoint-constants';
import { BOOK_TAG } from 'utils/constants/tag-constants';
import { IUser } from 'services/auth/auth-API';
import { apiSlice } from 'services/api/api-slice';

export interface IGenre {
  id: number;
  name: string;
}
interface IBook {
  id: number;
  poster: {
    id: number;
    url: string;
    key: string;
  };
  file: {
    id: number;
    url: string;
    key: string;
  };
  title: string;
  author: string;
  year: number;
  genres: IGenre[];
  description: string;
  created_at: Date;
  user: IUser;
}

export const bookAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    allGenre: build.query<IGenre[], void>({
      query: () => ({
        url: `/${GENRE}/${ALL}`,
        method: 'GET',
      }),
    }),

    postBook: build.mutation<IBook, FormData>({
      query: (arg) => ({
        url: `/${BOOK}`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: () => [BOOK_TAG],
    }),

    getAllBooks: build.query<IBook[], string>({
      query: (arg) => ({
        url: `/${BOOK}/${SEARCH}?${arg}`,
        method: 'GET',
      }),
      providesTags: () => [BOOK_TAG],
    }),

    getOneBook: build.query<IBook, string | undefined>({
      query: (id) => ({
        url: `/${BOOK}/${id}`,
        method: 'GET',
      }),
      providesTags: () => [BOOK_TAG],
    }),

    deleteBook: build.mutation<void, number | undefined>({
      query: (id) => ({
        url: `/${BOOK}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [BOOK_TAG],
    }),
  }),
});

export const { useAllGenreQuery, usePostBookMutation, useGetAllBooksQuery, useGetOneBookQuery, useDeleteBookMutation } =
  bookAPI;
