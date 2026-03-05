import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'
import Ingredients from './pages/Ingredients'
import IngredientDetails from './pages/IngredientDetails'
import Categories from './pages/Categories'
import CategoryDetails from './pages/CategoryDetails'
import ScrollToTopButton from './components/layout/ScrollToTopButton'
import useLookupData from './hooks/useLookupData'

function App() {
  useLookupData();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg-base text-text-base font-sans transition-colors duration-300">
        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredient/:name" element={<IngredientDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<CategoryDetails />} />
          </Routes>
        </main>

        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
