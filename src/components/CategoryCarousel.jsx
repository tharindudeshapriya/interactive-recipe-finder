import React from 'react';
import RecipeCard from './RecipeCard';
import CarouselContainer from './CarouselContainer';

const CategoryCarousel = ({ title, description, recipes, loading }) => {
    if (loading && (!recipes || recipes.length === 0)) {
        return (
            <div className="mb-24 h-64 bg-neutral-light/5 animate-pulse rounded-3xl border border-neutral-light/10" />
        );
    }

    if (!loading && (!recipes || recipes.length === 0)) return null;

    return (
        <CarouselContainer
            title={title}
            description={description}
            autoScroll={true}
        >
            {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="min-w-[280px] h-[350px] bg-neutral-light/5 animate-pulse rounded-2xl snap-start" />
                ))
            ) : (
                recipes.map((recipe) => (
                    <div key={recipe.idMeal} className="min-w-[280px] snap-start">
                        <RecipeCard recipe={recipe} />
                    </div>
                ))
            )}
        </CarouselContainer>
    );
};

export default CategoryCarousel;
