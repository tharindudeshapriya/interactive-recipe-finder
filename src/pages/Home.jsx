import { useState, useEffect, useRef } from 'react';
import { searchRecipesByName, getRandomRecipe, searchRecipesByCategory } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isShowingInspiration, setIsShowingInspiration] = useState(true);

    const categories = ['Chicken', 'Seafood', 'Dessert', 'Vegetarian', 'Beef', 'Pasta'];

    const isMounted = useRef(false);

    // Load some initial recipes when the page first loads
    useEffect(() => {
        if (!isMounted.current) {
            loadInspiration();
            isMounted.current = true;
        }
    }, []);

    const loadInspiration = async () => {
        setLoading(true);
        setError(null);
        setIsShowingInspiration(true);
        try {


            const randomPromises = Array.from({ length: 4 }).map(() => getRandomRecipe());
            const results = await Promise.all(randomPromises);

            // Filter out any null results just in case an API call failed
            const validResults = results.filter(recipe => recipe !== null);
            setRecipes(validResults);
        } catch (err) {
            setError('Failed to load inspiration.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (term) => {
        if (!term) return;
        setLoading(true);
        setError(null);
        setIsShowingInspiration(false);
        try {
            const results = await searchRecipesByName(term);
            setRecipes(results);
            if (results.length === 0) setError('No recipes found.');
        } catch (err) {
            setError('Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = async (category) => {
        setLoading(true);
        setError(null);
        setIsShowingInspiration(false);
        setSearchTerm('');
        try {
            const results = await searchRecipesByCategory(category);
            setRecipes(results);
            if (results.length === 0) setError('No recipes found in this category.');
        } catch (err) {
            setError('Failed to fetch category recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Stop the form from refreshing the page
        handleSearch(searchTerm);
    };

    return (
        <div className="w-full">
            {/* Elegant Hero Section */}
            <section className="py-20 md:py-32 px-6 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-6 tracking-tight">
                    The Culinary <span className="italic font-light">Archive</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-dark font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    A curated collection of exceptional recipes for the modern home chef.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-0 bg-bg-surface border border-neutral-light/50 rounded-full overflow-hidden shadow-sm transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <input
                        type="text"
                        placeholder="Search ingredients, dishes, or techniques..."
                        className="flex-grow py-4 px-8 bg-transparent focus:outline-none text-lg text-text-base border-none font-light placeholder:text-neutral-light placeholder:italic"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="py-4 px-8 text-sm font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/10 transition-colors border-l border-neutral-light/20 sm:border-l-0"
                    >
                        Search
                    </button>
                </form>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="text-sm font-medium tracking-wider text-neutral-dark hover:text-text-base uppercase transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-text-base hover:after:w-full after:transition-all after:duration-300"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Results Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-neutral-light/20 pb-4">
                    <h2 className="text-3xl font-serif text-text-base">
                        {isShowingInspiration ? 'Curated Selections' : 'Search Results'}
                    </h2>
                    {isShowingInspiration && (
                        <button
                            onClick={loadInspiration}
                            className="text-xs font-bold text-neutral-dark hover:text-text-base transition-colors uppercase tracking-widest mt-4 md:mt-0"
                        >
                            Shuffle Collection
                        </button>
                    )}
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="py-16 text-center">
                        <p className="text-xl text-neutral-dark font-light italic">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
