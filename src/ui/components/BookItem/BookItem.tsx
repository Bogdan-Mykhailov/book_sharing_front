import React, { FC } from 'react';
import { Block, BookAuthor, BookPoster, BookTitle, PosterWrapper, Year } from 'ui/components/BookItem/BookItem.styles';

interface IBookItem {
  id: number;
  posterUrl: string;
  title: string;
  author: string;
  year: number;
  onClick: (id: number) => void;
}

const BookItem: FC<IBookItem> = ({ onClick, id, title, author, posterUrl, year }) => {
  return (
    <Block onClick={() => onClick(id)}>
      <BookTitle>{title}</BookTitle>
      <PosterWrapper>
        <BookPoster src={posterUrl} alt="Book poster" />
      </PosterWrapper>
      <Year>{year}</Year>
      <BookAuthor>
        <p>Written by:</p> {author}
      </BookAuthor>
    </Block>
  );
};

export default BookItem;
