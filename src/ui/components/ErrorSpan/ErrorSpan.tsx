import React from 'react';
import { StyledError } from 'ui/components/ErrorSpan/ErrorSpan.styles';

export const ErrorSpan = ({ error }: { error?: string }) => {
  return <StyledError>{error}</StyledError>;
};
