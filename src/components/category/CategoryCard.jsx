import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/categories/${category.strCategory}`}
            className="group relative flex flex-col w-full h-[400px] rounded-[2rem] overflow-hidden bg-bg-surface border border-neutral-light/20 hover:border-text-base/30 hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
            <div className="relative h-1/2 w-full bg-neutral-light/5 p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 pointer-events-none" />
                <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="relative w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col flex-1 p-8 bg-bg-surface z-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Collection</span>
                <h3 className="text-2xl md:text-3xl font-serif text-text-base mb-3 group-hover:text-primary transition-colors">
                    {category.strCategory}
                </h3>
                <p className="text-sm text-neutral-dark font-light line-clamp-3 leading-relaxed mb-auto italic">
                    {category.strCategoryDescription || 'Explore delicious recipes in this category.'}
                </p>
                <div className="flex items-center gap-3 mt-6 text-[10px] font-bold uppercase tracking-widest text-text-base group-hover:text-primary transition-colors">
                    <span>Explore Recipes</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
