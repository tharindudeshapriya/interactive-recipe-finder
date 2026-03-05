import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ITEMS_PER_PAGE } from '../../constants';
import RecipeCard from '../recipe/RecipeCard';
import Pagination from '../common/Pagination';

const HomeSearchResults = ({ recipes, loading, error, loadInspiration, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [recipes]);

    const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
    const currentRecipes = recipes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const { allAreas } = useSelector((state) => state.search);
    const isCuisine = allAreas.some(a => a.strArea === searchTerm);

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
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 border-b border-neutral-light/20 pb-4 gap-4">
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

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                    {recipes.length > ITEMS_PER_PAGE && (
                        <div className="flex-1 w-full sm:w-auto flex justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                className="!mt-0 !w-auto justify-end"
                            />
                        </div>
                    )}
                    <button
                        onClick={loadInspiration}
                        className="text-[10px] whitespace-nowrap font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors"
                    >
                        Clear Search
                    </button>
                </div>
            </div>

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
