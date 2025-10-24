import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Reviews from './Reviews.jsx'
import ReviewDetail from './ReviewDetail.jsx'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<ReviewDetail />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
