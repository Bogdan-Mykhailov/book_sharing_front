import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteBookMutation, useGeyOneBookQuery } from '../../../dal/book/bookAPI';
import { useAppSelector } from '../../../hooks/hooks';

const BookPage = () => {
  const { id } = useParams<string>();
  const [skip, setSkip] = useState(true);
  useEffect(() => {
    if (id && typeof +id === 'number') {
      setSkip(false);
    }
  }, [id]);
  const { data } = useGeyOneBookQuery(id, { skip });
  const [deleteBook, { isSuccess, isError }] = useDeleteBookMutation();
  const userId = useAppSelector((state) => state.user.id);

  const deleteBookHandler = () => {
    deleteBook(data?.id);
  };

  return (
    <div>
      <div>
        <span>{data && data.title}</span>
        <span>{data && data.author}</span>
        <span>{data && data.year}</span>
        <span>{data && data.description}</span>
      </div>
      {/*<img src={data.poster} alt="poster" />*/}
      <button disabled={userId !== data?.user.id} onClick={deleteBookHandler}>
        Delete book
      </button>
    </div>
  );
};

export default BookPage;
