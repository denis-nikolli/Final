import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import { useEffect } from "react"
import { AuthProvider } from './context/AuthContext'
import { LangProvider } from './context/LangContext'
import Home from './pages/home'
import Fleet from './pages/fleet'
import About from './pages/about'
import Contact from './pages/contact'
import Faq from './pages/faq'
import Blog from './pages/blog'
import Admin from './pages/admin'
import NotFound from './pages/notfound'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const ScrollBehavior = () => {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const el = document.querySelector(hash)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 80)
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
        }
    }, [pathname, hash])
    return null
}

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <LangProvider>
            <BrowserRouter>
                <ScrollBehavior />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </LangProvider>
    </AuthProvider>
)
