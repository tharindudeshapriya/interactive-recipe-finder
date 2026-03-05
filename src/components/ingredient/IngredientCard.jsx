import React from 'react';
import { Link } from 'react-router-dom';

const IngredientCard = ({ ingredient }) => {
    return (
        <article className="h-full bg-bg-surface border border-neutral-light/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2">
            <Link
                to={`/ingredient/${ingredient.strIngredient}`}
                className="flex flex-col h-full p-6 items-center text-center group"
            >
                <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
                    <img
                        src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                        alt={ingredient.strIngredient}
                        loading="lazy"
                        className="relative w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                <div className="flex flex-col flex-grow items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary mb-2">Pantry Item</span>
                    <h3 className="text-lg font-serif text-text-base leading-snug group-hover:text-primary transition-colors mb-3">
                        {ingredient.strIngredient}
                    </h3>
                    <div className="mt-auto pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-light group-hover:text-text-base transition-colors border-b border-neutral-light/30 group-hover:border-text-base pb-1">
                            Know More
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default IngredientCard;
