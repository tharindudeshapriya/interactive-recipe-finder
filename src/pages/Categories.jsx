import React from 'react';
import { useSelector } from 'react-redux';
import CategoryCard from '../components/category/CategoryCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageHero from '../components/common/PageHero';

const Categories = () => {
    const { allCategories } = useSelector((state) => state.search);

    return (
        <div className="min-h-screen">
            <PageHero
                badge="Exploration Hub"
                title="Discover Culinary"
                titleItalic="Categories"
                subtitle="Browse our curated collections of global cuisine and flavors."
            />

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
