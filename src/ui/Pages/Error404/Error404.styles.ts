import styled from 'styled-components';
import { DARK_BLUE } from 'utils/constants/color-constants';

export const StyledErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
`;

export const StyledH1 = styled.h1`
  color: ${DARK_BLUE};
  font-size: 45px;
`;

export const StyledH2 = styled.h2`
  color: ${DARK_BLUE};
  font-size: 35px;
`;
