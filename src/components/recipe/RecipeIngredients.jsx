import React from 'react';

/**
 * Sticky sidebar card listing all ingredients and their measures.
 *
 * Props:
 *   ingredients - array of { ingredient: string, measure: string }
 */
const RecipeIngredients = ({ ingredients }) => {
    return (
        <aside className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="bg-bg-surface border border-neutral-light/40 shadow-sm p-8 md:p-10 rounded-xl relative overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/80" />

                <h2 className="text-2xl font-serif text-text-base mb-8">Provisions</h2>

                <ul className="flex flex-col gap-0">
                    {ingredients.map((item, index) => (
                        <li key={index} className="flex justify-between items-baseline py-4 border-b border-neutral-light/20 last:border-0 group">
                            <span className="text-text-base font-sans font-medium capitalize pr-4 group-hover:text-primary transition-colors">
                                {item.ingredient}
                            </span>
                            <span className="text-neutral-dark font-sans text-sm tracking-wide text-right whitespace-nowrap">
                                {item.measure}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default RecipeIngredients;
