import "./index.css"
import { useState, useEffect, useCallback } from "react"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const STATUS_OPTIONS = ["new", "confirmed", "cancelled", "completed"]

const StatCard = ({ label, value, color }) => (
    <div className="stat-card">
        <span className="stat-label">{label}</span>
        <strong className="stat-value" style={{ color }}>{value}</strong>
    </div>
)

const StatusBadge = ({ status }) => (
    <span className={`status-badge status-${status}`}>{status}</span>
)

const Admin = () => {
    const [user, setUser] = useState(null)
    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" })
    const [loginError, setLoginError] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)

    const [tab, setTab] = useState("requests")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState({})

    const fetchDashboard = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/admin/dashboard")
            const json = await res.json()
            setData(json)
        } catch {
            setData(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user?.role === "admin") fetchDashboard()
    }, [user, fetchDashboard])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginLoading(true)
        setLoginError("")
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: loginForm.identifier, password: loginForm.password }),
            })
            const json = await res.json()
            if (!res.ok) { setLoginError(json.message || "Login failed"); return }
            if (json.user.role !== "admin") { setLoginError("This account does not have admin access."); return }
            setUser(json.user)
        } catch {
            setLoginError("Something went wrong.")
        } finally {
            setLoginLoading(false)
        }
    }

    const updateStatus = async (type, id, status) => {
        const key = `${type}-${id}`
        setSaveStatus(s => ({ ...s, [key]: "saving" }))
        try {
            await fetch(`/api/admin/${type}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            setSaveStatus(s => ({ ...s, [key]: "saved" }))
            await fetchDashboard()
            setTimeout(() => setSaveStatus(s => ({ ...s, [key]: "" })), 2000)
        } catch {
            setSaveStatus(s => ({ ...s, [key]: "error" }))
        }
    }

    const updateCar = async (id, field, value) => {
        const key = `car-${id}`
        setSaveStatus(s => ({ ...s, [key]: "saving" }))
        try {
            await fetch(`/api/admin/cars/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            })
            setSaveStatus(s => ({ ...s, [key]: "saved" }))
            await fetchDashboard()
            setTimeout(() => setSaveStatus(s => ({ ...s, [key]: "" })), 2000)
        } catch {
            setSaveStatus(s => ({ ...s, [key]: "error" }))
        }
    }

    if (!user) {
        return (
            <>
                <Navigation />
                <div className="admin-login-page">
                    <div className="admin-login-card">
                        <p className="eyebrow">Admin</p>
                        <h1>Dashboard access</h1>
                        <p className="admin-login-sub">Sign in with an admin account to continue.</p>
                        <form className="admin-login-form" onSubmit={handleLogin}>
                            <label>
                                <span>Username or email</span>
                                <input
                                    type="text"
                                    required
                                    value={loginForm.identifier}
                                    onChange={e => setLoginForm(f => ({ ...f, identifier: e.target.value }))}
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    type="password"
                                    required
                                    value={loginForm.password}
                                    onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                                />
                            </label>
                            {loginError && <p className="admin-login-error">{loginError}</p>}
                            <button className="primary-btn" type="submit" disabled={loginLoading}>
                                {loginLoading ? "Signing in…" : "Sign in"}
                            </button>
                        </form>
                        <p className="admin-login-hint">Default: <code>admin</code> / <code>admin123</code></p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navigation />

            <header className="page-hero dashboard-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">Admin</p>
                    <h1>Dashboard</h1>
                </div>
                <button className="admin-logout-btn" onClick={() => setUser(null)}>Sign out</button>
            </header>

            <main className="admin-page">
                {loading && <p className="admin-loading">Loading data…</p>}

                {data && (
                    <>
                        <div className="stats-grid">
                            <StatCard label="Rental Requests" value={data.rentalRequests.count} color="var(--red)" />
                            <StatCard label="Reservations" value={data.reservations.count} color="var(--blue)" />
                            <StatCard label="Cars in Fleet" value={data.cars.count} color="var(--green)" />
                            <StatCard label="Registered Users" value={data.users.count} color="var(--ink)" />
                        </div>

                        <div className="admin-tabs">
                            {[
                                { key: "requests", label: `Rental Requests (${data.rentalRequests.count})` },
                                { key: "reservations", label: `Reservations (${data.reservations.count})` },
                                { key: "cars", label: `Cars (${data.cars.count})` },
                                { key: "users", label: `Users (${data.users.count})` },
                            ].map(t => (
                                <button
                                    key={t.key}
                                    className={`admin-tab${tab === t.key ? " is-active" : ""}`}
                                    onClick={() => setTab(t.key)}
                                    type="button"
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {tab === "requests" && (
                            <div className="admin-panel">
                                <h2>Rental Requests</h2>
                                {data.rentalRequests.items.length === 0 ? (
                                    <p className="admin-empty">No rental requests yet. They appear here when someone clicks Rent on the Fleet page.</p>
                                ) : (
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Car</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Location</th>
                                                    <th>Pickup</th>
                                                    <th>Return</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.rentalRequests.items.map(r => {
                                                    const key = `rental-requests-${r.id}`
                                                    return (
                                                        <tr key={r.id}>
                                                            <td>{r.id}</td>
                                                            <td><strong>{r.carName}</strong></td>
                                                            <td>{r.name}</td>
                                                            <td>{r.email}</td>
                                                            <td>{r.phone || "—"}</td>
                                                            <td>{r.location}</td>
                                                            <td>{r.pickupDate || "—"}</td>
                                                            <td>{r.returnDate || "—"}</td>
                                                            <td>
                                                                <div className="status-cell">
                                                                    <StatusBadge status={r.status} />
                                                                    <select
                                                                        value={r.status}
                                                                        onChange={e => updateStatus("rental-requests", r.id, e.target.value)}
                                                                        disabled={saveStatus[key] === "saving"}
                                                                    >
                                                                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                                                                    </select>
                                                                    {saveStatus[key] === "saved" && <span className="save-ok">✓</span>}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === "reservations" && (
                            <div className="admin-panel">
                                <h2>Reservations</h2>
                                {data.reservations.items.length === 0 ? (
                                    <p className="admin-empty">No reservations yet.</p>
                                ) : (
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Car</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Location</th>
                                                    <th>Pickup</th>
                                                    <th>Return</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.reservations.items.map(r => {
                                                    const key = `reservations-${r.id}`
                                                    return (
                                                        <tr key={r.id}>
                                                            <td>{r.id}</td>
                                                            <td><strong>{r.carName || "—"}</strong></td>
                                                            <td>{r.name || "—"}</td>
                                                            <td>{r.email || "—"}</td>
                                                            <td>{r.location || "—"}</td>
                                                            <td>{r.pickupDate || "—"}</td>
                                                            <td>{r.returnDate || "—"}</td>
                                                            <td>
                                                                <div className="status-cell">
                                                                    <StatusBadge status={r.status} />
                                                                    <select
                                                                        value={r.status}
                                                                        onChange={e => updateStatus("reservations", r.id, e.target.value)}
                                                                        disabled={saveStatus[key] === "saving"}
                                                                    >
                                                                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                                                                    </select>
                                                                    {saveStatus[key] === "saved" && <span className="save-ok">✓</span>}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === "cars" && (
                            <div className="admin-panel">
                                <h2>Fleet Management</h2>
                                <div className="admin-table-wrap">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Transmission</th>
                                                <th>Seats</th>
                                                <th>Bags</th>
                                                <th>Price/day</th>
                                                <th>Available</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.cars.items.map(car => {
                                                const key = `car-${car.id}`
                                                return (
                                                    <tr key={car.id}>
                                                        <td>{car.id}</td>
                                                        <td><strong>{car.name}</strong></td>
                                                        <td>{car.type}</td>
                                                        <td>{car.transmission}</td>
                                                        <td>{car.seats}</td>
                                                        <td>{car.bags}</td>
                                                        <td>
                                                            <input
                                                                className="admin-input"
                                                                type="number"
                                                                defaultValue={car.price}
                                                                min="1"
                                                                onBlur={e => updateCar(car.id, "price", Number(e.target.value))}
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                className="admin-select"
                                                                defaultValue={car.available ? "yes" : "no"}
                                                                onChange={e => updateCar(car.id, "available", e.target.value === "yes")}
                                                            >
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            {saveStatus[key] === "saving" && <span className="save-pending">Saving…</span>}
                                                            {saveStatus[key] === "saved" && <span className="save-ok">✓ Saved</span>}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {tab === "users" && (
                            <div className="admin-panel">
                                <h2>Users</h2>
                                <div className="admin-table-wrap">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.users.items.map(u => (
                                                <tr key={u.id}>
                                                    <td>{u.id}</td>
                                                    <td><strong>{u.name}</strong></td>
                                                    <td>{u.username}</td>
                                                    <td>{u.email}</td>
                                                    <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

export default Admin
