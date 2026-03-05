import React from 'react';
import CarouselContainer from './CarouselContainer';
import RecipeCard from './RecipeCard';

const HomeArchiveSection = ({ recipes, loading, error, loadInspiration }) => {
    return (
        <CarouselContainer
            title="The Archive"
            description="Explore our complete collection of seasonal favorites."
            onRefresh={loadInspiration}
            refreshText="Shuffle Collection"
            autoScroll={true}
            interval={7000}
        >
            {loading && recipes.length === 0 ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="min-w-[280px] h-[400px] bg-neutral-light/5 animate-pulse rounded-2xl snap-start" />
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

export default HomeArchiveSection;
