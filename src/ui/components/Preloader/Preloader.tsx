import { FC } from 'react';
import {
  StyledLine,
  StyledLine1,
  StyledLine2,
  StyledLine3,
  StyledLine4,
  StyledLine6,
  StyledLine7,
  StyledLine8,
  StyledLine9,
  StyledPreloader,
  StyledTitle,
} from 'ui/components/Preloader/Preloader.styles';

interface IPreloader {
  isAbsolute: string | null;
  bottom: string | null;
  left: string | null;
}

export const Preloader: FC<IPreloader> = ({ isAbsolute, bottom, left }) => {
  return (
    <StyledPreloader isAbsolute={isAbsolute} bottom={bottom} left={left}>
      <StyledLine1></StyledLine1>
      <StyledLine2></StyledLine2>
      <StyledLine3></StyledLine3>
      <StyledLine4></StyledLine4>
      <StyledLine></StyledLine>
      <StyledLine6></StyledLine6>
      <StyledLine7></StyledLine7>
      <StyledLine8></StyledLine8>
      <StyledLine9></StyledLine9>
      <StyledTitle>Loading</StyledTitle>
    </StyledPreloader>
  );
};
