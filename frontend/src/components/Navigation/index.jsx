import "./index.css"
import { NavLink } from "react-router"
import { useState } from "react"

const AuthModal = ({ onClose }) => {
    const [tab, setTab] = useState("login")
    const [form, setForm] = useState({ name: "", username: "", email: "", identifier: "", password: "" })
    const [status, setStatus] = useState("")
    const [user, setUser] = useState(null)

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
            setUser(data.user)
            setStatus("ok")
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
            setUser(data.user)
            setStatus("ok")
        } catch {
            setStatus("Something went wrong.")
        }
    }

    return (
        <div className="auth-modal" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="auth-dialog">
                <button className="rental-close" type="button" onClick={onClose} aria-label="Close">&times;</button>

                {status === "ok" ? (
                    <div style={{ padding: "12px 0" }}>
                        <p className="eyebrow">Welcome</p>
                        <h2 style={{ marginTop: 12 }}>Hello, {user?.name}!</h2>
                        <p style={{ color: "var(--muted)", marginTop: 12 }}>You are logged in as <strong>{user?.username}</strong>.</p>
                        <button className="primary-btn" type="button" onClick={onClose} style={{ marginTop: 24 }}>Continue</button>
                    </div>
                ) : (
                    <>
                        <div className="auth-tabs">
                            <button className={tab === "login" ? "is-active" : ""} type="button" onClick={() => { setTab("login"); setStatus("") }}>Login</button>
                            <button className={tab === "register" ? "is-active" : ""} type="button" onClick={() => { setTab("register"); setStatus("") }}>Register</button>
                        </div>

                        {tab === "login" ? (
                            <form className="auth-form is-active" onSubmit={handleLogin}>
                                <h2>Sign in</h2>
                                <label><span>Username or email</span><input type="text" required value={form.identifier} onChange={set("identifier")} /></label>
                                <label><span>Password</span><input type="password" required value={form.password} onChange={set("password")} /></label>
                                <button className="primary-btn" type="submit" disabled={status === "loading"}>
                                    {status === "loading" ? "Signing in…" : "Sign in"}
                                </button>
                                {status && status !== "loading" && <p className="auth-status" style={{ color: "var(--red)" }}>{status}</p>}
                            </form>
                        ) : (
                            <form className="auth-form is-active" onSubmit={handleRegister}>
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
                    </>
                )}
            </div>
        </div>
    )
}

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)

    const navClass = ({ isActive }) => isActive ? "is-active" : ""

    return (
        <>
            <nav className="site-nav">
                <NavLink className="brand" to="/" aria-label="Rent a Car home">
                    <span className="brand-logo">Rent a Car</span>
                </NavLink>

                <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="navLinks">
                    <NavLink className={navClass} to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink className={navClass} to="/fleet" onClick={() => setMenuOpen(false)}>Fleet</NavLink>
                    <NavLink className={navClass} to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
                    <NavLink className={navClass} to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    <NavLink className={navClass} to="/contact" onClick={() => setMenuOpen(false)}>Contacts</NavLink>
                    <NavLink className={navClass} to="/faq" onClick={() => setMenuOpen(false)}>FAQ</NavLink>
                </div>

                <div className="nav-actions">
                    <button className="account-btn" type="button" onClick={() => setAuthOpen(true)}>Login / Register</button>
                    <NavLink className="checkin-btn" to="/#booking">Online Check-in</NavLink>
                    <button className="language-btn" type="button" aria-label="Change language">
                        <span>EN</span>
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
