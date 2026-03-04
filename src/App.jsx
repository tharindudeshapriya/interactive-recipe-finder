import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'
import Ingredients from './pages/Ingredients'
import IngredientDetails from './pages/IngredientDetails'
import ScrollToTopButton from './components/ScrollToTopButton'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-secondary/10 text-text-base font-sans">
        <Navbar />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredient/:name" element={<IngredientDetails />} />
          </Routes>
        </main>

        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
