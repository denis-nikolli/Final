import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import About from './pages/About'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Blog from './pages/Blog'
import Admin from './pages/Admin'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
)
