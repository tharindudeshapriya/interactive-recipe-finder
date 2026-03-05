import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../../store/searchSlice'

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { items } = useSelector(state => state.favorites);
    const favoritesCount = items.length;

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            if ('theme' in localStorage) return localStorage.getItem('theme') === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!('theme' in localStorage)) {
                setIsDarkMode(e.matches);
            }
        };

        // Add listener
        if (mediaQuery?.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange); // Fallback for older browsers
        }

        return () => {
            if (mediaQuery?.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const nextMode = !prev;
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

            // If user's toggle matches the system default, remove from localStorage
            // so that we can resume tracking system default automatically!
            if (nextMode === systemTheme) {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', nextMode ? 'dark' : 'light');
            }

            return nextMode;
        });
    };

    const handleGoHome = () => {
        dispatch(clearSearch());
        setIsOpen(false);
    };

    // Prevent scrolling when menu is open without causing layout shift
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    return (
        <nav className="bg-bg-surface border-b border-text-base/10 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center relative z-50 bg-bg-surface">
                <Link to="/" onClick={handleGoHome} className="flex items-center text-xl md:text-2xl font-serif text-text-base tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap relative z-50">
                    <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                        <line x1="6" x2="18" y1="17" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                    </svg>
                    The Culinary <span className="hidden xs:inline italic font-light ml-1">Archive</span>
                    <span className="xs:hidden italic font-light ml-1">Arch.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-4 md:gap-8 font-sans items-center">
                    <Link to="/" onClick={handleGoHome} className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname === '/' ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>HOME</Link>
                    <Link to="/categories" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname.startsWith('/categories') ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>CATEGORIES</Link>
                    <Link to="/ingredients" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname.startsWith('/ingredient') ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>INGREDIENTS</Link>
                    <Link to="/favorites" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname === '/favorites' ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>
                        <span className="flex items-center gap-2">
                            FAVORITES
                            {favoritesCount > 0 && (
                                <span className="bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full leading-none">
                                    {favoritesCount}
                                </span>
                            )}
                        </span>
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="text-text-base hover:text-primary transition-colors focus:outline-none ml-2"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Icons & Hamburger */}
                <div className="md:hidden flex items-center gap-1 relative z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-text-base focus:outline-none mr-1"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    <Link
                        to="/favorites"
                        onClick={() => setIsOpen(false)}
                        className={`p-2 relative ${location.pathname === '/favorites' ? 'text-primary' : 'text-text-base'}`}
                        aria-label="Favorites"
                    >
                        <svg className="w-6 h-6" fill={items.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {favoritesCount > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-bg-surface font-sans font-bold">
                                {favoritesCount}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text-base p-2 focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between relative">
                            <span className={`w-full h-[2px] bg-current transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-1 -translate-y-[1px]' : ''}`} />
                            <span className={`w-full h-[2px] bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-full h-[2px] bg-current transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-1 translate-y-[1px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Backdrop */}
            <div
                className={`md:hidden fixed inset-0 z-[105] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Navigation Panel */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-1/2 z-[110] bg-bg-surface border-l border-text-base/10 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between px-4 py-4 border-b border-text-base/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-dark">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-text-base focus:outline-none hover:text-primary transition-colors"
                        aria-label="Close Menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col justify-center flex-grow gap-8 px-6">
                    <Link to="/" onClick={handleGoHome} className={`text-2xl font-serif tracking-tight transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-text-base'}`}>Home</Link>
                    <Link to="/categories" onClick={() => setIsOpen(false)} className={`text-2xl font-serif tracking-tight transition-colors hover:text-primary ${location.pathname.startsWith('/categories') ? 'text-primary' : 'text-text-base'}`}>Categories</Link>
                    <Link to="/ingredients" onClick={() => setIsOpen(false)} className={`text-2xl font-serif tracking-tight transition-colors hover:text-primary ${location.pathname.startsWith('/ingredient') ? 'text-primary' : 'text-text-base'}`}>Ingredients</Link>
                    <Link to="/favorites" onClick={() => setIsOpen(false)} className={`text-2xl font-serif tracking-tight flex items-center gap-3 transition-colors hover:text-primary ${location.pathname === '/favorites' ? 'text-primary' : 'text-text-base'}`}>
                        Favorites
                        {favoritesCount > 0 && (
                            <span className="bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-sans font-bold">
                                {favoritesCount}
                            </span>
                        )}
                    </Link>
                </nav>

                <div className="px-6 py-6 border-t border-text-base/10">
                    <p className="text-[10px] font-light uppercase tracking-widest text-neutral-light italic">The Culinary Archive</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
