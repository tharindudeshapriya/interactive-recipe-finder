import React from 'react';
import { Link } from 'react-router-dom';

const RecipeFeatureCard = ({ data, onRefresh, loading }) => {
    if (loading) {
        return (
            <div className="mb-24 h-[500px] bg-neutral-light/5 animate-pulse rounded-[2rem] border border-neutral-light/10" />
        );
    }

    if (!data) return null;

    return (
        <div className="mb-24 relative group overflow-hidden rounded-[2.5rem] bg-bg-surface border border-neutral-light/20 p-6 md:p-12 flex flex-col lg:flex-row items-center gap-10 md:gap-16 transition-all duration-700 hover:shadow-3xl">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-[1.2] order-2 lg:order-1 relative">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-8">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Featured Selection
                    </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif text-text-base mb-6 leading-tight">
                    Recipe of <span className="italic font-light">the Day</span>
                </h2>

                <div className="mb-8 p-6 bg-neutral-light/5 rounded-2xl border-l-4 border-primary">
                    <h3 className="text-2xl md:text-3xl font-serif text-text-base mb-3 group-hover:text-primary transition-colors">
                        {data.strMeal}
                    </h3>
                    <p className="text-neutral-dark font-light leading-relaxed text-sm md:text-base">
                        Explore this exquisite {data.strCategory.toLowerCase()} dish from {data.strArea}. A perfect blend of tradition and flavor.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                    <Link
                        to={`/recipe/${data.idMeal}`}
                        className="px-10 py-5 bg-text-base text-bg-base text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 rounded-full shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                    >
                        View Full Recipe
                    </Link>
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="flex items-center gap-3 px-6 py-4 bg-neutral-light/10 text-text-base text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-light/20 transition-all rounded-full group/refresh"
                        >
                            <svg className="w-5 h-5 group-hover/refresh:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Surprise Me</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 w-full lg:max-w-md relative group/img">
                {/* Image Wrapper with heavy rounding */}
                <div className="relative aspect-square overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-white transform lg:rotate-3 group-hover/img:rotate-0 transition-all duration-700">
                    <img
                        src={data.strMealThumb}
                        alt={data.strMeal}
                        loading="lazy"
                        className="w-full h-full object-cover scale-110 group-hover/img:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Decorative dots */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:8px_8px] text-primary/20 pointer-events-none" />
            </div>
        </div>
    );
};

export default RecipeFeatureCard;
