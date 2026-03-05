// The MealDB API encodes up to 20 ingredient/measure pairs as numbered fields.
const MAX_INGREDIENTS = 20;

/**
 * Extracts the populated ingredient+measure pairs from a raw MealDB recipe object.
 * The API serialises these as strIngredient1…strIngredient20 / strMeasure1…strMeasure20.
 *
 * @param {Object} recipe - Raw MealDB meal object
 * @returns {{ ingredient: string, measure: string }[]}
 */
export function getIngredients(recipe) {
    const ingredients = [];
    for (let i = 1; i <= MAX_INGREDIENTS; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure: measure?.trim() || '' });
        }
    }
    return ingredients;
}
