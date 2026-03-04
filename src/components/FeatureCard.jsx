import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({
    type = 'recipe', // 'recipe' or 'ingredient'
    data,
    onAction,
    onRefresh,
    loading
}) => {
    if (loading) {
        return (
            <div className="mb-24 h-[400px] md:h-[500px] bg-neutral-light/5 animate-pulse rounded-3xl border border-neutral-light/10" />
        );
    }

    if (!data) return null;

    const isRecipe = type === 'recipe';
    const title = isRecipe ? data.strMeal : data.strIngredient;
    const description = isRecipe
        ? `${data.strCategory} • ${data.strArea}`
        : (data.strDescription || "Explore the culinary possibilities of this essential ingredient.");
    const image = isRecipe
        ? data.strMealThumb
        : `https://www.themealdb.com/images/ingredients/${data.strIngredient}.png`;
    const link = isRecipe ? `/recipe/${data.idMeal}` : `/ingredient/${data.strIngredient}`;

    return (
        <div className="mb-24 relative group overflow-hidden rounded-3xl bg-neutral-light/5 border border-neutral-light/10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 transition-all duration-500 hover:shadow-2xl hover:bg-neutral-light/10">
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 transition-all group-hover:tracking-[0.5em] duration-500">
                    {isRecipe ? 'Featured Creation' : 'Discovery'}
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-text-base mb-6 leading-tight">
                    {isRecipe ? 'Recipe' : 'Ingredient'} of <br className="hidden md:block" /> the <span className="italic font-light">Day</span>
                </h2>
                <h3 className="text-2xl md:text-3xl font-light text-text-base mb-4">{title}</h3>
                <p className="text-neutral-dark font-light leading-relaxed mb-8 max-w-lg line-clamp-3 md:line-clamp-none">
                    {description}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Link
                        to={link}
                        className="px-8 py-4 bg-text-base text-bg-base text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded-full"
                    >
                        {isRecipe ? 'View Recipe' : 'Know More'}
                    </Link>
                    {onAction && !isRecipe && (
                        <button
                            onClick={() => onAction(data.strIngredient)}
                            className="px-8 py-4 bg-transparent border border-text-base/20 text-text-base text-[10px] font-bold uppercase tracking-widest hover:bg-text-base hover:text-bg-base transition-all rounded-full"
                        >
                            Explore Recipes
                        </button>
                    )}
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="p-4 bg-neutral-light/10 text-text-base hover:bg-neutral-light/20 transition-colors rounded-full group/refresh"
                            title="Refresh"
                        >
                            <svg className="w-5 h-5 group-hover/refresh:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-1 relative aspect-square w-full max-w-sm order-1 md:order-2">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                <Link to={link}>
                    <img
                        src={image}
                        alt={title}
                        className="relative w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>
            </div>
        </div>
    );
};

export default FeatureCard;
