import React from 'react';
import { Link } from 'react-router-dom';

const IngredientCard = ({ ingredient }) => {
    return (
        <Link
            to={`/ingredient/${ingredient.strIngredient}`}
            className="group flex flex-col items-center p-6 bg-bg-surface border border-neutral-light/20 rounded-2xl transition-all duration-500 hover:shadow-xl hover:border-primary/30"
        >
            <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                    alt={ingredient.strIngredient}
                    className="relative w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h3 className="text-sm md:text-base font-medium text-text-base text-center group-hover:text-primary transition-colors">
                {ingredient.strIngredient}
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-light mt-2 group-hover:text-text-base transition-colors">
                Know More
            </span>
        </Link>
    );
};

export default IngredientCard;
