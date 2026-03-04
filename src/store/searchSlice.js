import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    results: [],
    isShowingInspiration: true, // Tracks whether we are showing random recipes or search results
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
            state.searchTerm = ''; // Clear search term when returning to inspiration
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
    clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;
