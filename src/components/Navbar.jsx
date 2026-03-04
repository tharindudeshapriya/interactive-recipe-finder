import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-bg-surface border-b border-text-base/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
                <Link to="/" className="text-xl md:text-2xl font-serif text-text-base tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap">
                    The Culinary <span className="hidden xs:inline italic font-light">Archive</span>
                    <span className="xs:hidden italic font-light"> Arch.</span>
                </Link>
                <div className="flex gap-4 md:gap-8 font-sans items-center">
                    <Link to="/" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-base hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">HOME</Link>
                    <Link to="/ingredients" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">INGREDIENTS</Link>
                    <Link to="/favorites" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300 uppercase">Collection</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
