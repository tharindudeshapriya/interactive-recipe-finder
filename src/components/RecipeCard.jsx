import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <article className="group cursor-pointer bg-bg-surface border border-neutral-light/50 rounded-xl p-3 pb-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <Link to={`/recipe/${recipe.idMeal}`} className="block">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-light/10 mb-5">
                    <img
                        src={recipe.strMealThumb}
                        alt={`Photo of ${recipe.strMeal}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
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
