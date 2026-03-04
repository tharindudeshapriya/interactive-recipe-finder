import React from 'react';
import RecipeCard from './RecipeCard';

const HomeSearchResults = ({ recipes, loading, error, loadInspiration }) => {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-baseline mb-12 border-b border-neutral-light/20 pb-4">
                <h2 className="text-2xl md:text-3xl font-serif text-text-base">
                    Search Results
                </h2>
                <button
                    onClick={loadInspiration}
                    className="mt-4 sm:mt-0 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors"
                >
                    Clear Search
                </button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeSearchResults;
