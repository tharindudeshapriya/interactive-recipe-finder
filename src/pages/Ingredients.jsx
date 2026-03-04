import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import IngredientCard from '../components/IngredientCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const Ingredients = () => {
    const { allIngredients } = useSelector((state) => state.search);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        if (allIngredients) {
            const filtered = allIngredients.filter(ing =>
                ing.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredIngredients(filtered);
            setCurrentPage(1); // Reset page when search term changes
        }
    }, [searchTerm, allIngredients]);

    const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
    const currentIngredients = filteredIngredients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pt-12 md:pt-20">
            {/* Header */}
            <header className="max-w-4xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6 block animate-in fade-in slide-in-from-bottom-2 duration-700">The Library</span>
                <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Know Your <br /> <span className="italic font-light">Ingredients</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-dark font-light italic mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Explore our comprehensive collection of culinary essentials.
                </p>

                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 mb-8">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search ingredients (e.g., Basil, Flour, Cream...)"
                        buttonText="Refine List"
                    />
                </div>

                <div className="flex justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {filteredIngredients.length > itemsPerPage && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="!mt-0 !w-auto justify-end"
                        />
                    )}
                </div>
            </header>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                {allIngredients.length === 0 ? (
                    <LoadingSpinner />
                ) : filteredIngredients.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-neutral-dark font-light italic">No ingredients found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
                            {currentIngredients.map((ing) => (
                                <IngredientCard key={ing.idIngredient} ingredient={ing} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </section>
        </div>
    );
};

export default Ingredients;
