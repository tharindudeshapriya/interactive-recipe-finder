import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';
import { getRecipeDetailsById } from '../services/recipeApi';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    // Safely check if the current recipe is favorited (default to false if recipe is null)
    const isFavorite = useSelector((state) =>
        recipe ? selectIsFavorite(state, recipe.idMeal) : false
    );

    useEffect(() => {

        window.scrollTo(0, 0);

        const fetchRecipe = async () => {
            try {
                const data = await getRecipeDetailsById(id);
                if (data) {
                    setRecipe(data);
                } else {
                    setError('Recipe not found.');
                }
            } catch (err) {
                setError('Failed to load recipe details.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({ ingredient, measure });
            }
        }
        return ingredients;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

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

    const ingredients = getIngredients();

    // Formatting instructions
    const formattedInstructions = recipe.strInstructions
        .split(/(?:\r?\n)+/)
        .filter(paragraph => paragraph.trim().length > 0);

    return (
        <article className="max-w-7xl mx-auto w-full pt-8 pb-24 px-6">
            {/* Top Navigation */}
            <nav className="mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-text-base hover:after:w-full after:transition-all after:duration-300"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Go Back
                </button>
            </nav>

            <header className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-center">
                <div className="order-2 lg:order-1">
                    {/* Meta tags */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
                        {recipe.strCategory && (
                            <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1">
                                {recipe.strCategory}
                            </span>
                        )}
                        {recipe.strArea && (
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark border border-neutral-light/50 bg-bg-surface rounded-full px-4 py-1">
                                {recipe.strArea} Origin
                            </span>
                        )}
                        {recipe.strDrinkAlternate && (
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark border border-neutral-light/50 bg-bg-surface rounded-full px-4 py-1">
                                Pairing: {recipe.strDrinkAlternate}
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif text-text-base leading-tight mb-8">
                        {recipe.strMeal}
                    </h1>

                    {recipe.strTags && (
                        <div className="flex flex-wrap gap-3 mt-4 mb-8">
                            {recipe.strTags.split(',').map((tag) => (
                                <span key={tag} className="text-xs font-medium text-neutral-dark bg-secondary/20 px-3 py-1.5 uppercase tracking-wider rounded">
                                    #{tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-8">
                        <button
                            className={`inline-flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-300 shadow-sm group font-bold tracking-widest text-xs uppercase ${isFavorite
                                ? 'bg-red-50 border-red-200 text-red-600 shadow-inner'
                                : 'bg-bg-surface border-neutral-light/30 text-neutral-dark hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                                }`}
                            title={isFavorite ? "Remove from collection" : "Add to collection"}
                            onClick={() => dispatch(toggleFavorite(recipe))}
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            {isFavorite ? "Remove from Collection" : "Add to Collection"}
                        </button>
                    </div>
                </div>

                <figure className="order-1 lg:order-2 aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-light/10 shadow-sm border border-neutral-light/20 relative group">
                    <img
                        src={recipe.strMealThumb}
                        alt={`Photo of ${recipe.strMeal}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </figure>
            </header>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start border-t border-text-base/10 pt-16">

                {/* Ingredients Column */}
                <aside className="lg:col-span-4 lg:sticky lg:top-32">
                    <div className="bg-bg-surface border border-neutral-light/40 shadow-sm p-8 md:p-10 rounded-xl relative overflow-hidden">
                        {/* Decorative accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/80"></div>

                        <h2 className="text-2xl font-serif text-text-base mb-8">
                            Provisions
                        </h2>
                        <ul className="flex flex-col gap-0">
                            {ingredients.map((item, index) => (
                                <li key={index} className="flex justify-between items-baseline py-4 border-b border-neutral-light/20 last:border-0 group">
                                    <span className="text-text-base font-sans font-medium capitalize pr-4 group-hover:text-primary transition-colors">{item.ingredient}</span>
                                    <span className="text-neutral-dark font-sans text-sm tracking-wide text-right whitespace-nowrap">{item.measure}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Method / Instructions Column */}
                <section className="lg:col-span-8">
                    <h2 className="text-3xl font-serif text-text-base mb-10 pb-4 border-b border-text-base/10">
                        Preparation Method
                    </h2>

                    <div className="space-y-8 font-sans">
                        {formattedInstructions.map((paragraph, index) => {
                            // Basic heuristic to catch "Step 1" or numbered list prefixes in the raw text
                            const isStepHeader = /^step\s*\d+:?/i.test(paragraph) || /^\d+\./.test(paragraph);

                            return (
                                <div key={index} className="flex gap-4 md:gap-8 items-start group">
                                    <span className="shrink-0 text-text-base/20 font-serif text-3xl md:text-5xl font-bold leading-none select-none transition-colors group-hover:text-primary/30">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <p className={`text-lg leading-relaxed text-text-base ${isStepHeader ? 'font-medium mt-2' : 'font-light mt-1 md:mt-3'}`}>
                                        {paragraph}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Resources from API */}
                    <div className="mt-20 pt-12 border-t border-text-base/10 grid sm:grid-cols-2 gap-8">
                        {recipe.strYoutube && (
                            <div className="bg-bg-surface border border-neutral-light/30 rounded-xl p-8 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-serif text-text-base mb-3">Visual Guide</h3>
                                    <p className="text-neutral-dark font-light text-sm mb-8 leading-relaxed">
                                        Prefer learning by watching? View the official preparation video for {recipe.strMeal}.
                                    </p>
                                </div>
                                <a
                                    href={recipe.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-base bg-secondary/30 hover:bg-secondary/60 px-6 py-3 rounded-full transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                    Watch Video
                                </a>
                            </div>
                        )}

                        {recipe.strSource && (
                            <div className="bg-bg-surface border border-neutral-light/30 rounded-xl p-8 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-serif text-text-base mb-3">Original Source</h3>
                                    <p className="text-neutral-dark font-light text-sm mb-8 leading-relaxed">
                                        View the original publication or blog post where this recipe was first documented.
                                    </p>
                                </div>
                                <a
                                    href={recipe.strSource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-base border border-text-base/20 hover:border-text-base focus:ring-2 focus:ring-primary px-6 py-3 rounded-full transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Visit Website
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </article>
    );
};

export default RecipeDetails;
