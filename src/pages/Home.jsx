import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSearchType } from '../store/searchSlice';

// Custom Hooks
import useCuratedRecipes from '../hooks/useCuratedRecipes';
import useRecipeSearch from '../hooks/useRecipeSearch';

// Components
import HomeHeroSection from '../components/home/HomeHeroSection';
import HomeCuratedSection from '../components/home/HomeCuratedSection';
import HomeSearchResults from '../components/home/HomeSearchResults';

const Home = () => {
    const dispatch = useDispatch();
    const {
        searchTerm,
        results: recipes,
        isShowingInspiration,
        searchType,
        allCategories,
        allAreas,
        allIngredients,
    } = useSelector((state) => state.search);

    // Curated daily items (recipe of the day + ingredient spotlight)
    const {
        recipeOfTheDay,
        refreshRecipeOfTheDay,
        seafoodRecipes,
        dessertRecipes,
        vegetarianRecipes,
        dailyIngredients,
        refreshIngredients,
        loading: curatedLoading,
    } = useCuratedRecipes(allIngredients);

    // Search logic + area/category navigation
    const {
        loading,
        error,
        loadInspiration,
        handleSearch,
        handleAreaChange,
        handleCategoryClick,
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
                onSearchTypeChange={(type) => dispatch(setSearchType(type))}
                searchTerm={searchTerm}
                onSearchTermChange={(term) => dispatch(setSearchTerm(term))}
                onSearch={() => handleSearch(searchTerm)}
                allIngredients={allIngredients}
                allAreas={allAreas}
                onAreaChange={handleAreaChange}
                allCategories={allCategories}
                onCategoryClick={handleCategoryClick}
                onSuggestionClick={handleSuggestionClick}
            />

            {isShowingInspiration ? (
                <HomeCuratedSection
                    recipeOfTheDay={recipeOfTheDay}
                    refreshRecipeOfTheDay={refreshRecipeOfTheDay}
                    seafoodRecipes={seafoodRecipes}
                    dessertRecipes={dessertRecipes}
                    vegetarianRecipes={vegetarianRecipes}
                    curatedLoading={curatedLoading}
                    allCategories={allCategories}
                    allAreas={allAreas}
                    onAreaChange={handleAreaChange}
                    refreshIngredients={refreshIngredients}
                    dailyIngredients={dailyIngredients}
                    handleSuggestionClick={handleSuggestionClick}
                />
            ) : (
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <HomeSearchResults
                        recipes={recipes}
                        loading={loading}
                        error={error}
                        loadInspiration={loadInspiration}
                        searchTerm={searchTerm}
                    />
                </section>
            )}
        </div>
    );
};

export default Home;
