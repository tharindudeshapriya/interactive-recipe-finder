import React, { useRef, useState, useEffect } from 'react';

const CarouselContainer = ({
    children,
    title,
    description,
    onRefresh,
    refreshText = "Refresh",
    autoScroll = true,
    interval = 5000,
    showArrows = true
}) => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!autoScroll || isHovered || !children || (Array.isArray(children) && children.length <= 1)) return;

        const timer = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const maxScroll = scrollWidth - clientWidth;

                if (maxScroll <= 0) return;

                // Scroll back to start if near the end (40px buffer)
                if (scrollLeft >= maxScroll - 40) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    const scrollStep = clientWidth > 600 ? clientWidth * 0.4 : clientWidth * 0.7;
                    scrollRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
                }
            }
        }, interval);

        return () => clearInterval(timer);
    }, [autoScroll, isHovered, interval, children]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth * 0.8 : scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section
            className="mb-24 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-end mb-8 px-2">
                <div>
                    {title && <h2 className="text-3xl md:text-4xl font-serif text-text-base mb-2">{title}</h2>}
                    {description && <p className="text-neutral-dark font-light italic">{description}</p>}
                </div>

                <div className="flex items-center gap-4">
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:text-primary transition-colors group/refresh mr-4"
                        >
                            <svg className="w-4 h-4 group-hover/refresh:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            {refreshText}
                        </button>
                    )}

                    {showArrows && (
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!showLeftArrow}
                                className={`p-3 rounded-full border transition-all duration-300 ${showLeftArrow ? 'border-text-base text-text-base hover:bg-text-base hover:text-bg-base' : 'border-neutral-light/20 text-neutral-light/30 cursor-not-allowed'}`}
                                aria-label="Scroll Left"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!showRightArrow}
                                className={`p-3 rounded-full border transition-all duration-300 ${showRightArrow ? 'border-text-base text-text-base hover:bg-text-base hover:text-bg-base' : 'border-neutral-light/20 text-neutral-light/30 cursor-not-allowed'}`}
                                aria-label="Scroll Right"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative group/carousel">
                {showArrows && (
                    <>
                        <button
                            onClick={() => scroll('left')}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-bg-surface border border-neutral-light/20 rounded-full shadow-xl text-text-base opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 md:flex hidden ${!showLeftArrow && 'pointer-events-none !opacity-0'}`}
                            aria-label="Scroll Left"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-bg-surface border border-neutral-light/20 rounded-full shadow-xl text-text-base opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 md:flex hidden ${!showRightArrow && 'pointer-events-none !opacity-0'}`}
                            aria-label="Scroll Right"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6"
                >
                    {children}
                </div>
            </div>
        </section>
    );
};

export default CarouselContainer;
