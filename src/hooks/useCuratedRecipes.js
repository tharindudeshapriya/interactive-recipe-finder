import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getRandomRecipe } from '../services/recipeApi';

const useCuratedRecipes = (allIngredients) => {
    const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
    const [seafoodRecipes, setSeafoodRecipes] = useState([]);
    const [dessertRecipes, setDessertRecipes] = useState([]);
    const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
    const [dailyIngredients, setDailyIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshIngredients = useCallback(() => {
        if (allIngredients.length > 0) {
            const shuffled = [...allIngredients].sort(() => 0.5 - Math.random());
            setDailyIngredients(shuffled.slice(0, 3));
        }
    }, [allIngredients]);

    const refreshRecipeOfTheDay = useCallback(async () => {
        try {
            const recipe = await getRandomRecipe();
            setRecipeOfTheDay(recipe);
        } catch (err) {
            console.error('Failed to fetch recipe of the day', err);
            toast.error('Unable to refresh Recipe of the Day');
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        let cancelled = false;

        const fetchAll = async () => {
            setLoading(true);
            try {
                const [seafood, desserts, vegetarian, dailyRecipe] = await Promise.all([
                    import('../services/recipeApi').then(m => m.searchRecipesByCategory('Seafood', signal)),
                    import('../services/recipeApi').then(m => m.searchRecipesByCategory('Dessert', signal)),
                    import('../services/recipeApi').then(m => m.searchRecipesByCategory('Vegetarian', signal)),
                    getRandomRecipe(signal)
                ]);

                if (!cancelled) {
                    setSeafoodRecipes(seafood.slice(0, 6));
                    setDessertRecipes(desserts.slice(0, 6));
                    setVegetarianRecipes(vegetarian.slice(0, 6));
                    setRecipeOfTheDay(dailyRecipe);
                }
            } catch (err) {
                if (!cancelled && err.name !== 'AbortError') {
                    console.error('Failed to load curated content', err);
                    toast.error('Some curated sections failed to load. Please try again later.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchAll();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (dailyIngredients.length === 0 && allIngredients.length > 0) {
            refreshIngredients();
        }
    }, [allIngredients, dailyIngredients.length, refreshIngredients]);

    return {
        recipeOfTheDay,
        refreshRecipeOfTheDay,
        seafoodRecipes,
        dessertRecipes,
        vegetarianRecipes,
        dailyIngredients,
        refreshIngredients,
        loading,
    };
};

export default useCuratedRecipes;
