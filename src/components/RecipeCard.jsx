import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state) => selectIsFavorite(state, recipe.idMeal));

    return (
        <article className="group h-full bg-bg-surface border border-neutral-light/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2">
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
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(toggleFavorite(recipe));
                        }}
                    >
                        <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
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
