import React from 'react';
import RecipeCard from './RecipeCard';

const CategoryCarousel = ({ title, description, recipes, loading }) => {
    if (!loading && (!recipes || recipes.length === 0)) return null;

    return (
        <section className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-text-base mb-2">{title}</h2>
                    {description && <p className="text-neutral-dark font-light italic">{description}</p>}
                </div>
                <div className="hidden md:flex gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-light mt-4 md:mt-0">
                    Scroll to explore →
                </div>
            </div>

            <div className="relative group">
                <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
                    {loading ? (
                        // Skeleton Loaders
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-[4/5] bg-neutral-light/10 animate-pulse rounded-2xl snap-start" />
                        ))
                    ) : (
                        recipes.map((recipe) => (
                            <div key={recipe.idMeal} className="min-w-[280px] md:min-w-[320px] snap-start">
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))
                    )}
                </div>

                {/* Visual Fades for Desktop */}
                <div className="hidden md:block absolute top-0 left-0 bottom-8 w-12 bg-gradient-to-r from-bg-base to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="hidden md:block absolute top-0 right-0 bottom-8 w-12 bg-gradient-to-l from-bg-base to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </section>
    );
};

export default CategoryCarousel;
