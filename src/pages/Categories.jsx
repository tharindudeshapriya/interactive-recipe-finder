import React from 'react';
import { useSelector } from 'react-redux';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Categories = () => {
    const { allCategories } = useSelector((state) => state.search);

    return (
        <div className="min-h-screen pt-12 md:pt-20">
            {/* Header */}
            <header className="max-w-4xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700">Exploration Hub</span>
                <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Discover Culinary <br /> <span className="italic font-light">Categories</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-dark font-light italic mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Browse our curated collections of global cuisine and flavors.
                </p>
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
