import styled from 'styled-components';
import { DARK_BLUE, WHITE } from 'utils/constants/color-constants';
import { FONT_SIZE_20 } from 'utils/constants/font-constants';

export const Block = styled.div`
  padding: 20px;
  background: ${DARK_BLUE};
  border-radius: 8px;
  min-width: 240px;
`;

export const PosterWrapper = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BookPoster = styled.img`
  width: 170px;
`;

export const BookTitle = styled.div`
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
  text-align: center;
`;

export const Year = styled.div`
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
`;

export const BookAuthor = styled.div`
  color: ${WHITE};
  font-size: ${FONT_SIZE_20};
`;
