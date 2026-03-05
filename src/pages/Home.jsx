import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSearchType } from '../store/searchSlice';

// Custom Hooks
import useCuratedRecipes from '../hooks/useCuratedRecipes';
import useRecipeSearch from '../hooks/useRecipeSearch';

// Components
import HomeHeroSection from '../components/HomeHeroSection';
import HomeCuratedSection from '../components/HomeCuratedSection';
import HomeArchiveSection from '../components/HomeArchiveSection';
import HomeSearchResults from '../components/HomeSearchResults';

const Home = () => {
    const dispatch = useDispatch();
    const { searchTerm, results: recipes, isShowingInspiration, searchType, allCategories, allAreas, allIngredients } = useSelector((state) => state.search);

    // 1. Fetch curated categories & daily items
    const {
        seafoodRecipes,
        dessertRecipes,
        vegetarianRecipes,
        recipeOfTheDay,
        refreshRecipeOfTheDay,
        dailyIngredients,
        refreshIngredients
    } = useCuratedRecipes(allIngredients);

    // 3. Search logic, inspiration loading, and api states
    const {
        loading,
        error,
        loadInspiration,
        handleSearch,
        handleAreaChange,
        handleCategoryClick
    } = useRecipeSearch();

    // Load inspiration on mount if no recipes are loaded yet
    useEffect(() => {
        window.scrollTo(0, 0);
        if (recipes.length === 0 && isShowingInspiration) {
            loadInspiration();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSuggestionClick = (ingredient) => {
        dispatch(setSearchTerm(ingredient));
        dispatch(setSearchType('ingredient'));
        handleSearch(ingredient);
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
                        searchTerm={searchTerm}
                    />
                )}
            </section>
        </div>
    );
};

export default Home;
