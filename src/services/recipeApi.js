const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const cache = new Map();

class ApiError extends Error {
    constructor(message, status, url) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.url = url;
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

async function apiFetch(url, signal, retries = 3, backoff = 300) {
    if (cache.has(url)) {
        return cache.get(url);
    }

    try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
            // Don't retry for client errors like 404, but do for 500s or rate limits
            if (retries > 0 && (response.status >= 500 || response.status === 429)) {
                await new Promise(resolve => setTimeout(resolve, backoff));
                return apiFetch(url, signal, retries - 1, backoff * 2);
            }
            throw new ApiError(`API request failed: ${response.status}`, response.status, url);
        }

        const data = await response.json();
        cache.set(url, data);
        return data;
    } catch (err) {
        if (err.name === 'AbortError' || err.name === 'ApiError') throw err;

        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return apiFetch(url, signal, retries - 1, backoff * 2);
        }

        throw new NetworkError('Unable to connect to the recipe server. Please check your internet connection.');
    }
}

export const searchRecipesByName = async (name, signal) => {
    const data = await apiFetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`, signal);
    return data.meals || [];
};

export const searchRecipesByIngredient = async (ingredient, signal) => {
    const data = await apiFetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`, signal);
    return data.meals || [];
};

export const getRecipeDetailsById = async (id, signal) => {
    const data = await apiFetch(`${BASE_URL}/lookup.php?i=${id}`, signal);
    return data.meals ? data.meals[0] : null;
};

export const getRandomRecipe = async (signal) => {
    const response = await fetch(`${BASE_URL}/random.php`, { signal });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
};

export const searchRecipesByCategory = async (category, signal) => {
    const data = await apiFetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`, signal);
    return data.meals || [];
};

export const listAllCategories = async (signal) => {
    const data = await apiFetch(`${BASE_URL}/categories.php`, signal);
    return data.categories || [];
};

export const listAllAreas = async (signal) => {
    const data = await apiFetch(`${BASE_URL}/list.php?a=list`, signal);
    return data.meals || [];
};

export const searchRecipesByArea = async (area, signal) => {
    const data = await apiFetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`, signal);
    return data.meals || [];
};

export const listAllIngredients = async (signal) => {
    const data = await apiFetch(`${BASE_URL}/list.php?i=list`, signal);
    return data.meals || [];
};
