import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "mt-16 justify-center" // Default to center for bottom
}) => {
    // Hide completely if there's only 1 page or no data
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={`flex flex-wrap items-center gap-4 md:gap-8 animate-in fade-in duration-500 w-full col-span-full ${className}`}>

            {/* Page Navigation Controls */}
            {totalPages > 1 && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 md:p-3 rounded-full border border-neutral-light/20 text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous Page"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    {startPage > 1 && (
                        <>
                            <button onClick={() => onPageChange(1)} className="w-8 h-8 md:w-10 md:h-10 rounded-full text-[10px] md:text-xs font-medium text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base transition-colors">1</button>
                            {startPage > 2 && <span className="text-neutral-light px-1">...</span>}
                        </>
                    )}

                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => onPageChange(number)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-[10px] md:text-xs font-medium transition-all duration-300 ${currentPage === number ? 'bg-primary text-white shadow-md scale-110' : 'text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base'}`}
                        >
                            {number}
                        </button>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <span className="text-neutral-light px-1">...</span>}
                            <button onClick={() => onPageChange(totalPages)} className="w-8 h-8 md:w-10 md:h-10 rounded-full text-[10px] md:text-xs font-medium text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base transition-colors">{totalPages}</button>
                        </>
                    )}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 md:p-3 rounded-full border border-neutral-light/20 text-neutral-dark hover:bg-neutral-light/5 hover:text-text-base disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next Page"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
