import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../store/searchSlice'

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { items } = useSelector(state => state.favorites);
    const favoritesCount = items.length;

    const handleGoHome = () => {
        dispatch(clearSearch());
        setIsOpen(false);
    };

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className="bg-bg-surface border-b border-text-base/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center relative z-50 bg-bg-surface">
                <Link to="/" onClick={handleGoHome} className="text-xl md:text-2xl font-serif text-text-base tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap relative z-50">
                    The Culinary <span className="hidden xs:inline italic font-light">Archive</span>
                    <span className="xs:hidden italic font-light"> Arch.</span>
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
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-text-base p-2 focus:outline-none relative z-50"
                    aria-label="Toggle Navigation"
                >
                    <div className="w-6 h-5 flex flex-col justify-between relative">
                        <span className={`w-full h-[2px] bg-current transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-1 -translate-y-[1px]' : ''}`} />
                        <span className={`w-full h-[2px] bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-full h-[2px] bg-current transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-1 translate-y-[1px]' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`md:hidden fixed inset-0 z-40 bg-bg-surface transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center space-y-12 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <Link to="/" onClick={handleGoHome} className={`text-4xl font-serif tracking-tight ${location.pathname === '/' ? 'text-primary' : 'text-text-base'}`}>HOME</Link>
                <Link to="/categories" onClick={() => setIsOpen(false)} className={`text-4xl font-serif tracking-tight ${location.pathname.startsWith('/categories') ? 'text-primary' : 'text-text-base'}`}>CATEGORIES</Link>
                <Link to="/ingredients" onClick={() => setIsOpen(false)} className={`text-4xl font-serif tracking-tight ${location.pathname.startsWith('/ingredient') ? 'text-primary' : 'text-text-base'}`}>INGREDIENTS</Link>
                <Link to="/favorites" onClick={() => setIsOpen(false)} className={`text-4xl font-serif tracking-tight flex items-center gap-4 ${location.pathname === '/favorites' ? 'text-primary' : 'text-text-base'}`}>
                    FAVORITES
                    {favoritesCount > 0 && (
                        <span className="bg-primary text-white text-lg w-8 h-8 flex items-center justify-center rounded-full font-sans">
                            {favoritesCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
