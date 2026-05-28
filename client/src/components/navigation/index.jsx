import "./index.css"
import { NavLink } from "react-router"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthContext"
import { useLang } from "../../context/LangContext"

const AuthModal = ({ onClose }) => {
    const { login } = useAuth()
    const { t } = useLang()
    const [tab, setTab] = useState("login")
    const [form, setForm] = useState({ name: "", username: "", email: "", identifier: "", password: "" })
    const [status, setStatus] = useState("")

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

    const handleLogin = async (e) => {
        e.preventDefault()
        setStatus("loading")
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: form.identifier, password: form.password }),
            })
            const data = await res.json()
            if (!res.ok) { setStatus(data.message || "Login failed"); return }
            login(data.user)
            onClose()
        } catch {
            setStatus("Something went wrong.")
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setStatus("loading")
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, username: form.username, email: form.email, password: form.password }),
            })
            const data = await res.json()
            if (!res.ok) { setStatus(data.message || "Registration failed"); return }
            login(data.user)
            onClose()
        } catch {
            setStatus("Something went wrong.")
        }
    }

    return (
        <div className="auth-modal" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="auth-dialog">
                <button className="rental-close" type="button" onClick={onClose} aria-label="Close">&times;</button>

                <div className="auth-tabs">
                    <button className={tab === "login" ? "is-active" : ""} type="button" onClick={() => { setTab("login"); setStatus("") }}>Login</button>
                    <button className={tab === "register" ? "is-active" : ""} type="button" onClick={() => { setTab("register"); setStatus("") }}>Register</button>
                </div>

                {tab === "login" ? (
                    <form className="auth-form" onSubmit={handleLogin}>
                        <h2>Sign in</h2>
                        <label><span>Username or email</span><input type="text" required value={form.identifier} onChange={set("identifier")} /></label>
                        <label><span>Password</span><input type="password" required value={form.password} onChange={set("password")} /></label>
                        <button className="primary-btn" type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "Signing in…" : "Sign in"}
                        </button>
                        {status && status !== "loading" && <p className="auth-status" style={{ color: "var(--red)" }}>{status}</p>}
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleRegister}>
                        <h2>Create account</h2>
                        <label><span>Full name</span><input type="text" required value={form.name} onChange={set("name")} /></label>
                        <label><span>Username</span><input type="text" required value={form.username} onChange={set("username")} /></label>
                        <label><span>Email</span><input type="email" required value={form.email} onChange={set("email")} /></label>
                        <label><span>Password</span><input type="password" required value={form.password} onChange={set("password")} /></label>
                        <button className="primary-btn" type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "Creating account…" : "Create account"}
                        </button>
                        {status && status !== "loading" && <p className="auth-status" style={{ color: "var(--red)" }}>{status}</p>}
                    </form>
                )}
            </div>
        </div>
    )
}

const Navigation = () => {
    const { user, logout } = useAuth()
    const { lang, toggleLang, t } = useLang()
    const [menuOpen, setMenuOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)

    const navRef = useRef(null)
    const navClass = ({ isActive }) => isActive ? "is-active" : ""

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [menuOpen])

    return (
        <>
            <nav className="site-nav" ref={navRef}>
                <NavLink className="brand" to="/" aria-label="Car Rental home">
                    <span className="brand-logo">Car Rental</span>
                </NavLink>

                <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="navLinks">
                    <NavLink className={navClass} to="/" end onClick={() => setMenuOpen(false)}>{t.nav.home}</NavLink>
                    <NavLink className={navClass} to="/fleet" onClick={() => setMenuOpen(false)}>{t.nav.fleet}</NavLink>
                    <NavLink className={navClass} to="/about" onClick={() => setMenuOpen(false)}>{t.nav.about}</NavLink>
                    <NavLink className={navClass} to="/blog" onClick={() => setMenuOpen(false)}>{t.nav.blog}</NavLink>
                    <NavLink className={navClass} to="/contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</NavLink>
                    <NavLink className={navClass} to="/faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</NavLink>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">{t.nav.hello}, {user.name}</span>
                            <button className="logout-btn" type="button" onClick={logout}>{t.nav.logout}</button>
                        </div>
                    ) : (
                        <button className="account-btn" type="button" onClick={() => setAuthOpen(true)}>
                            {t.nav.loginRegister}
                        </button>
                    )}
                    {user?.role === "admin" && (
                        <NavLink className="checkin-btn" to="/admin">Dashboard</NavLink>
                    )}
                    <button className="language-btn" type="button" onClick={toggleLang} aria-label="Change language">
                        <span>{lang === 'en' ? '🇬🇧' : '🇦🇱'}</span>
                        <span className="chevron">&#8595;</span>
                    </button>
                    <button
                        className="nav-toggle"
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(o => !o)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </>
    )
}

export default Navigation
