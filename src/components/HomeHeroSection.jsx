import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import useRandomBackground from '../hooks/useRandomBackground';

const HomeHeroSection = ({
    isShowingInspiration,
    searchType,
    setSearchType,
    searchTerm,
    setSearchTerm,
    handleSearch,
    allIngredients,
    allAreas,
    handleAreaChange,
    allCategories,
    handleCategoryClick,
    handleSuggestionClick
}) => {
    const [isAreaOpen, setIsAreaOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);

    const bgImage = useRandomBackground();

    const areaRef = useRef(null);
    const searchRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (areaRef.current && !areaRef.current.contains(event.target)) {
                setIsAreaOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (value) => {
        setSearchTerm(value);

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

    const onSearchSubmit = () => {
        setShowSuggestions(false);
        handleSearch(searchTerm);
    };

    return (
        <section className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isShowingInspiration ? 'py-12 md:py-32' : 'py-6 md:py-16'}`}>

            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slow-pan opacity-60"
                style={{ backgroundImage: `url('${bgImage}')` }}
            ></div>

            {/* Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/70 to-bg-base"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-8">
                <div className="px-6 text-center max-w-4xl mx-auto w-full">
                    <h1 className={`font-serif text-text-base tracking-tight transition-all duration-700 ${isShowingInspiration ? 'text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6' : 'text-2xl md:text-4xl mb-3 md:mb-4'}`}>
                        The Culinary <span className="italic font-light">Archive</span>
                    </h1>

                    <div className={`overflow-hidden transition-all duration-700 ${isShowingInspiration ? 'max-h-40 opacity-100 mb-12' : 'max-h-0 opacity-0 mb-6'}`}>
                        <p className="text-xl md:text-2xl text-text-base font-light max-w-2xl mx-auto leading-relaxed">
                            A curated collection of exceptional recipes for the modern home chef.
                        </p>
                    </div>

                    <div className="flex justify-center mb-6 gap-4">
                        <button
                            onClick={() => setSearchType('name')}
                            className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'name' ? 'text-text-base border-primary' : 'text-text-base/60 border-transparent hover:text-text-base'}`}
                        >
                            By Recipe Name
                        </button>
                        <button
                            onClick={() => setSearchType('ingredient')}
                            className={`text-[10px] font-bold tracking-widest uppercase transition-all pb-1 border-b-2 ${searchType === 'ingredient' ? 'text-text-base border-primary' : 'text-text-base/60 border-transparent hover:text-text-base'}`}
                        >
                            By Primary Ingredient
                        </button>
                    </div>

                    <div className="relative z-50 flex flex-col md:flex-row max-w-2xl mx-auto gap-4 items-center">
                        <div className="flex-grow w-full relative" ref={searchRef}>
                            <SearchBar
                                value={searchTerm}
                                onChange={handleInputChange}
                                onSubmit={onSearchSubmit}
                                placeholder={searchType === 'name' ? "Search recipes..." : "Enter an ingredient (e.g. Chicken)..."}
                                onFocus={() => searchTerm.length >= 2 && searchType === 'ingredient' && setShowSuggestions(true)}
                            >
                                {/* Autocomplete Suggestions */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top animate-in fade-in slide-in-from-top-2">
                                        <div className="py-2">
                                            {suggestions.map((item) => (
                                                <button
                                                    key={item.idIngredient}
                                                    onClick={() => {
                                                        setShowSuggestions(false);
                                                        handleSuggestionClick(item.strIngredient);
                                                    }}
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

                        <div className="w-full md:w-56 relative" ref={areaRef}>
                            <button
                                type="button"
                                onClick={() => setIsAreaOpen(!isAreaOpen)}
                                className="w-full bg-bg-surface border border-neutral-light/50 rounded-full py-3 md:py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm flex justify-between items-center group transition-all duration-300"
                            >
                                <span className="truncate">{searchTerm && allAreas.some(a => a.strArea === searchTerm) ? searchTerm : 'All Cuisines'}</span>
                                <svg
                                    className={`w-4 h-4 text-neutral-dark group-hover:text-text-base transition-transform duration-300 ${isAreaOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {/* Custom Dropdown Menu */}
                            <div className={`absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300 origin-top overflow-y-auto max-h-80 ${isAreaOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                                <div className="py-2">
                                    <button
                                        onClick={() => {
                                            handleAreaChange('');
                                            setIsAreaOpen(false);
                                        }}
                                        className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base transition-colors"
                                    >
                                        All Cuisines
                                    </button>
                                    {allAreas.map((area) => (
                                        <button
                                            key={area.strArea}
                                            onClick={() => {
                                                handleAreaChange(area.strArea);
                                                setIsAreaOpen(false);
                                            }}
                                            className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 hover:text-primary transition-colors border-t border-neutral-light/5 first:border-t-0"
                                        >
                                            {area.strArea}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-16">
                        <div className="flex justify-center items-center mb-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                Available Categories
                            </h3>
                            <button
                                onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
                                className="md:hidden ml-4 text-[10px] uppercase font-bold tracking-widest text-text-base border border-neutral-light/30 px-3 py-1 rounded-full transition-all bg-bg-surface/10 hover:bg-bg-surface/30"
                            >
                                {showCategoriesMobile ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className={`justify-center items-center gap-2 md:gap-x-6 gap-y-4 flex flex-wrap transition-all duration-500 overflow-hidden ${showCategoriesMobile ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100'} md:mt-0`}>
                            {allCategories.map((cat) => (
                                <button
                                    key={cat.idCategory}
                                    onClick={() => handleCategoryClick(cat.strCategory)}
                                    className={`text-[10px] md:text-sm font-medium tracking-wider uppercase transition-all px-4 py-2 md:p-0 rounded-full md:rounded-none border md:border-0 ${searchTerm === cat.strCategory && !isShowingInspiration
                                        ? 'bg-text-base text-bg-base border-text-base md:bg-transparent md:text-text-base'
                                        : 'text-text-base/70 hover:text-text-base border-neutral-light/30 hover:border-text-base md:border-transparent md:hover:border-transparent'
                                        } relative md:after:content-[''] md:after:absolute md:after:-bottom-1 md:after:left-0 md:after:w-0 md:after:h-[1px] md:after:bg-text-base md:hover:after:w-full md:after:transition-all md:after:duration-300`}
                                >
                                    {cat.strCategory}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroSection;
