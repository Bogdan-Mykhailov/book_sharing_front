import React from 'react';
import { IStyledCustomButton, StyledCustomButton } from 'ui/components/Button/Button.styles';

interface IButton extends IStyledCustomButton {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button = ({ onClick, children, ...props }: IButton) => {
  return (
    <StyledCustomButton onClick={onClick} {...props}>
      {children}
    </StyledCustomButton>
  );
};
