import { AddBookFormType } from 'ui/components/ModalWindow/ModalWindow';
import { IGenre } from 'services/book/book-API';

export const appendFormData = (data: AddBookFormType, genres?: IGenre[]) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('author', data.author);
  formData.append('year', new Date(data.year).getFullYear().toString());
  formData.append('description', data.description);
  genres?.length &&
    genres.map((genre, index) => formData.append(`genres[${index}]`, `{"id": ${genre.id}, "name": "${genre.name}"}`));
  formData.append('book', data.book instanceof File ? data.book : `${data.book}`);
  formData.append('poster', data.poster instanceof File ? data.poster : `${data.poster}`);

  return formData;
};
