import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes } from 'routes/auth-routes';
import { privateRoutes } from 'routes/private-routes';
import { publicRoutes } from 'routes/public-routes';
import { SignedRouteBlocker } from 'routes/hocs/SignedRouteBlocker';
import { ProtectedRouteBlocker } from 'routes/hocs/ProtectedRouteBlocker';

const Router = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <SignedRouteBlocker>
              <Component />
            </SignedRouteBlocker>
          }
        />
      ))}

      {privateRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRouteBlocker>
              <Component />
            </ProtectedRouteBlocker>
          }
        />
      ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default Router;
