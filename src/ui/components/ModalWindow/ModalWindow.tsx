import { Button, Modal, Select } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useAllGenreQuery, usePostBookMutation } from '../../../dal/book/bookAPI';
import { useToggle } from '../../../utils/hooks/use-toggle.hook';
import { Controller, useForm } from 'react-hook-form';
import UploadBook from '../UploadFile/UploadBook';
import UploadPoster from '../UploadPoster/UploadPoster';
import {
  StyledGenreDateWrapper,
  StyledInput,
  StyledSelect,
  StyledTextArea,
  StyledUploadFileWrapper,
  StyledUploadPosterWrapper,
  StyledUploadWrapper,
} from './ModalWindow.styles';
import { StyledError } from 'ui/common-styles/common.styles';

type AddBookFormType = {
  title: string;
  author: string;
  genre: number;
  year: Date;
  description: string;
  book?: File | null;
  poster?: File | null;
};

const ModalWindow: FC = () => {
  const { modal, toggleModal } = useToggle();
  const [bookFile, setBookFile] = useState<File | null>();
  const [posterFile, setPosterFile] = useState<File | null>();
  const [bookError, setBookError] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const { data: genres } = useAllGenreQuery();
  const [postBook, { isError, isSuccess, isLoading }] = usePostBookMutation();

  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookFormType>();

  useEffect(() => {
    setValue('book', bookFile);
  }, [bookFile]);

  useEffect(() => {
    setValue('poster', posterFile);
  }, [posterFile]);

  const formData = new FormData();
  const onSubmit = (data: AddBookFormType) => {
    if (genres) {
      const genre = genres.find((e) => {
        return e.id === data.genre;
      });
      if (!bookFile) {
        setBookError(true);
        return;
      }
      if (!posterFile) {
        setPosterError(true);
        return;
      }

      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('year', new Date(data.year).getFullYear().toString());
      formData.append('description', data.description);
      genre && formData.append('genres[0]', `{"id": ${genre.id}, "name": "${genre.name}"}`);
      formData.append('book', data.book instanceof File ? data.book : `${data.book}`);
      formData.append('poster', data.poster instanceof File ? data.poster : `${data.poster}`);
      postBook(formData);
      isSuccess && toggleModal();
    }
  };

  return (
    <>
      <Button type="primary" onClick={toggleModal}>
        Add new book
      </Button>
      <Modal
        title="Add new book"
        centered
        open={modal}
        onOk={handleSubmit(onSubmit)}
        onCancel={toggleModal}
        width={500}
      >
        <form>
          <Controller
            render={({ field }) => (
              <StyledInput required placeholder="Book title" {...field} isError={!!errors.title} />
            )}
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: { message: 'Title is required', value: true },
            }}
          />
          {errors.title && <StyledError>Book title is required!</StyledError>}

          <Controller
            render={({ field }) => <StyledInput required placeholder="Author" {...field} isError={!!errors.author} />}
            name="author"
            control={control}
            defaultValue=""
            rules={{
              required: { message: 'Author is required', value: true },
            }}
          />
          {errors.author && <StyledError>Author is required!</StyledError>}

          <StyledGenreDateWrapper>
            <div>
              <Controller
                render={({ field }) => (
                  <StyledSelect isError={!!errors.genre} {...field} placeholder={'Genre'}>
                    {genres &&
                      genres.map((i) => (
                        <Select.Option key={i.id} value={i.id}>
                          {i.name}
                        </Select.Option>
                      ))}
                  </StyledSelect>
                )}
                name="genre"
                control={control}
                rules={{
                  required: { message: 'Genre is required', value: true },
                }}
              />
              {errors.genre && <StyledError>Genre is required!</StyledError>}
            </div>
            <div>
              <input
                type="date"
                max={new Date().toDateString()}
                {...register('year', {
                  required: true,
                })}
              />
              {errors.year && <StyledError>Year is required!</StyledError>}
            </div>
          </StyledGenreDateWrapper>

          <Controller
            render={({ field }) => (
              <StyledTextArea
                isError={!!errors.description}
                {...field}
                placeholder={'Description'}
                showCount
                maxLength={250}
                rows={3}
              />
            )}
            name={'description'}
            control={control}
            rules={{
              required: { message: 'Genre is required', value: true },
            }}
          />
          {errors.description && <StyledError>Description is required!</StyledError>}

          <StyledUploadWrapper>
            <StyledUploadFileWrapper>
              <UploadBook setBookFile={setBookFile} setBookError={setBookError} isPropsError={bookError} />
            </StyledUploadFileWrapper>

            <StyledUploadPosterWrapper>
              <UploadPoster setPosterFile={setPosterFile} setPosterError={setPosterError} isPropsError={posterError} />
            </StyledUploadPosterWrapper>
          </StyledUploadWrapper>
        </form>
      </Modal>
    </>
  );
};

export default ModalWindow;
