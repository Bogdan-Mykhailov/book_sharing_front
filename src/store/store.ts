import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { filterSlice } from 'store/filter-slice';
import { apiSlice } from 'services/api/api-slice';
import { userPersistedReducer } from 'store/user-slice';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    filter: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: [PERSIST, REGISTER, FLUSH, PAUSE, PURGE, REHYDRATE] } })
      .concat(apiSlice.middleware)
      .prepend(thunk),
});

export const userPersistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
