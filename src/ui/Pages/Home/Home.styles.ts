import styled from 'styled-components';
import { WHITE } from 'utils/constants/color-constants';
import { BORDER_RADIUS_24PX } from 'utils/constants/css-constants';

// export const StyledBooksImg = styled.img`
//   height: 450px;
//   object-fit: cover;
//   margin-bottom: 40px;
// `;

export const Container = styled.div`
  //height: 40vh;
  border-radius: ${BORDER_RADIUS_24PX};
  background-color: ${WHITE};
  max-width: 1330px;
  padding: 20px;
  display: flex;
  //flex-wrap: wrap;
  gap: 20px;
  overflow: scroll;
`;
