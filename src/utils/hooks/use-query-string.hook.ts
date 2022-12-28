import { useGetAllBooksQuery } from 'services/book/book-API';
import { useAppSelector } from 'services/hooks/hooks';
import { useDebounce } from 'utils/hooks/use-debounce.hook';

export const useQueryString = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const { author, genre, title, year } = useAppSelector((state) => state.filter);

  const filterOptions = { author, genre, title, year };

  const queryString = Object.entries(filterOptions)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}&`;
      }
    })
    .join('')
    .slice(0, -1);

  const debounceValue = useDebounce(queryString);
  const { data, refetch } = useGetAllBooksQuery(debounceValue, { skip: !isAuthorised });
  return { data, refetch };
};
