import React from 'react';
import { Link } from 'react-router-dom';

const IngredientFeatureCard = ({ data, onAction, loading }) => {
    if (loading) {
        return (
            <div className="h-[400px] bg-neutral-light/5 animate-pulse rounded-3xl border border-neutral-light/10" />
        );
    }

    if (!data) return null;

    const title = data.strIngredient;
    const description = data.strDescription || "Explore the culinary possibilities of this essential ingredient.";
    const image = `https://www.themealdb.com/images/ingredients/${data.strIngredient}.png`;
    const link = `/ingredient/${data.strIngredient}`;

    return (
        <div className="relative group overflow-hidden rounded-3xl bg-neutral-light/5 border border-neutral-light/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 transition-all duration-500 hover:shadow-xl hover:bg-neutral-light/10 h-full">
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
                    Discovery
                </span>
                <h3 className="text-2xl md:text-4xl font-serif text-text-base mb-4 leading-tight group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-neutral-dark font-light leading-relaxed mb-6 line-clamp-2 md:line-clamp-3 text-sm italic">
                    {description}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Link
                        to={link}
                        className="px-6 py-3 bg-text-base text-bg-base text-[9px] font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded-full"
                    >
                        Know More
                    </Link>
                    {onAction && (
                        <button
                            onClick={() => onAction(data.strIngredient)}
                            className="px-6 py-3 bg-transparent border border-text-base/20 text-text-base text-[9px] font-bold uppercase tracking-widest hover:bg-text-base hover:text-bg-base transition-all rounded-full"
                        >
                            Explore Recipes
                        </button>
                    )}
                </div>
            </div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 order-1 md:order-2 flex-shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
                <Link to={link}>
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="relative w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>
            </div>
        </div>
    );
};

export default IngredientFeatureCard;
