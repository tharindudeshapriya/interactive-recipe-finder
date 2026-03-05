import { useState, useMemo, useEffect } from 'react';

/**
 * Custom hook that manages client-side category and cuisine filtering
 * for an array of recipe objects.
 *
 * Extracts unique categories and cuisines from the loaded results,
 * resets filters on new searches, and returns the filtered subset.
 *
 * @param {Array} recipes - The full array of recipe objects from the search.
 * @returns {Object} Filter state and helpers.
 */
const useSearchFilters = (recipes) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');

    // Reset filters whenever the recipes array reference changes (new search)
    useEffect(() => {
        setSelectedCategory('');
        setSelectedCuisine('');
    }, [recipes]);

    // Derive unique, sorted categories from the loaded results
    const availableCategories = useMemo(() => {
        const categories = new Set();
        recipes.forEach((recipe) => {
            if (recipe.strCategory) categories.add(recipe.strCategory);
        });
        return [...categories].sort((a, b) => a.localeCompare(b));
    }, [recipes]);

    // Derive unique, sorted cuisines (areas) from the loaded results
    const availableCuisines = useMemo(() => {
        const cuisines = new Set();
        recipes.forEach((recipe) => {
            if (recipe.strArea) cuisines.add(recipe.strArea);
        });
        return [...cuisines].sort((a, b) => a.localeCompare(b));
    }, [recipes]);

    // Apply both filters to produce the final filtered list
    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchesCategory = !selectedCategory || recipe.strCategory === selectedCategory;
            const matchesCuisine = !selectedCuisine || recipe.strArea === selectedCuisine;
            return matchesCategory && matchesCuisine;
        });
    }, [recipes, selectedCategory, selectedCuisine]);

    // Whether any filter is currently active
    const hasActiveFilters = selectedCategory !== '' || selectedCuisine !== '';

    // Clear all filters at once
    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedCuisine('');
    };

    return {
        availableCategories,
        availableCuisines,
        selectedCategory,
        selectedCuisine,
        setSelectedCategory,
        setSelectedCuisine,
        filteredRecipes,
        hasActiveFilters,
        clearFilters,
    };
};

export default useSearchFilters;
