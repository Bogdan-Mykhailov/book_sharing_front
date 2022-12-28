import { Navigate } from 'react-router-dom';
import { HOME } from 'utils/constants/routes-path-constants';
import { useAppSelector } from 'services/hooks/hooks';

export const SignedRouteBlocker = ({ children }: { children: JSX.Element }) => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);

  if (isAuthorised) {
    return <Navigate to={HOME} replace />;
  }
  return children;
};
