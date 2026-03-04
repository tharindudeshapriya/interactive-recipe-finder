import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-bg-surface border-b border-text-base/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <Link to="/" className="text-2xl font-serif text-text-base tracking-tight hover:opacity-80 transition-opacity">
                    The Culinary <span className="italic font-light">Archive</span>
                </Link>
                <div className="space-x-8 font-sans">
                    <Link to="/" className="text-xs font-bold uppercase tracking-widest text-text-base hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">HOME</Link>
                    <Link to="/favorites" className="text-xs font-bold uppercase tracking-widest text-neutral-dark hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300">COLLECTION</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
