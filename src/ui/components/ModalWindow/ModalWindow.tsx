import { Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAllGenreQuery, usePostBookMutation } from 'services/book/book-API';
import { useToggle } from 'utils/hooks/use-toggle.hook';
import { Controller, useForm } from 'react-hook-form';
import UploadBook from 'ui/components/UploadFile/UploadBook';
import UploadPoster from 'ui/components/UploadPoster/UploadPoster';
import {
  ElementErrorWrapper,
  StyledGenreDateWrapper,
  StyledUploadFileWrapper,
  StyledUploadPosterWrapper,
  StyledUploadWrapper,
  ToggleModalButton,
} from 'ui/components/ModalWindow/ModalWindow.styles';
import { useNotificationAndNavigate } from 'utils/hooks/use-notification-and-navigate.hook';
import { Preloader } from 'ui/components/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';
import { HOME } from 'utils/constants/routes-path-constants';
import { appendFormData } from 'ui/components/ModalWindow/append-formData';
import {
  REQUIRED_BOOK_AUTHOR,
  REQUIRED_BOOK_DESCRIPTION,
  REQUIRED_BOOK_GENRE,
  REQUIRED_BOOK_TITLE,
} from 'utils/constants/error-conatants';
import { ControlledInput } from 'ui/components/ControlledInput/ControlledInput';
import { ControlledSelect } from 'ui/components/ControlledSelect/ControlledSelect';
import { ErrorSpan } from 'ui/components/ErrorSpan/ErrorSpan';

export type AddBookFormType = {
  title: string;
  author: string;
  genre: number[];
  year: Date;
  description: string;
  book: File | null;
  poster: File | null;
};

export const ModalWindow: FC = () => {
  const navigate = useNavigate();
  const { modal, toggleModal } = useToggle();
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [bookError, setBookError] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const { data: genres } = useAllGenreQuery();
  const [postBook, { isError, isSuccess, error, isLoading }] = usePostBookMutation();

  useNotificationAndNavigate(isSuccess, isError, error);

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

  useEffect(() => {
    isSuccess && toggleModal();
  }, [isSuccess]);

  const maxPikedDate = new Date().toISOString().split('T')[0];

  const onSubmit = async (data: AddBookFormType) => {
    if (genres) {
      const genre = genres.filter((element) => {
        return (
          element.id ===
          data.genre.find((elementId) => {
            return elementId === element.id;
          })
        );
      });
      if (!bookFile) {
        setBookError(true);
        return;
      }
      if (!posterFile) {
        setPosterError(true);
        return;
      }
      const formData = appendFormData(data, genre);
      await postBook(formData);
      isSuccess && toggleModal();
    }
    navigate(HOME);
  };

  return (
    <>
      <ToggleModalButton onClick={toggleModal}>Add new book</ToggleModalButton>
      <Modal
        title="Add new book"
        centered
        open={modal}
        onOk={handleSubmit(onSubmit)}
        onCancel={toggleModal}
        width={500}
      >
        {isLoading && <Preloader isAbsolute={null} bottom={null} left={null} />}
        <form>
          <ElementErrorWrapper isError={!!errors.title}>
            <ControlledInput
              name="title"
              control={control}
              placeholder="Book title"
              rules={{
                required: { message: REQUIRED_BOOK_TITLE, value: true },
              }}
            />
          </ElementErrorWrapper>
          <ErrorSpan error={errors.title?.message} />

          <ElementErrorWrapper isError={!!errors.author}>
            <ControlledInput
              name="author"
              control={control}
              placeholder="Author"
              rules={{
                required: { message: REQUIRED_BOOK_AUTHOR, value: true },
              }}
            />
          </ElementErrorWrapper>
          <ErrorSpan error={errors.author?.message} />

          <StyledGenreDateWrapper>
            <div>
              {genres?.length && (
                <ControlledSelect
                  name="genre"
                  control={control}
                  rules={{
                    required: { message: REQUIRED_BOOK_GENRE, value: true },
                  }}
                  values={genres}
                  mode="multiple"
                  placeholder={'Genre'}
                />
              )}

              <ErrorSpan error={errors.genre?.message} />
            </div>
            <div>
              <input
                type="date"
                max={maxPikedDate}
                {...register('year', {
                  required: true,
                })}
              />

              <ErrorSpan error={errors.year?.message} />
            </div>
          </StyledGenreDateWrapper>

          <ElementErrorWrapper isError={!!errors.description}>
            <Controller
              render={({ field }) => (
                <Input.TextArea {...field} placeholder={'Description'} showCount maxLength={250} rows={3} />
              )}
              name={'description'}
              control={control}
              rules={{
                required: { message: REQUIRED_BOOK_DESCRIPTION, value: true },
              }}
            />
          </ElementErrorWrapper>

          <ErrorSpan error={errors.description?.message} />

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
