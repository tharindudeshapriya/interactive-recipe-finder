import React from 'react';

/**
 * Top section of the recipe detail page.
 * Renders: nav back button, two-column layout with image and meta/title/favorite.
 *
 * Props:
 *   recipe           - full recipe object from API
 *   isFavorite       - boolean
 *   isRemoving       - boolean (animating removal)
 *   onToggleFavorite - callback()
 *   onBack           - callback() (navigate back)
 */
const RecipeHeader = ({ recipe, isFavorite, isRemoving, onToggleFavorite, onBack }) => {
    return (
        <>
            {/* Navigation */}
            <nav className="mb-12">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-text-base hover:after:w-full after:transition-all after:duration-300"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
            </nav>

            {/* Hero Grid */}
            <header className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-center">
                {/* Left: Meta + Title + Favorite */}
                <div className="order-2 lg:order-1">
                    {/* Meta tags */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
                        {recipe.strCategory && (
                            <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1">
                                {recipe.strCategory}
                            </span>
                        )}
                        {recipe.strArea && (
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark border border-neutral-light/50 bg-bg-surface rounded-full px-4 py-1">
                                {recipe.strArea} Origin
                            </span>
                        )}
                        {recipe.strDrinkAlternate && (
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark border border-neutral-light/50 bg-bg-surface rounded-full px-4 py-1">
                                Pairing: {recipe.strDrinkAlternate}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-serif text-text-base leading-tight mb-6 md:mb-8 font-medium">
                        {recipe.strMeal}
                    </h1>

                    {recipe.strTags && (
                        <div className="flex flex-wrap gap-3 mt-4 mb-8">
                            {recipe.strTags.split(',').map((tag) => (
                                <span key={tag} className="text-xs font-medium text-neutral-dark bg-secondary/20 px-3 py-1.5 uppercase tracking-wider rounded">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Favorite Button */}
                    <div className="mt-4 md:mt-8">
                        <button
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 border rounded-full transition-all duration-300 shadow-sm group font-bold tracking-widest text-[10px] md:text-xs uppercase ${isFavorite
                                ? 'bg-red-50 border-red-200 text-red-600 shadow-inner'
                                : 'bg-bg-surface border-neutral-light/30 text-neutral-dark hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                                } ${isRemoving ? '!bg-neutral-light/10 !border-neutral-light/30 !text-neutral-dark opacity-70 scale-95' : ''}`}
                            title={isFavorite ? 'Remove from collection' : 'Add to collection'}
                            onClick={onToggleFavorite}
                            disabled={isRemoving}
                        >
                            {isRemoving ? (
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 13-1-1 2-2-3-3 2-2" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            )}
                            {isRemoving ? 'Removing...' : isFavorite ? 'Remove from Collection' : 'Add to Collection'}
                        </button>
                    </div>
                </div>

                {/* Right: Image */}
                <figure className="order-1 lg:order-2 aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-light/10 shadow-sm border border-neutral-light/20 relative group">
                    <img
                        src={recipe.strMealThumb}
                        alt={`Photo of ${recipe.strMeal}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </figure>
            </header>
        </>
    );
};

export default RecipeHeader;
