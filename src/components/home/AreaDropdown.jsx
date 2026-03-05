import React, { useState, useRef, useEffect } from 'react';

/**
 * Cuisine / area filter dropdown.
 * Manages its own open/close state and outside-click detection.
 *
 * Props:
 *   allAreas     - array of area objects { strArea }
 *   selectedArea - currently selected area string (or empty string for "All")
 *   onAreaChange - callback(area: string)
 */
const AreaDropdown = ({ allAreas, selectedArea, onAreaChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const areaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (areaRef.current && !areaRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayLabel = selectedArea && allAreas.some(a => a.strArea === selectedArea)
        ? selectedArea
        : 'All Cuisines';

    return (
        <div className="w-full md:w-56 relative" ref={areaRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-bg-surface border border-neutral-light/50 rounded-full py-3 md:py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm flex justify-between items-center group transition-all duration-300"
            >
                <span className="truncate">{displayLabel}</span>
                <svg
                    className={`w-4 h-4 text-neutral-dark group-hover:text-text-base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown list */}
            <div className={`absolute left-0 right-0 mt-2 bg-bg-surface border border-neutral-light/30 rounded-2xl shadow-xl z-[60] overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                <div className="py-2 overflow-y-auto max-h-[240px] scrollbar-thin scrollbar-thumb-neutral-light/30">
                    <button
                        onClick={() => { onAreaChange(''); setIsOpen(false); }}
                        className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base transition-colors"
                    >
                        All Cuisines
                    </button>
                    {allAreas.map((area) => (
                        <button
                            key={area.strArea}
                            onClick={() => { onAreaChange(area.strArea); setIsOpen(false); }}
                            className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-text-base hover:bg-neutral-light/5 hover:text-primary transition-colors border-t border-neutral-light/5 first:border-t-0"
                        >
                            {area.strArea}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AreaDropdown;
