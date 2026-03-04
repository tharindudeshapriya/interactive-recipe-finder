import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'

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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
