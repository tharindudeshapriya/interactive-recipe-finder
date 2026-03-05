import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchRecipesByName,
    searchRecipesByIngredient,
    searchRecipesByArea,
    searchRecipesByCategory,
    getRandomRecipe
} from '../services/recipeApi';
import {
    setSearchTerm,
    setSearchResults,
    setInspirationResults,
    setSearchType
} from '../store/searchSlice';

const useRecipeSearch = () => {
    const dispatch = useDispatch();
    const { searchType } = useSelector((state) => state.search);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadInspiration = async () => {
        setLoading(true);
        setError(null);
        try {
            const randomPromises = Array.from({ length: 4 }).map(() => getRandomRecipe());
            const results = await Promise.all(randomPromises);
            const validResults = results.filter(recipe => recipe !== null);
            dispatch(setInspirationResults(validResults));
        } catch (err) {
            console.error(err);
            setError('Failed to load inspiration.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (term) => {
        if (!term) return;
        setLoading(true);
        setError(null);
        try {
            let results;
            if (searchType === 'ingredient') {
                results = await searchRecipesByIngredient(term);
            } else {
                results = await searchRecipesByName(term);
            }
            dispatch(setSearchResults(results));
            if (results.length === 0) setError(`No recipes found matching "${term}".`);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleAreaChange = async (area) => {
        if (!area) return;
        setLoading(true);
        setError(null);
        dispatch(setSearchTerm(''));
        try {
            const results = await searchRecipesByArea(area);
            dispatch(setSearchResults(results));
            if (results.length === 0) setError(`No ${area} recipes found.`);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch cuisine results.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = async (category) => {
        setLoading(true);
        setError(null);
        dispatch(setSearchTerm(category));
        dispatch(setSearchType('name'));
        try {
            const results = await searchRecipesByCategory(category);
            dispatch(setSearchResults(results));
            if (results.length === 0) setError('No recipes found in this category.');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch category recipes.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        loadInspiration,
        handleSearch,
        handleAreaChange,
        handleCategoryClick
    };
};

export default useRecipeSearch;
