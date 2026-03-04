import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { searchRecipesByCategory } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const CategoryDetails = () => {
    const { categoryName } = useParams();
    const { allCategories } = useSelector((state) => state.search);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Find the current category object to get its details
    const categoryDetails = allCategories.find(
        (cat) => cat.strCategory.toLowerCase() === categoryName.toLowerCase()
    );

    useEffect(() => {
        const fetchCategoryRecipes = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await searchRecipesByCategory(categoryName);
                if (results) {
                    setRecipes(results);
                    setCurrentPage(1); // Reset page on category change
                } else {
                    setError(`No recipes found for category: ${categoryName}`);
                }
            } catch (err) {
                setError('Failed to fetch category recipes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (categoryName) {
            fetchCategoryRecipes();
        }
    }, [categoryName]);

    const totalPages = Math.ceil(recipes.length / itemsPerPage);
    const currentRecipes = recipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
                <p className="text-xl md:text-2xl font-light text-neutral-dark italic mb-8 text-center">{error}</p>
                <Link to="/categories" className="px-8 py-3 bg-neutral-light/10 text-[10px] font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/20 transition-colors rounded-full">
                    Return to Categories
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 md:pt-20 pb-24 px-6 max-w-7xl mx-auto">

            {/* Breadcrumb Navigation */}
            <nav className="mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
                <Link to="/categories" className="text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-text-base transition-colors flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Categories
                </Link>
            </nav>

            {/* Header */}
            <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6 block">Collection</span>
                <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8">
                    {categoryName} <span className="italic font-light">Classics</span>
                </h1>

                {/* Real Category Description */}
                {categoryDetails && categoryDetails.strCategoryDescription && (
                    <div className="bg-neutral-light/5 border border-neutral-light/20 p-8 rounded-[2rem] mb-12 shadow-sm text-left">
                        <p className="text-base md:text-lg text-neutral-dark font-light leading-relaxed italic">
                            {categoryDetails.strCategoryDescription}
                        </p>
                    </div>
                )}

                <p className="text-sm md:text-base text-text-base font-bold uppercase tracking-widest text-center mt-8">
                    Explore exactly {recipes.length} exceptional recipes.
                </p>

                <div className="w-24 h-[1px] bg-neutral-light/30 mx-auto mt-12 mb-8"></div>

                <div className="flex justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {recipes.length > itemsPerPage && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="!mt-0 !w-auto justify-end"
                        />
                    )}
                </div>
            </header>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {currentRecipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CategoryDetails;
