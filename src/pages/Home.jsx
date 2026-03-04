import { useState, useEffect } from 'react';
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

    // Load some initial recipes when the page first loads
    useEffect(() => {
        loadInspiration();
    }, []);

    const loadInspiration = async () => {
        setLoading(true);
        setError(null);
        setIsShowingInspiration(true);
        try {
            // array of 4 promises for 4 random meals
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
            <section className="bg-primary py-16 px-6 mb-12 text-center rounded-3xl shadow-lg border-4 border-bg-surface mt-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-text-inverse mb-6 tracking-tight drop-shadow-sm">
                        Discover Your Next Favorite Meal
                    </h1>
                    <p className="text-xl text-text-base font-medium mb-10">
                        Search thousands of recipes from around the world
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-4">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            className="flex-grow p-4 rounded-xl border border-accent focus:outline-none focus:ring-4 focus:ring-secondary bg-bg-surface text-text-base shadow-sm text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-secondary text-text-base px-8 py-4 rounded-xl font-bold hover:bg-bg-surface transition-all shadow-md text-lg"
                        >
                            Search
                        </button>
                    </form>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className="bg-bg-surface/30 hover:bg-bg-surface/60 text-text-base border border-text-base/10 px-5 py-2 rounded-full font-bold transition-colors backdrop-blur-sm"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-text-base">
                        {isShowingInspiration ? 'Today\'s Inspiration' : 'Search Results'}
                    </h2>
                    {isShowingInspiration && (
                        <button
                            onClick={loadInspiration}
                            className="text-primary font-extrabold hover:text-text-base transition-colors uppercase tracking-wider text-sm"
                        >
                            Refresh
                        </button>
                    )}
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="bg-secondary/30 text-text-base p-6 rounded-xl text-center font-bold border border-accent shadow-sm">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
