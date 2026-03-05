import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../common/SearchBar';

/**
 * Search bar with an ingredient autocomplete suggestions dropdown.
 * Manages its own suggestion list and visibility state internally.
 *
 * Props:
 *   searchTerm       - current value in the search input
 *   onChange         - callback(value: string) — called when text changes
 *   onSubmit         - callback() — called when the search is submitted
 *   onSuggestionClick - callback(ingredient: string) — called when a suggestion is selected
 *   allIngredients   - full list of ingredient objects { idIngredient, strIngredient }
 *   searchType       - 'name' | 'ingredient' — autocomplete only fires for 'ingredient'
 */
const IngredientAutocomplete = ({
    searchTerm,
    onChange,
    onSubmit,
    onSuggestionClick,
    allIngredients,
    searchType,
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (value) => {
        onChange(value);

        if (searchType === 'ingredient' && value.length >= 2) {
            const matches = allIngredients
                .filter(item => item.strIngredient.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 8);
            setSuggestions(matches);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSubmit = () => {
        setShowSuggestions(false);
        onSubmit();
    };

    const handleSuggestionSelect = (ingredient) => {
        setShowSuggestions(false);
        onSuggestionClick(ingredient);
    };

    return (
        <div className="flex-grow w-full relative" ref={searchRef}>
            <SearchBar
                value={searchTerm}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                placeholder={searchType === 'name' ? 'Search recipes...' : 'Enter an ingredient (e.g. Chicken)...'}
                onFocus={() => searchTerm.length >= 2 && searchType === 'ingredient' && setShowSuggestions(true)}
            >
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top animate-in fade-in slide-in-from-top-2">
                        <div className="py-2">
                            {suggestions.map((item) => (
                                <button
                                    key={item.idIngredient}
                                    onClick={() => handleSuggestionSelect(item.strIngredient)}
                                    className="w-full text-left px-8 py-3 text-sm font-light text-text-base hover:bg-neutral-light/5 hover:text-primary transition-colors flex items-center justify-between group border-b border-neutral-light/5 last:border-0"
                                >
                                    <span>{item.strIngredient}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-tighter text-neutral-light opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </SearchBar>
        </div>
    );
};

export default IngredientAutocomplete;
