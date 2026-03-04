import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-bg-surface rounded-xl shadow-lg overflow-hidden border border-neutral-light/20 hover:shadow-xl transition-shadow group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-secondary px-2 py-1 rounded-md text-xs font-bold text-text-base shadow-sm">
                    {recipe.strCategory || 'Recipe'}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-text-base line-clamp-1 mb-3">
                    {recipe.strMeal}
                </h3>
                <Link
                    to={`/recipe/${recipe.idMeal}`}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-text-base font-bold py-2 rounded-lg transition-colors"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
