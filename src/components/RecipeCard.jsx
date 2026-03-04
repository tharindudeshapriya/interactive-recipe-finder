import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state) => selectIsFavorite(state, recipe.idMeal));
    return (
        <article className="group cursor-pointer bg-bg-surface border border-neutral-light/50 rounded-xl p-3 pb-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <Link to={`/recipe/${recipe.idMeal}`} className="block">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-light/10 mb-5">
                    <img
                        src={recipe.strMealThumb}
                        alt={`Photo of ${recipe.strMeal}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <button
                        className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-all duration-300 z-10 ${isFavorite
                            ? 'bg-bg-surface text-red-500 shadow-md'
                            : 'bg-bg-surface/80 text-neutral-dark hover:text-red-500 hover:bg-bg-surface'
                            }`}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(toggleFavorite(recipe));
                        }}
                    >
                        <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </figure>
                <div className="flex flex-col items-center text-center px-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-dark mb-2">
                        {recipe.strCategory || 'Recipe'}
                    </span>
                    <h3 className="text-xl font-serif text-text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {recipe.strMeal}
                    </h3>
                </div>
            </Link>
        </article>
    );
};

export default RecipeCard;
