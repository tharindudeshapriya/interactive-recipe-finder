import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchRecipesByIngredient } from '../services/recipeApi';
import { setSearchTerm, setSearchType, setSearchResults } from '../store/searchSlice';
import CategoryCarousel from '../components/CategoryCarousel';
import LoadingSpinner from '../components/LoadingSpinner';

const IngredientDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allIngredients } = useSelector((state) => state.search);

    const [ingredient, setIngredient] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // Find ingredient info from our pre-fetched list
                const found = allIngredients.find(ing => ing.strIngredient === name);
                setIngredient(found);

                // Fetch recipes using this ingredient
                const results = await searchRecipesByIngredient(name);
                setRecipes(results || []);
            } catch (err) {
                console.error("Failed to fetch ingredient details", err);
            } finally {
                setLoading(false);
            }
        };

        if (allIngredients.length > 0) {
            fetchDetails();
        }
    }, [name, allIngredients]);

    const handleExploreClick = () => {
        dispatch(setSearchTerm(name));
        dispatch(setSearchType('ingredient'));
        dispatch(setSearchResults(recipes));
        navigate('/');
    };

    if (loading) return <div className="pt-20"><LoadingSpinner /></div>;
    if (!ingredient) return <div className="pt-20 text-center">Ingredient not found</div>;

    return (
        <div className="min-h-screen pt-12 md:pt-20">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    Go Back
                </button>
            </div>

            {/* Header / Info Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="flex-1 order-2 md:order-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 block">Ingredient Profile</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8 leading-tight">{ingredient.strIngredient}</h1>
                    <p className="text-lg md:text-xl text-text-base font-light leading-relaxed italic mb-8 border-l-2 border-primary/30 pl-6">
                        {ingredient.strDescription || "Explore the unique qualities and culinary uses of this essential ingredient."}
                    </p>
                    <button
                        onClick={handleExploreClick}
                        className="px-8 py-4 bg-text-base text-bg-base text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded-full"
                    >
                        View more recipes
                    </button>
                </div>
                <div className="flex-1 order-1 md:order-2 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
                        <img
                            src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                            alt={ingredient.strIngredient}
                            className="relative w-full h-full object-contain drop-shadow-2xl animate-in zoom-in duration-1000"
                        />
                    </div>
                </div>
            </section>

            {/* Associated Recipes */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <CategoryCarousel
                    title={`Recipes with ${ingredient.strIngredient}`}
                    description={`Discover dishes that feature ${ingredient.strIngredient} as a primary component.`}
                    recipes={recipes}
                    loading={loading}
                />
            </section>
        </div>
    );
};

export default IngredientDetails;
