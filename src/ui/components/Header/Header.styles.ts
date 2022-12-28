import styled from 'styled-components';
import { DARK_BLUE } from 'utils/constants/color-constants';
import { FONT_BOLD, FONT_SIZE_15 } from 'utils/constants/font-constants';
import { BORDER_RADIUS_24PX } from 'utils/constants/css-constants';

export const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  width: 100%;
  height: 60px;
  justify-content: flex-end;
  padding: 15px;
  z-index: 1;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 25px;
  height: 34px;
`;

export const HeaderTitle = styled.h2`
  font-weight: ${FONT_BOLD};
  color: ${DARK_BLUE};
  margin-left: 5px;
  cursor: pointer;
`;

export const StyledLogoImage = styled.img`
  width: 35px;
  cursor: pointer;
`;

export const StyledIcon = styled.img`
  width: 25px;
  margin: 0 10px;
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(11%) sepia(29%) saturate(3540%) hue-rotate(228deg) brightness(94%)
    contrast(97%);

  &:hover {
    filter: brightness(0) saturate(100%) invert(76%) sepia(66%) saturate(5297%) hue-rotate(235deg) brightness(90%)
      contrast(88%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px;
  color: ${DARK_BLUE};
  font-weight: ${FONT_BOLD};
  border-radius: ${BORDER_RADIUS_24PX};
  border: 1px solid ${DARK_BLUE};
  cursor: default;
`;

export const StyledParagraph = styled.span`
  font-size: ${FONT_SIZE_15};
  line-height: normal;
`;
