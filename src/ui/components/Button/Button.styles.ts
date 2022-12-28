import styled from 'styled-components';
import { DARK_BLUE, DARK_PINK, DISABLED_PINK_OPACITY_0_3, WHITE } from 'utils/constants/color-constants';
import { FONT_BOLD } from 'utils/constants/font-constants';
import { BORDER_RADIUS_24PX } from 'utils/constants/css-constants';

export interface IStyledCustomButton {
  width?: string;
  margin?: string;
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: string;
  borderRadius?: string;
  hoverTextColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderRadius?: string;
  disabled?: boolean;
  disabledBackgroundColor?: string;
}

export const StyledCustomButton = styled.button<IStyledCustomButton>`
  cursor: pointer;
  width: ${({ width }) => width || '200px'};
  margin: ${({ margin }) => margin};
  background-color: ${({ backgroundColor }) => backgroundColor || `${DARK_BLUE}`};
  color: ${({ textColor }) => textColor || `${WHITE}`};
  font-weight: ${({ fontWeight }) => fontWeight || ` ${FONT_BOLD}`};
  border-radius: ${({ borderRadius }) => borderRadius || `${BORDER_RADIUS_24PX}`};
  padding: 0.4em 1em;
  border: none;
  transition: 0.1s ease-in-out;
  &:hover {
    border: none;
    color: ${({ hoverTextColor }) => hoverTextColor || `${WHITE}`};
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor || `${DARK_PINK}`};
    border-radius: ${({ borderRadius }) => borderRadius || `${BORDER_RADIUS_24PX}`};
  }
  &:disabled {
    border: none;
    color: ${({ textColor }) => textColor || `${WHITE}`};
    background-color: ${({ disabledBackgroundColor }) => disabledBackgroundColor || `${DISABLED_PINK_OPACITY_0_3}`};
    border-radius: ${({ borderRadius }) => borderRadius || `${BORDER_RADIUS_24PX}`};
  }
`;
