import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipesByName, getRandomRecipe, searchRecipesByCategory, searchRecipesByIngredient, searchRecipesByArea, listAllCategories, listAllAreas, listAllIngredients } from '../services/recipeApi';
import { setSearchTerm, setSearchResults, setInspirationResults, setSearchType, setAllCategories, setAllAreas, setAllIngredients } from '../store/searchSlice';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const dispatch = useDispatch();

    // Pull state from Redux store
    const { searchTerm, results: recipes, isShowingInspiration, searchType, allCategories, allAreas, allIngredients } = useSelector((state) => state.search);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAreaOpen, setIsAreaOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const areaRef = useRef(null);
    const searchRef = useRef(null);

    // Removed hardcoded categories

    const isMounted = useRef(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (areaRef.current && !areaRef.current.contains(event.target)) {
                setIsAreaOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load initial data on mount
    useEffect(() => {
        // Fetch lookup data if not present
        const fetchLookupData = async () => {
            try {
                if (allCategories.length === 0) {
                    const cats = await listAllCategories();
                    dispatch(setAllCategories(cats));
                }
                if (allAreas.length === 0) {
                    const areas = await listAllAreas();
                    dispatch(setAllAreas(areas));
                }
                if (allIngredients.length === 0) {
                    const ingredients = await listAllIngredients();
                    dispatch(setAllIngredients(ingredients));
                }
            } catch (err) {
                console.error('Failed to load lookup data');
            }
        };

        fetchLookupData();

        if (!isMounted.current && recipes.length === 0) {
            loadInspiration();
            isMounted.current = true;
        } else {
            isMounted.current = true;
        }
    }, [recipes.length, allCategories.length, allAreas.length, allIngredients.length]);

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
            let results;
            if (searchType === 'ingredient') {
                results = await searchRecipesByIngredient(term);
            } else {
                results = await searchRecipesByName(term);
            }
            dispatch(setSearchResults(results));
            if (results.length === 0) setError('No recipes found matching your query.');
        } catch (err) {
            setError('Failed to fetch recipes.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (value) => {
        dispatch(setSearchTerm(value));

        if (searchType === 'ingredient' && value.length >= 2) {
            const matches = allIngredients
                .filter(item => item.strIngredient.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 8); // Limit to top 8 suggestions
            setSuggestions(matches);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (ingredient) => {
        dispatch(setSearchTerm(ingredient));
        setShowSuggestions(false);
        handleSearch(ingredient);
    };

    const handleAreaChange = async (area) => {
        if (!area) return;
        setLoading(true);
        setError(null);
        dispatch(setSearchTerm('')); // Clear text search
        try {
            const results = await searchRecipesByArea(area);
            dispatch(setSearchResults(results));
            if (results.length === 0) setError(`No ${area} recipes found.`);
        } catch (err) {
            setError('Failed to fetch cuisine results.');
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

                <div className="flex justify-center mb-6 gap-4">
                    <button
                        onClick={() => dispatch(setSearchType('name'))}
                        className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'name' ? 'text-text-base border-primary' : 'text-neutral-dark border-transparent hover:text-text-base'}`}
                    >
                        By Recipe Name
                    </button>
                    <button
                        onClick={() => dispatch(setSearchType('ingredient'))}
                        className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'ingredient' ? 'text-text-base border-primary' : 'text-neutral-dark border-transparent hover:text-text-base'}`}
                    >
                        By Primary Ingredient
                    </button>
                </div>

                <div className="flex flex-col md:flex-row max-w-2xl mx-auto gap-4 items-center">
                    <div className="flex-grow w-full relative" ref={searchRef}>
                        <form onSubmit={handleSubmit} className="flex bg-bg-surface border border-neutral-light/50 rounded-full overflow-hidden shadow-sm transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 relative z-20 w-full group">
                            <input
                                type="text"
                                placeholder={searchType === 'name' ? "Search recipes..." : "Enter an ingredient (e.g. Chicken)..."}
                                className="flex-grow py-3 md:py-4 px-5 md:px-8 bg-transparent focus:outline-none text-base md:text-lg text-text-base border-none font-light placeholder:text-neutral-light placeholder:italic"
                                value={searchTerm}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onFocus={() => searchTerm.length >= 2 && searchType === 'ingredient' && setShowSuggestions(true)}
                            />
                            <button
                                type="submit"
                                className="py-3 md:py-4 px-6 md:px-10 text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 transition-colors border-l border-neutral-light/20 bg-neutral-light/5"
                            >
                                Search
                            </button>
                        </form>

                        {/* Autocomplete Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top animate-in fade-in slide-in-from-top-2">
                                <div className="py-2">
                                    {suggestions.map((item) => (
                                        <button
                                            key={item.idIngredient}
                                            onClick={() => handleSuggestionClick(item.strIngredient)}
                                            className="w-full text-left px-8 py-3 text-sm font-light text-text-base hover:bg-neutral-light/5 hover:text-primary transition-colors flex items-center justify-between group border-b border-neutral-light/5 last:border-0"
                                        >
                                            <span>{item.strIngredient}</span>
                                            <span className="text-[9px] font-bold uppercase tracking-tighter text-neutral-light opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-56 relative" ref={areaRef}>
                        <button
                            type="button"
                            onClick={() => setIsAreaOpen(!isAreaOpen)}
                            className="w-full bg-bg-surface border border-neutral-light/50 rounded-full py-3 md:py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm flex justify-between items-center group transition-all duration-300"
                        >
                            <span className="truncate">{searchTerm && allAreas.some(a => a.strArea === searchTerm) ? searchTerm : 'All Cuisines'}</span>
                            <svg
                                className={`w-4 h-4 text-neutral-dark group-hover:text-text-base transition-transform duration-300 ${isAreaOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {/* Custom Dropdown Menu */}
                        <div className={`absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top overflow-y-auto max-h-80 ${isAreaOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        handleAreaChange('');
                                        setIsAreaOpen(false);
                                    }}
                                    className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base transition-colors"
                                >
                                    All Cuisines
                                </button>
                                {allAreas.map((area) => (
                                    <button
                                        key={area.strArea}
                                        onClick={() => {
                                            handleAreaChange(area.strArea);
                                            setIsAreaOpen(false);
                                        }}
                                        className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 hover:text-primary transition-colors border-t border-neutral-light/5 first:border-t-0"
                                    >
                                        {area.strArea}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-2 md:gap-x-6 gap-y-3">
                    {allCategories.map((cat) => (
                        <button
                            key={cat.idCategory}
                            onClick={() => handleCategoryClick(cat.strCategory)}
                            className={`text-[10px] md:text-sm font-medium tracking-wider uppercase transition-all px-4 py-2 md:p-0 rounded-full md:rounded-none border md:border-0 ${searchTerm === cat.strCategory && !isShowingInspiration
                                ? 'bg-text-base text-bg-base border-text-base md:bg-transparent md:text-text-base'
                                : 'text-neutral-dark hover:text-text-base border-neutral-light/30 hover:border-text-base md:border-transparent md:hover:border-transparent'
                                } relative md:after:content-[''] md:after:absolute md:after:-bottom-1 md:after:left-0 md:after:w-0 md:after:h-[1px] md:after:bg-text-base md:hover:after:w-full md:after:transition-all md:after:duration-300`}
                        >
                            {cat.strCategory}
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
