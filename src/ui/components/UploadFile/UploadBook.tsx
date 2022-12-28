import React, { ChangeEventHandler, FC, useRef, useState } from 'react';
import { Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { bookTypes } from 'utils/constants/file-types';
import { FILE_SIZE, REQUIRED_BOOK, WRONG_BOOK_FORMAT } from 'utils/constants/error-conatants';
import { ErrorSpan } from 'ui/components/ErrorSpan/ErrorSpan';

type UploadBookPropsType = {
  setBookFile: (bookFile: File) => void;
  setBookError: (bookError: boolean) => void;
  isPropsError?: boolean;
};

const UploadBook: FC<UploadBookPropsType> = ({ setBookFile, setBookError, isPropsError = false }) => {
  const [newBook, setNewBook] = useState<File>();
  const inputBookRef = useRef<HTMLInputElement>(null);

  const selectBookHandler = () => {
    inputBookRef && inputBookRef.current?.click();
  };

  const onChangeBookHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.files && target.files[0]) {
      const book = target.files[0];
      setBookError(false);
      if (book.size < FILE_SIZE) {
        setNewBook(book);
      }
      if (book.size > FILE_SIZE) {
        notification.error({ message: `File is more then ${FILE_SIZE}b` });
        return;
      }
      if (!Object.values(bookTypes).includes(book.type)) {
        notification.error({ message: `${WRONG_BOOK_FORMAT}` });
        return;
      }
      setBookFile(book);
    }
  };

  return (
    <div>
      <Button style={{ width: '150px' }} onClick={selectBookHandler} icon={<UploadOutlined />}>
        Upload book
      </Button>
      <input
        ref={inputBookRef}
        hidden
        onChange={onChangeBookHandler}
        type="file"
        accept={`${bookTypes.fb2}, ${bookTypes.epub}, ${bookTypes.txt}, ${bookTypes.pdf}, ${bookTypes.word}`}
      />
      {newBook && <p>{newBook.name}</p>}
      {isPropsError && <ErrorSpan error={REQUIRED_BOOK} />}
    </div>
  );
};

export default UploadBook;
