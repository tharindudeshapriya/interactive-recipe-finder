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
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import useLookupData from './hooks/useLookupData';
import ScrollManager from './components/layout/ScrollManager';

function App() {
  useLookupData();

  return (
    <ErrorBoundary>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      <Router>
        <ScrollManager />
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
    </ErrorBoundary>
  )
}

export default App
