import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitStateType = {
  isDrawerOpen: boolean;
  title?: string;
  genre?: number;
  year?: number;
  author?: string;
};

const initialState: InitStateType = {
  isDrawerOpen: false,
  title: undefined,
  genre: undefined,
  year: undefined,
  author: undefined,
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggle: (state): InitStateType => {
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    },
    setTitle: (state, { payload }: PayloadAction<string | undefined>): InitStateType => {
      return { ...state, title: payload };
    },
    setGenre: (state, { payload }: PayloadAction<number | undefined>): InitStateType => {
      return { ...state, genre: payload };
    },
    setYear: (state, { payload }: PayloadAction<number | undefined>): InitStateType => {
      return { ...state, year: payload };
    },
    setAuthor: (state, { payload }: PayloadAction<string | undefined>): InitStateType => {
      return { ...state, author: payload };
    },
  },
});

export const filterSlice = filter.reducer;
export const { toggle, setTitle, setGenre, setYear, setAuthor } = filter.actions;
