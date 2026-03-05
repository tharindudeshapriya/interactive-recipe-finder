import React from 'react';
import { Link } from 'react-router-dom';
import CarouselContainer from '../common/CarouselContainer';
import IngredientFeatureCard from '../ingredient/IngredientFeatureCard';
import RecipeFeatureCard from '../recipe/RecipeFeatureCard';
import CategoryCarousel from '../category/CategoryCarousel';

/* ─── Category Mosaic ──────────────────────────────────────────────────────── */
const CategoryMosaic = ({ categories }) => {
    if (!categories || categories.length === 0) {
        return (
            <section className="mb-24">
                <div className="mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 block">Explore</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-base">
                        Browse by <span className="italic font-light">Category</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={`bg-neutral-light/5 animate-pulse rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                        />
                    ))}
                </div>
            </section>
        );
    }

    const featured = categories.slice(0, 6);

    return (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 block">Explore</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-base">
                        Browse by <span className="italic font-light">Category</span>
                    </h2>
                </div>
                <Link
                    to="/categories"
                    className="text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors flex items-center gap-2 shrink-0"
                >
                    View all categories
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* 
                Bento grid: 3 columns, 2 rows total.
                Hero card spans 2 cols, 2 rows. 
                Remaining 4 cards are 1 col, 1 row each, stacked on the right.
                Wait, if hero is 2 columns and 2 rows, we only have space for 2 more cards in a 3x2 grid. 
                Let's use a 4-column grid instead:
                Hero: 2 cols x 2 rows
                Cards 2, 3, 4, 5: 1 col x 1 row each 
            */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {/* Hero card — spans 2 cols / 2 rows */}
                <Link
                    to={`/categories/${featured[0]?.strCategory}`}
                    className="group relative overflow-hidden rounded-[2rem] bg-bg-surface border border-neutral-light/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 md:col-span-2 md:row-span-2"
                >
                    <img
                        src={featured[0]?.strCategoryThumb}
                        alt={featured[0]?.strCategory}
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 block mb-2">Featured</span>
                        <h3 className="text-white font-serif text-3xl md:text-4xl leading-tight mb-2">{featured[0]?.strCategory}</h3>
                        <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
                            Explore collection →
                        </span>
                    </div>
                </Link>

                {/* Remaining 4 cards */}
                {[featured[1], featured[2], featured[3], featured[4]].map((cat) => cat && (
                    <Link
                        key={cat.idCategory}
                        to={`/categories/${cat.strCategory}`}
                        className="group relative overflow-hidden rounded-2xl bg-bg-surface border border-neutral-light/10 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                    >
                        <img
                            src={cat.strCategoryThumb}
                            alt={cat.strCategory}
                            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-white font-serif text-xl md:text-2xl">{cat.strCategory}</h3>
                            <span className="text-white/50 text-[9px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Explore →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

/* ─── World Cuisines ───────────────────────────────────────────────────────── */
const WorldCuisines = ({ areas, onAreaChange }) => {
    if (!areas || areas.length === 0) return null;

    return (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Section header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 block">Discover</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-base">
                        Flavors of the <span className="italic font-light">World</span>
                    </h2>
                </div>
                <p className="text-sm text-neutral-dark font-light max-w-xs text-right hidden md:block">
                    {areas.length} distinct cuisines from around the globe.
                </p>
            </div>

            {/* Editorial pill grid */}
            <div className="flex flex-wrap gap-3">
                {areas.map((area) => (
                    <button
                        key={area.strArea}
                        onClick={() => onAreaChange(area.strArea)}
                        className="group px-5 py-2.5 border border-neutral-light/20 rounded-full text-text-base text-[11px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                        {area.strArea}
                    </button>
                ))}
            </div>

            {/* Decorative divider */}
            <div className="mt-16 flex items-center gap-6">
                <div className="flex-1 h-[1px] bg-neutral-light/15" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-dark/40">End of Cuisines</span>
                <div className="flex-1 h-[1px] bg-neutral-light/15" />
            </div>
        </section>
    );
};

/* ─── Main component ───────────────────────────────────────────────────────── */
const HomeCuratedSection = ({
    recipeOfTheDay,
    refreshRecipeOfTheDay,
    seafoodRecipes,
    dessertRecipes,
    vegetarianRecipes,
    curatedLoading,
    allCategories,
    allAreas,
    onAreaChange,
    refreshIngredients,
    dailyIngredients,
    handleSuggestionClick,
}) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-16">
            {/* 0. Recipe of the Day */}
            <RecipeFeatureCard
                data={recipeOfTheDay}
                onRefresh={refreshRecipeOfTheDay}
                loading={!recipeOfTheDay}
            />

            {/* 1. Category Mosaic */}
            <CategoryMosaic categories={allCategories} />

            {/* 1.5. Selected Categories Carousels */}
            <CategoryCarousel
                title="Seafood Classics"
                description="Fresh flavors from the depths of the ocean."
                recipes={seafoodRecipes}
                loading={curatedLoading}
            />

            <CategoryCarousel
                title="Vegetarian Delights"
                description="Wholesome and vibrant plant-based creations."
                recipes={vegetarianRecipes}
                loading={curatedLoading}
            />

            <CategoryCarousel
                title="Sweet Endings"
                description="Exquisite desserts to complete any meal."
                recipes={dessertRecipes}
                loading={curatedLoading}
            />

            {/* 2. Pantry Spotlight — ingredient feature carousel */}
            <CarouselContainer
                title="Pantry Spotlight"
                description="Master the building blocks of exceptional flavor."
                onRefresh={refreshIngredients}
                refreshText="Shuffle Ingredients"
                autoScroll={true}
                interval={6000}
            >
                {dailyIngredients.length === 0 ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="min-w-full md:min-w-[80%] lg:min-w-[70%] h-[400px] bg-neutral-light/5 animate-pulse rounded-3xl" />
                    ))
                ) : (
                    dailyIngredients.map((ing) => (
                        <div key={ing.idIngredient} className="min-w-full md:min-w-[80%] lg:min-w-[70%] snap-start h-full">
                            <IngredientFeatureCard
                                data={ing}
                                onAction={handleSuggestionClick}
                            />
                        </div>
                    ))
                )}
            </CarouselContainer>

            {/* 3. World Cuisines */}
            <WorldCuisines areas={allAreas} onAreaChange={onAreaChange} />
        </div>
    );
};

export default HomeCuratedSection;
