import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipesByName, getRandomRecipe, searchRecipesByCategory } from '../services/recipeApi';
import { setSearchTerm, setSearchResults, setInspirationResults } from '../store/searchSlice';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const dispatch = useDispatch();

    // Pull state from Redux store
    const { searchTerm, results: recipes, isShowingInspiration } = useSelector((state) => state.search);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = ['Chicken', 'Seafood', 'Dessert', 'Vegetarian', 'Beef', 'Pasta'];

    const isMounted = useRef(false);

    // Load initial inspiration if results are not already present in Redux
    useEffect(() => {
        if (!isMounted.current && recipes.length === 0) {
            loadInspiration();
            isMounted.current = true;
        } else {
            // Prevent duplicate fetch on strict mode remount
            isMounted.current = true;
        }
    }, [recipes.length]);

    const loadInspiration = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch 4 random meals
            const randomPromises = Array.from({ length: 4 }).map(() => getRandomRecipe());
            const results = await Promise.all(randomPromises);

            // Filter out any null results just in case an API call failed
            const validResults = results.filter(recipe => recipe !== null);
            dispatch(setInspirationResults(validResults));
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
        try {
            const results = await searchRecipesByName(term);
            dispatch(setSearchResults(results));
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
        // Dispatch category directly as the search term for UI consistency
        dispatch(setSearchTerm(category));
        try {
            const results = await searchRecipesByCategory(category);
            dispatch(setSearchResults(results));
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
            <section className={`px-6 text-center max-w-4xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isShowingInspiration ? 'py-12 md:py-32' : 'py-6 md:py-16'
                }`}>
                <h1 className={`font-serif text-text-base tracking-tight transition-all duration-700 ${isShowingInspiration ? 'text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6' : 'text-2xl md:text-4xl mb-3 md:mb-4'
                    }`}>
                    The Culinary <span className="italic font-light">Archive</span>
                </h1>

                <div className={`overflow-hidden transition-all duration-700 ${isShowingInspiration ? 'max-h-40 opacity-100 mb-12' : 'max-h-0 opacity-0 mb-6'
                    }`}>
                    <p className="text-xl md:text-2xl text-neutral-dark font-light max-w-2xl mx-auto leading-relaxed">
                        A curated collection of exceptional recipes for the modern home chef.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex max-w-2xl mx-auto bg-bg-surface border border-neutral-light/50 rounded-full overflow-hidden shadow-sm transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 relative z-10 w-full group">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="flex-grow py-3 md:py-4 px-5 md:px-8 bg-transparent focus:outline-none text-base md:text-lg text-text-base border-none font-light placeholder:text-neutral-light placeholder:italic"
                        value={searchTerm}
                        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    />
                    <button
                        type="submit"
                        className="py-3 md:py-4 px-6 md:px-10 text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 transition-colors border-l border-neutral-light/20 bg-neutral-light/5"
                    >
                        Search
                    </button>
                </form>

                <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
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
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-baseline mb-8 md:mb-12 border-b border-neutral-light/20 pb-4">
                    <h2 className="text-2xl md:text-3xl font-serif text-text-base">
                        {isShowingInspiration ? 'Curated Selections' : 'Search Results'}
                    </h2>
                    {isShowingInspiration && (
                        <button
                            onClick={loadInspiration}
                            className="text-[10px] md:text-xs font-bold text-neutral-dark hover:text-text-base transition-colors uppercase tracking-widest mt-4 sm:mt-0"
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
