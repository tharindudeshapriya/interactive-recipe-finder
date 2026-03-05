import React from 'react';

/**
 * Two-tab toggle for switching between searching by recipe name or ingredient.
 *
 * Props:
 *   searchType         - 'name' | 'ingredient'
 *   onSearchTypeChange - callback(type: string)
 */
const SearchTypeToggle = ({ searchType, onSearchTypeChange }) => {
    return (
        <div className="flex justify-center mb-6 gap-4">
            <button
                onClick={() => onSearchTypeChange('name')}
                className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'name' ? 'text-text-base border-primary' : 'text-text-base/60 border-transparent hover:text-text-base'}`}
            >
                By Recipe Name
            </button>
            <button
                onClick={() => onSearchTypeChange('ingredient')}
                className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'ingredient' ? 'text-text-base border-primary' : 'text-text-base/60 border-transparent hover:text-text-base'}`}
            >
                By Primary Ingredient
            </button>
        </div>
    );
};

export default SearchTypeToggle;
