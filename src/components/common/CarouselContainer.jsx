import React, { useRef, useState, useEffect } from 'react';

const CarouselContainer = ({
    children,
    title,
    description,
    onRefresh,
    refreshText = 'Refresh',
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
            const amount = direction === 'left' ? -scrollRef.current.clientWidth * 0.8 : scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
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
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-dark hover:text-primary transition-colors group/refresh"
                        >
                            <svg className="w-4 h-4 group-hover/refresh:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            {refreshText}
                        </button>
                    )}
                </div>
            </div>

            <div className="relative group/carousel">
                {showArrows && (
                    <>
                        <div className="absolute -left-6 top-0 bottom-0 w-16 md:w-20 z-10 flex items-center justify-start pl-2 md:pl-3 bg-gradient-to-r from-bg-base/70 to-transparent pointer-events-none">
                            <button
                                onClick={() => scroll('left')}
                                aria-label="Scroll Left"
                                className={`pointer-events-auto flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-surface/90 border border-neutral-light/20 shadow-lg text-text-base backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover/carousel:opacity-100 ${showLeftArrow ? 'opacity-100 md:opacity-0 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                        </div>
                        <div className="absolute -right-6 top-0 bottom-0 w-16 md:w-20 z-10 flex items-center justify-end pr-2 md:pr-3 bg-gradient-to-l from-bg-base/70 to-transparent pointer-events-none">
                            <button
                                onClick={() => scroll('right')}
                                aria-label="Scroll Right"
                                className={`pointer-events-auto flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-surface/90 border border-neutral-light/20 shadow-lg text-text-base backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover/carousel:opacity-100 ${showRightArrow ? 'opacity-100 md:opacity-0 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
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
