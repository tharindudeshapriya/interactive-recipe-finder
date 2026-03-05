import { useState, useEffect, useRef, useCallback } from 'react';
import { searchRecipesByCategory, getRandomRecipe } from '../services/recipeApi';

const useCuratedRecipes = (allIngredients) => {
    const [seafoodRecipes, setSeafoodRecipes] = useState([]);
    const [dessertRecipes, setDessertRecipes] = useState([]);
    const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
    const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
    const [dailyIngredients, setDailyIngredients] = useState([]);
    const isMounted = useRef(false);

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
            console.error("Failed to fetch recipe of the day", err);
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) return;

        const fetchCuratedContent = async () => {
            try {
                const seafood = await searchRecipesByCategory('Seafood');
                setSeafoodRecipes(seafood.slice(0, 6));

                const desserts = await searchRecipesByCategory('Dessert');
                setDessertRecipes(desserts.slice(0, 6));

                const vegetarian = await searchRecipesByCategory('Vegetarian');
                setVegetarianRecipes(vegetarian.slice(0, 6));

                await refreshRecipeOfTheDay();
            } catch (err) {
                console.error('Failed to load curated content', err);
            }
        };

        fetchCuratedContent();
        isMounted.current = true;
    }, [refreshRecipeOfTheDay]);

    useEffect(() => {
        if (dailyIngredients.length === 0 && allIngredients.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            refreshIngredients();
        }
    }, [allIngredients, dailyIngredients.length, refreshIngredients]);

    return {
        seafoodRecipes,
        dessertRecipes,
        vegetarianRecipes,
        recipeOfTheDay,
        refreshRecipeOfTheDay,
        dailyIngredients,
        refreshIngredients
    };
};

export default useCuratedRecipes;
