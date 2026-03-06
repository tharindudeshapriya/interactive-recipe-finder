import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';
import { getRecipeDetailsById } from '../services/recipeApi';
import { getIngredients } from '../utils/recipeUtils';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RecipeHeader from '../components/recipe/RecipeHeader';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import RecipeInstructions from '../components/recipe/RecipeInstructions';
import RecipeResources from '../components/recipe/RecipeResources';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isFavorite = useSelector((state) =>
        recipe ? selectIsFavorite(state, recipe.idMeal) : false
    );
    const [isRemoving, setIsRemoving] = useState(false);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            setIsRemoving(true);
            setTimeout(() => {
                dispatch(toggleFavorite(recipe));
                setIsRemoving(false);
            }, 600);
        } else {
            dispatch(toggleFavorite(recipe));
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        window.scrollTo(0, 0);

        const fetchRecipe = async () => {
            try {
                const data = await getRecipeDetailsById(id, controller.signal);
                if (data) {
                    setRecipe(data);
                } else {
                    setError('Recipe not found.');
                    toast.error('Recipe not found.');
                }
            } catch (err) {
                if (err.name === 'AbortError') return;
                const msg = err.name === 'NetworkError' ? err.message : 'Failed to load recipe details. Please try again.';
                setError(msg);
                toast.error(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
        return () => controller.abort();
    }, [id]);



    if (loading) return <LoadingSpinner />;

    if (error || !recipe) {
        return (
            <div className="max-w-2xl mx-auto text-center py-32 px-4">
                <h2 className="text-4xl font-serif text-text-base mb-4">Content Unavailable</h2>
                <div className="text-neutral-dark font-light italic text-lg mb-8">
                    {error || 'The requested recipe archive could not be located.'}
                </div>
                <button onClick={() => navigate(-1)} className="text-sm font-bold tracking-widest text-text-base hover:text-primary transition-colors uppercase border-b border-text-base hover:border-primary pb-1">
                    Go Back
                </button>
            </div>
        );
    }

    const ingredients = getIngredients(recipe);

    return (
        <article className="max-w-7xl mx-auto w-full pt-8 pb-24 px-6">
            <RecipeHeader
                recipe={recipe}
                isFavorite={isFavorite}
                isRemoving={isRemoving}
                onToggleFavorite={handleToggleFavorite}
                onBack={() => navigate(-1)}
            />

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start border-t border-text-base/10 pt-16">
                <RecipeIngredients ingredients={ingredients} />
                <RecipeInstructions instructions={recipe.strInstructions} />
            </div>

            <RecipeResources
                youtubeUrl={recipe.strYoutube}
                sourceUrl={recipe.strSource}
                mealName={recipe.strMeal}
            />
        </article>
    );
};

export default RecipeDetails;


