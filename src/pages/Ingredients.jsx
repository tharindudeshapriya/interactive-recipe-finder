import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ITEMS_PER_PAGE } from '../constants';
import SearchBar from '../components/common/SearchBar';
import IngredientCard from '../components/ingredient/IngredientCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import PageHero from '../components/common/PageHero';

const Ingredients = () => {
    const { allIngredients } = useSelector((state) => state.search);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (allIngredients) {
            const filtered = allIngredients.filter(ing =>
                ing.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredIngredients(filtered);
            setCurrentPage(1);
        }
    }, [searchTerm, allIngredients]);

    const totalPages = Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE);
    const currentIngredients = filteredIngredients.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: window.innerWidth < 768 ? 400 : 500, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen">
            <PageHero
                badge="The Library"
                title="Know Your"
                titleItalic="Ingredients"
                subtitle="Explore our comprehensive collection of culinary essentials."
            />

            {/* Controls */}
            <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col items-center">
                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mb-8">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search ingredients (e.g., Basil, Flour, Cream...)"
                        buttonText="Refine List"
                    />
                </div>

                <div className="w-full flex justify-end animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {filteredIngredients.length > ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="!mt-0 !w-auto justify-end"
                        />
                    )}
                </div>
            </div>

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
