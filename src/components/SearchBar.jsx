import React from 'react';

const SearchBar = ({
    value,
    onChange,
    onSubmit,
    placeholder = "Search...",
    buttonText = "Search",
    onFocus,
    children // For autocomplete dropdowns
}) => {
    return (
        <div className="flex-grow w-full relative">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (onSubmit) onSubmit(e);
                }}
                className="flex bg-bg-surface border border-neutral-light/50 rounded-full overflow-hidden shadow-sm transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 relative z-20 w-full group"
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    className="flex-grow py-2.5 md:py-4 px-4 md:px-8 bg-transparent focus:outline-none text-sm md:text-lg text-text-base border-none font-light placeholder:text-neutral-light placeholder:italic min-w-0"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                />
                <button
                    type="submit"
                    className="shrink-0 py-2.5 md:py-4 px-3 md:px-10 text-text-base hover:bg-neutral-light/5 transition-colors border-l border-neutral-light/20 bg-neutral-light/5 flex items-center justify-center"
                    aria-label={buttonText}
                >
                    {/* Icon on mobile, text on desktop */}
                    <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <span className="hidden md:inline text-sm font-bold uppercase tracking-widest">{buttonText}</span>
                </button>
            </form>
            {children}
        </div>
    );
};

export default SearchBar;
