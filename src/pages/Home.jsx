import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipesByName, getRandomRecipe, searchRecipesByCategory, searchRecipesByIngredient, searchRecipesByArea, listAllCategories, listAllAreas, listAllIngredients } from '../services/recipeApi';
import { setSearchTerm, setSearchResults, setInspirationResults, setSearchType, setAllCategories, setAllAreas, setAllIngredients } from '../store/searchSlice';
import HomeHeroSection from '../components/HomeHeroSection';
import HomeCuratedSection from '../components/HomeCuratedSection';
import HomeArchiveSection from '../components/HomeArchiveSection';
import HomeSearchResults from '../components/HomeSearchResults';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();

    // Pull state from Redux store
    const { searchTerm, results: recipes, isShowingInspiration, searchType, allCategories, allAreas, allIngredients } = useSelector((state) => state.search);

    const [loading, setLoading] = useState(false);
    const [seafoodRecipes, setSeafoodRecipes] = useState([]);
    const [dessertRecipes, setDessertRecipes] = useState([]);
    const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
    const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
    const [dailyIngredients, setDailyIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [isAreaOpen, setIsAreaOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const areaRef = useRef(null);
    const searchRef = useRef(null);

    // Removed hardcoded categories

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

    // Load initial data on mount
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchLookupData = async () => {
            try {
                if (allCategories.length === 0) {
                    const cats = await listAllCategories();
                    dispatch(setAllCategories(cats));
                }
                if (allAreas.length === 0) {
                    const areas = await listAllAreas();
                    dispatch(setAllAreas(areas));
                }
                if (allIngredients.length === 0) {
                    const ingredients = await listAllIngredients();
                    dispatch(setAllIngredients(ingredients));
                }
            } catch (err) {
                console.error('Failed to load lookup data');
            }
        };

        const fetchCuratedContent = async () => {
            try {
                const seafood = await searchRecipesByCategory('Seafood');
                setSeafoodRecipes(seafood.slice(0, 6)); // 6 items as requested

                const desserts = await searchRecipesByCategory('Dessert');
                setDessertRecipes(desserts.slice(0, 6)); // 6 items as requested

                const vegetarian = await searchRecipesByCategory('Vegetarian');
                setVegetarianRecipes(vegetarian.slice(0, 6));

                await refreshRecipeOfTheDay();
            } catch (err) {
                console.error('Failed to load curated content');
            }
        };

        fetchLookupData();
        fetchCuratedContent();

        if (!isMounted.current && recipes.length === 0) {
            loadInspiration();
            isMounted.current = true;
        } else {
            isMounted.current = true;
        }
    }, [recipes.length, allCategories.length, allAreas.length, allIngredients.length, refreshRecipeOfTheDay]);

    // Update ingredients once list is loaded
    useEffect(() => {
        if (dailyIngredients.length === 0 && allIngredients.length > 0) {
            refreshIngredients();
        }
    }, [allIngredients, dailyIngredients.length, refreshIngredients]);

    const loadInspiration = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch 4 random meals
            const randomPromises = Array.from({ length: 4 }).map(() => getRandomRecipe());
            const results = await Promise.all(randomPromises);

            // Filter out any null results just in case an API call failed
            const validResults = results.filter(recipe => recipe !== null);
            dispatch(setInspirationResults(validResults));
        } catch (err) {
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
            setError('Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (value) => {
        dispatch(setSearchTerm(value));

        if (searchType === 'ingredient' && value.length >= 2) {
            const matches = allIngredients
                .filter(item => item.strIngredient.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 8);
            setSuggestions(matches);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (ingredient) => {
        dispatch(setSearchTerm(ingredient));
        dispatch(setSearchType('ingredient')); // Ensure we are in ingredient mode
        setShowSuggestions(false);
        handleSearch(ingredient);
    };

    const handleAreaChange = async (area) => {
        if (!area) return;
        setLoading(true);
        setError(null);
        dispatch(setSearchTerm('')); // Clear text search
        try {
            const results = await searchRecipesByArea(area);
            dispatch(setSearchResults(results));
            if (results.length === 0) setError(`No ${area} recipes found.`);
        } catch (err) {
            setError('Failed to fetch cuisine results.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = async (category) => {
        setLoading(true);
        setError(null);
        // Dispatch category directly as the search term for UI consistency
        dispatch(setSearchTerm(category));
        dispatch(setSearchType('name')); // Categories search by name/meta
        try {
            const results = await searchRecipesByCategory(category);
            dispatch(setSearchResults(results));
            if (results.length === 0) setError('No recipes found in this category.');
        } catch (err) {
            setError('Failed to fetch category recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Stop the form from refreshing the page
        handleSearch(searchTerm);
    };

    return (
        <div className="w-full">
            <HomeHeroSection
                isShowingInspiration={isShowingInspiration}
                searchType={searchType}
                setSearchType={(type) => dispatch(setSearchType(type))}
                searchTerm={searchTerm}
                setSearchTerm={(term) => dispatch(setSearchTerm(term))}
                handleSearch={handleSearch}
                allIngredients={allIngredients}
                allAreas={allAreas}
                handleAreaChange={handleAreaChange}
                allCategories={allCategories}
                handleCategoryClick={handleCategoryClick}
                handleSuggestionClick={handleSuggestionClick}
            />

            {isShowingInspiration && (
                <HomeCuratedSection
                    recipeOfTheDay={recipeOfTheDay}
                    refreshRecipeOfTheDay={refreshRecipeOfTheDay}
                    seafoodRecipes={seafoodRecipes}
                    dessertRecipes={dessertRecipes}
                    vegetarianRecipes={vegetarianRecipes}
                    loading={loading}
                    refreshIngredients={refreshIngredients}
                    dailyIngredients={dailyIngredients}
                    handleSuggestionClick={handleSuggestionClick}
                />
            )}

            <section className="max-w-7xl mx-auto px-6 mb-24">
                {isShowingInspiration ? (
                    <HomeArchiveSection
                        recipes={recipes}
                        loading={loading}
                        error={error}
                        loadInspiration={loadInspiration}
                    />
                ) : (
                    <HomeSearchResults
                        recipes={recipes}
                        loading={loading}
                        error={error}
                        loadInspiration={loadInspiration}
                    />
                )}
            </section>
        </div>
    );
};

export default Home;
