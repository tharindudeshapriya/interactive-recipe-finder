import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    results: [],
    isShowingInspiration: true,
    searchType: 'name', // 'name' or 'ingredient'
    allCategories: [],
    allAreas: [],
    allIngredients: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSearchResults: (state, action) => {
            state.results = action.payload;
            state.isShowingInspiration = false; // Once you search, you are viewing results
        },
        setInspirationResults: (state, action) => {
            state.results = action.payload;
            state.isShowingInspiration = true;
            state.searchTerm = '';
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
        setAllCategories: (state, action) => {
            state.allCategories = action.payload;
        },
        setAllAreas: (state, action) => {
            state.allAreas = action.payload;
        },
        setAllIngredients: (state, action) => {
            state.allIngredients = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '';
            state.results = [];
            state.isShowingInspiration = true;
        }
    }
});

export const {
    setSearchTerm,
    setSearchResults,
    setInspirationResults,
    setSearchType,
    setAllCategories,
    setAllAreas,
    setAllIngredients,
    clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;
