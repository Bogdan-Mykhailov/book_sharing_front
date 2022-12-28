import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button, Input } from 'antd';
import { DARK_BLUE, DARK_PINK, GRAY_COLOR_OPACITY_0_58, WHITE } from 'utils/constants/color-constants';
import { FONT_BOLD, FONT_SIZE_20 } from 'utils/constants/font-constants';
import { BORDER_RADIUS_24PX } from 'utils/constants/css-constants';

export const StyledContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${GRAY_COLOR_OPACITY_0_58};
  border-radius: ${BORDER_RADIUS_24PX};
  width: 300px;
  height: 420px;
`;

export const StyledLogo = styled.img`
  width: 100px;
`;

export const StyledTitle = styled.h1`
  font-weight: 600;
  margin-bottom: 10px;
  color: ${DARK_BLUE};
`;

export const StyledInput = styled(Input)<{ maximumWidth?: string }>`
  max-width: ${({ maximumWidth }) => maximumWidth || '200px'};
  margin-bottom: 8px;
  transition: width 0.1s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  border-radius: 50px;
  height: 32px;
  outline: none;
  padding: 0 40px 0 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  &:hover {
    border: none;
  }
`;

export const StyledInputPassword = styled(Input.Password)`
  width: 200px;
  transition: width 0.1s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  border-radius: 50px;
  margin-bottom: 8px;
  height: 32px;
  outline: none;
  padding: 0 10px 0 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  &:hover {
    border: none;
  }
`;

export const StyledButton = styled(Button)`
  width: 200px;
  margin: 0 0 10px 0;
  background: ${DARK_BLUE};
  color: ${WHITE};
  font-weight: bold;
  border-radius: ${BORDER_RADIUS_24PX};
  height: 32px;
  outline: none;
  text-overflow: ellipsis;
  border: none;
  &:hover {
    border: none;
    color: ${WHITE};
    background: ${DARK_PINK};
    border-radius: ${BORDER_RADIUS_24PX};
  }
`;

export const StyledSpan = styled.span`
  color: ${DARK_BLUE};
`;

export const StyledErrorSpanEmail = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 50px;
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
`;

export const StyledErrorSpanPass = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 25px;
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
`;

export const StyledErrorSpanConfirmPass = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 25px;
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
`;

export const StyledNavLink = styled(NavLink)`
  color: ${DARK_BLUE};
  font-weight: ${FONT_BOLD};

  &:hover {
    color: ${WHITE};
  }
`;
