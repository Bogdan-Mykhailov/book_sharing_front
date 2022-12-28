import React from 'react';
import { StyledErrorWrapper, StyledH1, StyledH2 } from 'ui/Pages/Error404/Error404.styles';

const Error404 = () => {
  return (
    <StyledErrorWrapper>
      <StyledH1>Page not found</StyledH1>
      <StyledH2>Error 404</StyledH2>
    </StyledErrorWrapper>
  );
};

export default Error404;
