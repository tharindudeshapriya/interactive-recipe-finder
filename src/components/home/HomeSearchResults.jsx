import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ITEMS_PER_PAGE } from '../../constants';
import RecipeCard from '../recipe/RecipeCard';
import Pagination from '../common/Pagination';
import FilterDropdown from '../common/FilterDropdown';
import useSearchFilters from '../../hooks/useSearchFilters';

const HomeSearchResults = ({ recipes, loading, error, loadInspiration, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic — extracts options from results and applies client-side filters
    const {
        availableCategories,
        availableCuisines,
        selectedCategory,
        selectedCuisine,
        setSelectedCategory,
        setSelectedCuisine,
        filteredRecipes,
        hasActiveFilters,
        clearFilters,
    } = useSearchFilters(recipes);

    // Reset page when recipes or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [recipes, selectedCategory, selectedCuisine]);

    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
    const currentRecipes = filteredRecipes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const { allAreas } = useSelector((state) => state.search);
    const isCuisine = allAreas.some(a => a.strArea === searchTerm);

    const filtersAvailable = availableCategories.length > 0 || availableCuisines.length > 0;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const target = document.getElementById('search-results-top');
        if (target) {
            const offset = target.offsetTop - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    return (
        <div className="animate-in fade-in duration-700" id="search-results-top">
            {/* Title row */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 border-b border-neutral-light/20 pb-4 gap-4">
                <h2 className="text-2xl md:text-3xl font-serif text-text-base shrink-0">
                    {searchTerm ? (
                        isCuisine ? (
                            <>Showing archives for <span className="italic font-light text-primary">{searchTerm} Cuisine</span></>
                        ) : (
                            <>Results for <span className="italic font-light text-primary">"{searchTerm}"</span></>
                        )
                    ) : (
                        "The Archive Selection"
                    )}
                </h2>

                <button
                    onClick={loadInspiration}
                    className="text-[10px] whitespace-nowrap font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors"
                >
                    Clear Search
                </button>
            </div>

            {/* Filter bar + pagination row */}
            {!loading && !error && recipes.length > 0 && (
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-2 duration-500">
                    {/* Left side: Filter dropdowns */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 w-full">
                        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                            <FilterDropdown
                                id="filter-category"
                                options={availableCategories}
                                selected={selectedCategory}
                                onChange={setSelectedCategory}
                                label="Categories"
                                disabled={availableCategories.length === 0}
                            />
                            <FilterDropdown
                                id="filter-cuisine"
                                options={availableCuisines}
                                selected={selectedCuisine}
                                onChange={setSelectedCuisine}
                                label="Cuisines"
                                disabled={availableCuisines.length === 0}
                            />
                        </div>

                        {/* Active filter indicator + clear */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-3 animate-in fade-in duration-300 ml-1 md:ml-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark/60">
                                    {filteredRecipes.length} Found
                                </span>
                                <div className="h-4 w-[1px] bg-neutral-light/20 hidden md:block" />
                                <button
                                    onClick={clearFilters}
                                    className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-all active:scale-95"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right side: Pagination */}
                    {filteredRecipes.length > ITEMS_PER_PAGE && (
                        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                className="!mt-0 !w-auto"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Content area */}
            {loading && recipes.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[400px] bg-neutral-light/5 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-xl md:text-2xl font-light text-neutral-dark italic mb-8">{error}</p>
                    <button onClick={loadInspiration} className="px-8 py-3 bg-neutral-light/10 text-[10px] font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/20 transition-colors rounded-full">Return to The Archive</button>
                </div>
            ) : filteredRecipes.length === 0 && hasActiveFilters ? (
                <div className="text-center py-20 animate-in fade-in duration-500">
                    <p className="text-xl md:text-2xl font-light text-neutral-dark italic mb-4">No recipes match the selected filters.</p>
                    <p className="text-sm text-neutral-dark mb-8">Try adjusting your category or cuisine selection.</p>
                    <button
                        onClick={clearFilters}
                        className="px-8 py-3 bg-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors rounded-full"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                        {currentRecipes.map((recipe) => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default HomeSearchResults;
