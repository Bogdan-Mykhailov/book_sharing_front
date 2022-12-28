import { BOOK_ID, HOME } from 'utils/constants/routes-path-constants';
import { BookPage } from 'ui/Pages/BookPage/BookPage';
import { Home } from 'ui/Pages/Home/Home';
import { RouteType } from 'routes/route-types';

export const privateRoutes: RouteType[] = [
  {
    path: BOOK_ID,
    Component: BookPage,
  },
  {
    path: HOME,
    Component: Home,
  },
];
