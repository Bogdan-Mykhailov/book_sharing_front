import { Navigate } from 'react-router-dom';
import { LOGIN } from 'utils/constants/routes-path-constants';
import { useAppSelector } from 'services/hooks/hooks';

export const ProtectedRouteBlocker = ({ children }: { children: JSX.Element }) => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);

  if (!isAuthorised) {
    return <Navigate to={LOGIN} replace />;
  }
  return children;
};
