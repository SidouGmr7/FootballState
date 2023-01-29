import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import AddPlayer from './Pages/AddPlayer'
import Home from './Pages/Home'
import Equipe from './Pages/Equipe';
import National from './Pages/National';

function App() {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/national' element={<National />} />
          <Route path='/team' element={<Equipe />} />
          <Route path='/add' element={<AddPlayer />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
