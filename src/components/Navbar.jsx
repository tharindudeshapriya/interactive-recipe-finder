import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../store/searchSlice'

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleGoHome = () => {
        dispatch(clearSearch());
    };

    return (
        <nav className="bg-bg-surface border-b border-text-base/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
                <Link to="/" onClick={handleGoHome} className="text-xl md:text-2xl font-serif text-text-base tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap">
                    The Culinary <span className="hidden xs:inline italic font-light">Archive</span>
                    <span className="xs:hidden italic font-light"> Arch.</span>
                </Link>
                <div className="flex gap-4 md:gap-8 font-sans items-center">
                    <Link to="/" onClick={handleGoHome} className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname === '/' ? 'text-primary after:w-full' : 'text-text-base hover:text-primary after:w-0 hover:after:w-full'}`}>HOME</Link>
                    <Link to="/categories" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname.startsWith('/categories') ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>CATEGORIES</Link>
                    <Link to="/ingredients" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname.startsWith('/ingredient') ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>INGREDIENTS</Link>
                    <Link to="/favorites" className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${location.pathname === '/favorites' ? 'text-primary after:w-full' : 'text-neutral-dark hover:text-primary after:w-0 hover:after:w-full'}`}>FAVORITES</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
