import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
    // Read the array of saved recipes straight from the global Redux store
    const favoriteRecipes = useSelector((state) => state.favorites.items);

    return (
        <div className="w-full">
            {/* Minimalist Header */}
            <section className="bg-bg-surface py-20 px-6 border-b border-text-base/10 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-serif text-text-base tracking-tight mb-4">
                        Your Collection
                    </h1>
                    <p className="text-neutral-dark font-sans tracking-widest text-sm uppercase">
                        {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'Recipe' : 'Recipes'} Saved
                    </p>
                </div>
            </section>

            {/* Results Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                {favoriteRecipes.length === 0 ? (
                    <div className="text-center py-24 bg-bg-surface border border-neutral-light/20 rounded-2xl shadow-sm">
                        <svg className="w-16 h-16 mx-auto text-neutral-light mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <h2 className="text-2xl font-serif text-text-base mb-4">Your collection is empty</h2>
                        <p className="text-neutral-dark font-light mb-8 max-w-md mx-auto">
                            You haven't added any dishes to your personal archive yet. Explore our selections and save your favorites.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-base border border-text-base/20 hover:border-text-base hover:bg-bg-surface/50 transition-all px-8 py-4 rounded-full"
                        >
                            Explore Recipes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {favoriteRecipes.map((recipe) => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Favorites;
