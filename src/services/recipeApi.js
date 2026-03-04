const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipesByName = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        throw error;
    }
};

export const searchRecipesByIngredient = async (ingredient) => {
    try {
        const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        throw error;
    }
};

export const getRecipeDetailsById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        throw error;
    }
};

export const getRandomRecipe = async () => {
    try {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        throw error;
    }
};

export const searchRecipesByCategory = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        throw error;
    }
};
