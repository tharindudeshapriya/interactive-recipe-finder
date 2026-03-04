import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites';
    const isFavorite = useSelector((state) => selectIsFavorite(state, recipe.idMeal));
    const [isRemoving, setIsRemoving] = useState(false);

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite) {
            setIsRemoving(true);
            setTimeout(() => {
                dispatch(toggleFavorite(recipe));
                if (!isFavoritesPage) {
                    setIsRemoving(false);
                }
            }, 1600); // Wait for the heartbreak/fade animation
        } else {
            dispatch(toggleFavorite(recipe));
        }
    };

    return (
        <article className={`group h-full bg-bg-surface border border-neutral-light/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 ${!isRemoving ? 'hover:-translate-y-2' : ''} ${isRemoving && isFavoritesPage ? 'opacity-0 scale-90 translate-y-8 cursor-default pointer-events-none' : 'opacity-100 scale-100'}`}>
            <Link to={`/recipe/${recipe.idMeal}`} className="flex flex-col h-full">
                <figure className="relative aspect-[4/5] overflow-hidden bg-neutral-light/5">
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <button
                        className={`absolute top-3 right-3 p-2.5 backdrop-blur-md rounded-full transition-all duration-300 z-10 shadow-sm ${isFavorite
                            ? 'bg-bg-surface text-red-500'
                            : 'bg-bg-surface/80 text-neutral-dark hover:text-red-500'
                            } ${isRemoving ? 'scale-110 !text-neutral-dark' : ''}`}
                        onClick={handleToggleFavorite}
                    >
                        {isRemoving ? (
                            <svg className="w-5 h-5 text-neutral-dark opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 13-1-1 2-2-3-3 2-2" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        )}
                    </button>
                </figure>

                <div className="p-5 flex flex-col flex-grow text-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                        {recipe.strCategory || 'Recipe'}
                    </span>
                    <h3 className="text-lg md:text-xl font-serif text-text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {recipe.strMeal}
                    </h3>
                </div>
            </Link>
        </article>
    );
};

export default RecipeCard;
