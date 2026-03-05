import React, { useState, useRef, useEffect } from 'react';

/**
 * Reusable filter dropdown component.
 * Styled to match the existing AreaDropdown pattern.
 *
 * Props:
 *   options   - array of string values to display
 *   selected  - currently selected value (or '' for "all")
 *   onChange  - callback(value: string)
 *   label     - default label shown when nothing is selected (e.g. "All Categories")
 *   disabled  - grays out the dropdown when no options are available
 *   id        - unique id for accessibility
 */
const FilterDropdown = ({ options, selected, onChange, label = 'All', disabled = false, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayLabel = selected || label;

    return (
        <div className="w-full md:w-48 relative" ref={dropdownRef} id={id}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full bg-bg-surface border border-neutral-light/50 rounded-full py-2.5 md:py-3 px-5 text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer shadow-sm flex justify-between items-center group transition-all duration-300
                    ${disabled
                        ? 'opacity-40 cursor-not-allowed text-neutral-dark'
                        : 'text-text-base focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }
                    ${selected ? 'border-primary/50 bg-primary/5' : ''}
                `}
            >
                <span className="truncate">{displayLabel}</span>
                <svg
                    className={`w-3.5 h-3.5 ml-2 shrink-0 text-neutral-dark group-hover:text-text-base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                    {/* "All" reset option */}
                    <button
                        onClick={() => { onChange(''); setIsOpen(false); }}
                        className={`w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors
                            ${!selected
                                ? 'text-primary bg-primary/5'
                                : 'text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base'
                            }`}
                    >
                        {label}
                    </button>

                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => { onChange(option); setIsOpen(false); }}
                            className={`w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-t border-neutral-light/5
                                ${selected === option
                                    ? 'text-primary bg-primary/5'
                                    : 'text-text-base hover:bg-neutral-light/5 hover:text-primary'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;
