import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
    searchRecipesByName,
    searchRecipesByIngredient,
    searchRecipesByArea,
    searchRecipesByCategory,
    getRecipeDetailsById,
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
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchType } = useSelector((state) => state.search);

    const urlQuery = searchParams.get('q') || '';
    const urlType = searchParams.get('type') || 'name';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (urlQuery) {
            dispatch(setSearchTerm(urlQuery));
            dispatch(setSearchType(urlType));
            triggerSearch(urlQuery, urlType);
        }
    }, [urlQuery, urlType, dispatch]);

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

    const triggerSearch = async (term, type) => {
        setLoading(true);
        setError(null);
        try {
            let results;
            if (type === 'area') {
                results = await searchRecipesByArea(term);
                if (results.length === 0) setError(`No ${term} recipes found.`);
            } else if (type === 'category') {
                results = await searchRecipesByCategory(term);
                if (results.length === 0) setError('No recipes found in this category.');
            } else if (type === 'ingredient') {
                const partialResults = await searchRecipesByIngredient(term);
                const detailPromises = partialResults.map((r) =>
                    getRecipeDetailsById(r.idMeal).catch(() => r)
                );
                results = await Promise.all(detailPromises);
                results = results.map((full, i) => full || partialResults[i]);
                if (results.length === 0) setError(`No recipes found matching "${term}".`);
            } else {
                results = await searchRecipesByName(term);
                if (results.length === 0) setError(`No recipes found matching "${term}".`);
            }
            dispatch(setSearchResults(results));
        } catch (err) {
            console.error(err);
            setError('Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        if (!term) return;
        setSearchParams({ q: term, type: searchType });
    };

    const handleTypeChange = (type) => {
        dispatch(setSearchType(type));
        if (urlQuery) {
            setSearchParams({ q: urlQuery, type: type });
        }
    };

    const handleAreaChange = (area) => {
        if (!area) return;
        setSearchParams({ q: area, type: 'area' });
    };

    const handleCategoryClick = (category) => {
        if (!category) return;
        setSearchParams({ q: category, type: 'category' });
    };

    return {
        loading,
        error,
        loadInspiration,
        handleSearch,
        handleTypeChange,
        handleAreaChange,
        handleCategoryClick
    };
};

export default useRecipeSearch;
