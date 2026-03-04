import React from 'react';
import { useSelector } from 'react-redux';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useRandomBackground from '../hooks/useRandomBackground';

const Categories = () => {
    const { allCategories } = useSelector((state) => state.search);
    const bgImage = useRandomBackground();

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="relative overflow-hidden pt-32 pb-24 text-center mb-16 px-4">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-slow-pan opacity-60"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/70 to-bg-base"></div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <span className="text-[10px] bg-bg-surface/90 font-bold uppercase tracking-[0.4em] text-text-base px-6 py-2 rounded-full mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-sm">Exploration Hub</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Discover Culinary <br /> <span className="italic font-light">Categories</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-base font-light italic mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Browse our curated collections of global cuisine and flavors.
                    </p>
                </div>
            </header>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                {allCategories.length === 0 ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {allCategories.map((category) => (
                            <CategoryCard key={category.idCategory} category={category} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Categories;
