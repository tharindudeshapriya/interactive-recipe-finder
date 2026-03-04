import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-primary text-text-base shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                    RecipeFinder
                </Link>
                <div className="space-x-6 font-medium">
                    <Link to="/" className="hover:text-text-inverse transition-colors">Home</Link>
                    <Link to="/favorites" className="hover:text-text-inverse transition-colors">Favorites</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
