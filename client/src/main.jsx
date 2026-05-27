import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/home'
import Fleet from './pages/fleet'
import About from './pages/about'
import Contact from './pages/contact'
import Faq from './pages/faq'
import Blog from './pages/blog'
import Admin from './pages/admin'
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
