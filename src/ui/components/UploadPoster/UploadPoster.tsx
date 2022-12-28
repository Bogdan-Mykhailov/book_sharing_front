import React, { ChangeEventHandler, FC, useRef, useState } from 'react';
import { Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { posterTypes } from 'utils/constants/file-types';
import { FILE_SIZE, REQUIRED_POSTER, WRONG_POSTER_FORMAT } from 'utils/constants/error-conatants';
import { ErrorSpan } from 'ui/components/ErrorSpan/ErrorSpan';

type UploadPosterPropsType = {
  setPosterFile: (posterFile: File) => void;
  setPosterError: (posterError: boolean) => void;
  isPropsError: boolean;
};

const UploadPoster: FC<UploadPosterPropsType> = ({ setPosterFile, setPosterError, isPropsError = false }) => {
  const [newImage, setNewImage] = useState<string>();
  const inputPosterRef = useRef<HTMLInputElement>(null);

  const selectPosterHandler = () => {
    inputPosterRef && inputPosterRef.current?.click();
  };

  const onChangePosterHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.files && target.files[0]) {
      const poster = target.files[0];
      setPosterError(false);
      if (poster.size > FILE_SIZE) {
        notification.error({ message: `File is more then ${FILE_SIZE}b` });
        return;
      }
      if (!Object.values(posterTypes).includes(poster.type)) {
        notification.error({ message: `${WRONG_POSTER_FORMAT}` });
        return;
      }
      convertToBase64(poster, (file64: string) => {
        setNewImage(file64);
      });
      setPosterFile(poster);
    }
  };

  const convertToBase64 = (poster: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(poster);
  };

  return (
    <div>
      <Button style={{ width: '150px' }} onClick={selectPosterHandler} icon={<UploadOutlined />}>
        Upload poster
      </Button>
      <input
        ref={inputPosterRef}
        onChange={onChangePosterHandler}
        hidden
        type="file"
        accept={`${posterTypes.jpeg}, ${posterTypes.jpg}, ${posterTypes.png}`}
      />
      {newImage && <img src={newImage} alt="poster image" />}
      {isPropsError && <ErrorSpan error={REQUIRED_POSTER} />}
    </div>
  );
};

export default UploadPoster;
