import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Offer from './pages/Offer'
import Admin from './pages/Admin'

axios.defaults.withCredentials = true
function App() {
  const history = useNavigate()

  return (
    <div className="text-white bg-[#2a3952] min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login history={history} />} />
        <Route path="/register" element={<Register history={history} />} />
        <Route path="/gallery/*" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
