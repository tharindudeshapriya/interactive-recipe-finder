import React from 'react';
import useRandomBackground from '../../hooks/useRandomBackground';
import SearchTypeToggle from './SearchTypeToggle';
import AreaDropdown from './AreaDropdown';
import CategoryPills from './CategoryPills';
import IngredientAutocomplete from './IngredientAutocomplete';

/**
 * Home page hero section — orchestrates the search UI.
 * All dropdown/autocomplete state is managed by the child components.
 */
const HomeHeroSection = ({
    isShowingInspiration,
    searchType,
    onSearchTypeChange,
    searchTerm,
    onSearchTermChange,
    onSearch,
    allIngredients,
    allAreas,
    onAreaChange,
    allCategories,
    onCategoryClick,
    onSuggestionClick,
}) => {
    const bgImage = useRandomBackground();

    return (
        <section className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isShowingInspiration ? 'py-12 md:py-32' : 'py-6 md:py-16'}`}>

            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slow-pan opacity-60 overflow-hidden"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/70 to-bg-base" />

            {/* Content */}
            <div className="relative z-[70] w-full h-full flex flex-col items-center justify-center pt-8">
                <div className="px-6 text-center max-w-4xl mx-auto w-full">

                    {/* Logo + Title */}
                    <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
                        <svg className={`text-primary transition-all duration-700 ${isShowingInspiration ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-10 md:h-10'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" x2="18" y1="17" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                        </svg>
                        <h1 className={`font-serif text-text-base tracking-tight transition-all duration-700 ${isShowingInspiration ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-2xl md:text-4xl'} m-0`}>
                            The Culinary <span className="italic font-light">Archive</span>
                        </h1>
                    </div>

                    {/* Subtitle — only visible in inspiration mode */}
                    <div className={`overflow-hidden transition-all duration-700 ${isShowingInspiration ? 'max-h-40 opacity-100 mb-12' : 'max-h-0 opacity-0 mb-6'}`}>
                        <p className="text-xl md:text-2xl text-text-base font-light max-w-2xl mx-auto leading-relaxed">
                            A curated collection of exceptional recipes for the modern home chef.
                        </p>
                    </div>

                    {/* Search Type Toggle */}
                    <SearchTypeToggle
                        searchType={searchType}
                        onSearchTypeChange={onSearchTypeChange}
                    />

                    {/* Search Row */}
                    <div className="relative z-50 flex flex-col md:flex-row max-w-2xl mx-auto gap-4 items-center">
                        <IngredientAutocomplete
                            searchTerm={searchTerm}
                            onChange={onSearchTermChange}
                            onSubmit={onSearch}
                            onSuggestionClick={onSuggestionClick}
                            allIngredients={allIngredients}
                            searchType={searchType}
                        />
                        <AreaDropdown
                            allAreas={allAreas}
                            selectedArea={searchTerm}
                            onAreaChange={onAreaChange}
                        />
                    </div>

                    {/* Category Pills */}
                    <CategoryPills
                        allCategories={allCategories}
                        activeTerm={searchTerm}
                        isShowingInspiration={isShowingInspiration}
                        onCategoryClick={onCategoryClick}
                    />
                </div>
            </div>
        </section>
    );
};

export default HomeHeroSection;
