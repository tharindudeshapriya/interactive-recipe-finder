import React from 'react';
import RecipeFeatureCard from '../recipe/RecipeFeatureCard';
import CategoryCarousel from '../category/CategoryCarousel';
import CarouselContainer from '../common/CarouselContainer';
import IngredientFeatureCard from '../ingredient/IngredientFeatureCard';

const HomeCuratedSection = ({
    recipeOfTheDay,
    refreshRecipeOfTheDay,
    seafoodRecipes,
    dessertRecipes,
    vegetarianRecipes,
    loading,
    refreshIngredients,
    dailyIngredients,
    handleSuggestionClick
}) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* 1. Recipe of the Day */}
            <RecipeFeatureCard
                data={recipeOfTheDay}
                onRefresh={refreshRecipeOfTheDay}
                loading={!recipeOfTheDay}
            />

            {/* 2. Category Carousels */}
            <CategoryCarousel
                title="Seafood Classics"
                description="Fresh flavors from the depths of the ocean."
                recipes={seafoodRecipes}
                loading={loading}
            />

            <CategoryCarousel
                title="Vegetarian Delights"
                description="Wholesome and vibrant plant-based creations."
                recipes={vegetarianRecipes}
                loading={loading}
            />

            <CategoryCarousel
                title="Sweet Endings"
                description="Exquisite desserts to complete any meal."
                recipes={dessertRecipes}
                loading={loading}
            />

            {/* 3. Ingredient Spotlight Carousel */}
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
        </div>
    );
};

export default HomeCuratedSection;
