import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if it exists, otherwise empty array
const loadFavoritesFromStorage = () => {
    try {
        const stored = localStorage.getItem('recipeFavorites');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load favorites from local storage", e);
        return [];
    }
};

const initialState = {
    items: loadFavoritesFromStorage()
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const recipe = action.payload;
            const existingIndex = state.items.findIndex(item => item.idMeal === recipe.idMeal);

            if (existingIndex >= 0) {
                // If it already exists, remove it
                state.items.splice(existingIndex, 1);
            } else {
                // If it doesn't exist, add it
                state.items.push(recipe);
            }

            // Save to localStorage immediately after modifying state
            try {
                localStorage.setItem('recipeFavorites', JSON.stringify(state.items));
            } catch (e) {
                console.error("Failed to save favorites to local storage", e);
            }
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;

// Selector to check if a specific recipe is favorited
export const selectIsFavorite = (state, recipeId) =>
    state.favorites.items.some(item => item.idMeal === recipeId);

export default favoritesSlice.reducer;
