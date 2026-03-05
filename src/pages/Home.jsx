import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setSearchTerm, setSearchType } from '../store/searchSlice';

import useCuratedRecipes from '../hooks/useCuratedRecipes';
import useRecipeSearch from '../hooks/useRecipeSearch';

import HomeHeroSection from '../components/home/HomeHeroSection';
import HomeCuratedSection from '../components/home/HomeCuratedSection';
import HomeSearchResults from '../components/home/HomeSearchResults';

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('q');

    const {
        searchTerm,
        results: recipes,
        isShowingInspiration,
        searchType,
        allCategories,
        allAreas,
        allIngredients,
    } = useSelector((state) => state.search);

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

    const {
        loading,
        error,
        loadInspiration,
        handleSearch,
        handleTypeChange,
        handleAreaChange,
        handleCategoryClick,
    } = useRecipeSearch();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (recipes.length === 0 && !searchTerm && !loading && !urlQuery) {
            loadInspiration();
        }
    }, []);

    useEffect(() => {
        if (!isShowingInspiration) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isShowingInspiration]);

    const handleSuggestionClick = (ingredient) => {
        handleSearch(ingredient);
    };

    return (
        <div className="w-full">
            <HomeHeroSection
                isShowingInspiration={isShowingInspiration}
                searchType={searchType}
                onSearchTypeChange={handleTypeChange}
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
