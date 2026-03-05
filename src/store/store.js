import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
    },
});
