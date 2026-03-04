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
                    className="flex-grow py-3 md:py-4 px-5 md:px-8 bg-transparent focus:outline-none text-base md:text-lg text-text-base border-none font-light placeholder:text-neutral-light placeholder:italic"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                />
                <button
                    type="submit"
                    className="py-3 md:py-4 px-6 md:px-10 text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 transition-colors border-l border-neutral-light/20 bg-neutral-light/5"
                >
                    {buttonText}
                </button>
            </form>
            {children}
        </div>
    );
};

export default SearchBar;
