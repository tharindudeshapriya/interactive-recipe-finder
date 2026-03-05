import React from 'react';

const SearchTypeToggle = ({ searchType, onSearchTypeChange }) => {
    return (
        <div className="flex flex-col items-center mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-base/40 mb-4">
                Select Search Type
            </span>
            <div className="flex justify-center gap-8">
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
        </div>
    );
};

export default SearchTypeToggle;
