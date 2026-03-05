import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';

const HomeSearchResults = ({ recipes, loading, error, loadInspiration }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        setCurrentPage(1);
    }, [recipes]);

    const totalPages = Math.ceil(recipes.length / itemsPerPage);
    const currentRecipes = recipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: document.getElementById('search-results-top')?.offsetTop || 0, behavior: 'smooth' });
    };
    return (
        <div className="animate-in fade-in duration-700" id="search-results-top">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 border-b border-neutral-light/20 pb-4 gap-4">
                <h2 className="text-2xl md:text-3xl font-serif text-text-base shrink-0">
                    Search Results
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                    {/* Always render Top Pagination if we have recipes to show */}
                    {recipes.length > itemsPerPage && (
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
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
