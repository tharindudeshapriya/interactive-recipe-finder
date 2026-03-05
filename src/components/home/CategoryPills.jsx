import React, { useState } from 'react';

/**
 * Category filter pills with a mobile show/hide toggle.
 *
 * Props:
 *   allCategories      - array of category objects { idCategory, strCategory }
 *   activeTerm         - currently active search term (to highlight the active pill)
 *   isShowingInspiration - boolean, whether the home page is in inspiration mode
 *   onCategoryClick    - callback(category: string)
 */
const CategoryPills = ({ allCategories, activeTerm, isShowingInspiration, onCategoryClick }) => {
    const [showMobile, setShowMobile] = useState(false);

    return (
        <div className="mt-12 md:mt-16">
            <div className="flex justify-center items-center mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Available Categories
                </h3>
                <button
                    onClick={() => setShowMobile(!showMobile)}
                    className="md:hidden ml-4 text-[10px] uppercase font-bold tracking-widest text-text-base border border-neutral-light/30 px-3 py-1 rounded-full transition-all bg-bg-surface/10 hover:bg-bg-surface/30"
                >
                    {showMobile ? 'Hide' : 'Show'}
                </button>
            </div>

            <div className={`justify-center items-center gap-2 md:gap-x-6 gap-y-4 flex flex-wrap transition-all duration-500 overflow-hidden pb-2 ${showMobile ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100'} md:mt-0`}>
                {allCategories.map((cat) => (
                    <button
                        key={cat.idCategory}
                        onClick={() => onCategoryClick(cat.strCategory)}
                        className={`text-[10px] md:text-sm font-medium tracking-wider uppercase transition-all px-4 py-2 md:p-0 rounded-full md:rounded-none border md:border-0 z-10 hover:z-20 ${activeTerm === cat.strCategory && !isShowingInspiration
                            ? 'bg-text-base text-bg-base border-text-base md:bg-transparent md:text-text-base'
                            : 'text-text-base/70 hover:text-text-base border-neutral-light/30 hover:border-text-base md:border-transparent md:hover:border-transparent'
                            } relative md:after:content-[''] md:after:absolute md:after:-bottom-1 md:after:left-0 md:after:w-0 md:after:h-[1px] md:after:bg-text-base md:hover:after:w-full md:after:transition-all md:after:duration-300`}
                    >
                        {cat.strCategory}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryPills;
