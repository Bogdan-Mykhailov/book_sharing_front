import styled from 'styled-components';
import { Button } from 'antd';
import { DARK_BLUE, PINK_NORMAL, WHITE } from 'utils/constants/color-constants';
import { FONT_SIZE_16 } from 'utils/constants/font-constants';

export const BookInfoContainer = styled.div`
  max-width: 1200px;
  height: calc(100vh - 60px);
  margin: 0 auto;
  padding: 70px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${DARK_BLUE};
  flex-direction: column;
`;

export const BookPoster = styled.img`
  width: 450px;
  margin: 15px auto;
`;

export const BookInfo = styled.span`
  font-size: ${FONT_SIZE_16};
  text-align: center;
  margin-top: 10px;
`;

export const DeleteButton = styled(Button)`
  background-color: ${PINK_NORMAL};
  color: ${WHITE};
  border: none;
  margin-bottom: 15px;
  &:hover,
  &:active {
    background-color: ${PINK_NORMAL};
    color: ${WHITE};
  }
`;

export const DescriptionSector = styled.div`
  width: 70%;
  background-color: ${WHITE};
  margin: 15px auto;
  padding: 10px;
`;

export const BookInfoItem = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
