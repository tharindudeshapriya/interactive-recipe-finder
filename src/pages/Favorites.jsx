import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import useRandomBackground from '../hooks/useRandomBackground';

const Favorites = () => {
    // Read the array of saved recipes straight from the global Redux store
    const favoriteRecipes = useSelector((state) => state.favorites.items);
    const bgImage = useRandomBackground();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(favoriteRecipes.length / itemsPerPage);

    // If items are removed and we're on a page that no longer exists, go back
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [favoriteRecipes.length, totalPages, currentPage]);

    const currentRecipes = favoriteRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: window.innerWidth < 768 ? 400 : 500, behavior: 'smooth' });
    };

    return (
        <div className="w-full">
            {/* Animated Header */}
            <header className="relative overflow-hidden pt-32 pb-24 px-6 text-center mb-12 shadow-sm">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-slow-pan opacity-60"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/70 to-bg-base"></div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary bg-bg-base/80 px-4 py-2 rounded-full inline-block backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">Digital Cookbook</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-text-base tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Your <span className="italic font-light">Collection</span>
                    </h1>
                    <p className="text-text-base font-light font-sans tracking-widest text-sm uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'Recipe' : 'Recipes'} Saved
                    </p>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex justify-end">
                    {favoriteRecipes.length > itemsPerPage && (
                        <div className="flex justify-end mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                className="!mt-0 !w-auto justify-end"
                            />
                        </div>
                    )}
                </div>
            </header>

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
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {currentRecipes.map((recipe) => (
                                <RecipeCard key={recipe.idMeal} recipe={recipe} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </section>
        </div>
    );
};

export default Favorites;
