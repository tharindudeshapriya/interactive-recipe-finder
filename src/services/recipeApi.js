const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// ---------------------------------------------------------------------------
// In-memory response cache
// Keyed by the full request URL. Cache lives as long as the browser tab is
// open — cheap and effective for a read-only public API.
// ---------------------------------------------------------------------------
const cache = new Map();

/**
 * Core fetch helper.
 * - Checks cache first; populates cache on success.
 * - Verifies response.ok so 4xx/5xx throw instead of silently returning null.
 * - Forwards the AbortController signal so callers can cancel in-flight requests.
 *
 * @param {string} url
 * @param {AbortSignal} [signal]
 * @returns {Promise<any>} Parsed JSON body
 */
async function apiFetch(url, signal) {
    if (cache.has(url)) {
        return cache.get(url);
    }

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText} (${url})`);
    }

    const data = await response.json();
    cache.set(url, data);
    return data;
}

// ---------------------------------------------------------------------------
// Public API functions
// Every one accepts an optional AbortSignal so useEffect cleanup can cancel.
// ---------------------------------------------------------------------------

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
    // Random endpoint must NOT be cached — each call should return a different recipe.
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
