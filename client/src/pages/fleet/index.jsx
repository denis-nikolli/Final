import "./index.css"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

const LOCATIONS = [
    "Tirana Airport",
    "Tirana City Center",
    "Durres Port",
    "Sarande Ferry Terminal",
    "Vlore Promenade",
]

const TYPE_LABELS = {
    city: "City Car",
    suv: "SUV",
    van: "Van",
    luxury: "Luxury",
}

const PAGE_SIZE = 9

const Fleet = () => {
    const [searchParams] = useSearchParams()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all")
    const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "")
    const [page, setPage] = useState(1)
    const [rentCar, setRentCar] = useState(null)
    const [rentForm, setRentForm] = useState({ name: "", email: "", phone: "", pickupDate: searchParams.get("pickupDate") || "", returnDate: searchParams.get("returnDate") || "", location: searchParams.get("location") || LOCATIONS[0] })
    const [rentStatus, setRentStatus] = useState("")
    const [rentLoading, setRentLoading] = useState(false)

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true)
                const params = new URLSearchParams()
                if (locationFilter) params.set("location", locationFilter)
                if (typeFilter && typeFilter !== "all") params.set("type", typeFilter)
                const discountCode = searchParams.get("discountCode")
                if (discountCode) params.set("discountCode", discountCode)

                const res = await fetch(`/api/cars?${params}`)
                if (!res.ok) throw new Error("Failed to load cars")
                const data = await res.json()
                setCars(data.results ?? data)
                setPage(1)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCars()
    }, [typeFilter, locationFilter])

    const totalPages = Math.ceil(cars.length / PAGE_SIZE)
    const visibleCars = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const openRentModal = (car) => {
        setRentCar(car)
        setRentStatus("")
    }

    const closeRentModal = () => {
        setRentCar(null)
        setRentStatus("")
    }

    const handleRentSubmit = async (e) => {
        e.preventDefault()
        setRentLoading(true)
        setRentStatus("")
        try {
            const res = await fetch("/api/rental-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    carId: rentCar.id,
                    carName: rentCar.name,
                    ...rentForm,
                }),
            })
            if (!res.ok) throw new Error("Failed to submit")
            setRentStatus("success")
        } catch {
            setRentStatus("error")
        } finally {
            setRentLoading(false)
        }
    }

    return (
        <>
            <Navigation />

            <header className="page-hero fleet-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">Fleet</p>
                    <h1>Our Fleet of Modern Rental Cars</h1>
                </div>
            </header>

            <main className="fleet-page">
                <section className="fleet-database" aria-label="Complete car database">
                    <div className="fleet-controls">
                        <div className="fleet-type-filters">
                            {["all", "city", "suv", "van", "luxury"].map(t => (
                                <button
                                    key={t}
                                    className={`type-filter-btn${typeFilter === t ? " is-active" : ""}`}
                                    onClick={() => setTypeFilter(t)}
                                    type="button"
                                >
                                    {t === "all" ? "All Cars" : TYPE_LABELS[t]}
                                </button>
                            ))}
                        </div>
                        <div className="fleet-location-filter">
                            <label>
                                <span>Location</span>
                                <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                                    <option value="">All locations</option>
                                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>

                    {loading && <p className="fleet-status">Loading cars&hellip;</p>}
                    {error && <p className="fleet-status fleet-error">Could not load cars. Make sure the backend is running.</p>}

                    {!loading && !error && (
                        <>
                            <p className="fleet-count">{cars.length} car{cars.length !== 1 ? "s" : ""} available</p>
                            {cars.length === 0 ? (
                                <p className="fleet-status">No cars match your filters.</p>
                            ) : (
                                <div className="fleet-grid">
                                    {visibleCars.map(car => (
                                        <article key={car.id} className="car-card">
                                            <div className="car-image-placeholder">Image placeholder</div>
                                            <div className="card-body">
                                                <p className="car-class">{TYPE_LABELS[car.type] || car.type}</p>
                                                <h3 className="card-title">{car.name}</h3>
                                                <div className="spec-list">
                                                    <span className="badge">{car.transmission}</span>
                                                    <span className="badge">{car.seats} seats</span>
                                                    <span className="badge">{car.bags} bags</span>
                                                </div>
                                                <div className="price-row">
                                                    <strong>EUR {car.price}/day</strong>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => openRentModal(car)}
                                                    >
                                                        Rent
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {totalPages > 1 && (
                                <nav className="fleet-pagination" aria-label="Fleet pages">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn${page === i + 1 ? " is-active" : ""}`}
                                            onClick={() => setPage(i + 1)}
                                            type="button"
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </nav>
                            )}
                        </>
                    )}
                </section>
            </main>

            <Footer />

            {rentCar && (
                <div className="rental-modal" onClick={e => e.target === e.currentTarget && closeRentModal()}>
                    <div className="rental-dialog">
                        <button className="rental-close" type="button" onClick={closeRentModal} aria-label="Close">&times;</button>

                        {rentStatus === "success" ? (
                            <div className="rental-success">
                                <p className="eyebrow">Request sent</p>
                                <h2>We&apos;ll be in touch shortly.</h2>
                                <p>Your rental request for <strong>{rentCar.name}</strong> has been received. Our team will confirm your booking by email.</p>
                                <button className="primary-btn" type="button" onClick={closeRentModal} style={{ marginTop: 24 }}>Close</button>
                            </div>
                        ) : (
                            <>
                                <div className="rental-form-heading">
                                    <p className="eyebrow">Rental request</p>
                                    <h2>{rentCar.name}</h2>
                                    <p>EUR {rentCar.price}/day &mdash; {TYPE_LABELS[rentCar.type]}</p>
                                </div>

                                <form className="rental-form" onSubmit={handleRentSubmit}>
                                    <label>
                                        <span>Full name</span>
                                        <input type="text" required value={rentForm.name} onChange={e => setRentForm(f => ({ ...f, name: e.target.value }))} />
                                    </label>
                                    <label>
                                        <span>Email</span>
                                        <input type="email" required value={rentForm.email} onChange={e => setRentForm(f => ({ ...f, email: e.target.value }))} />
                                    </label>
                                    <label>
                                        <span>Phone / WhatsApp</span>
                                        <input type="tel" value={rentForm.phone} onChange={e => setRentForm(f => ({ ...f, phone: e.target.value }))} />
                                    </label>
                                    <label>
                                        <span>Pick-up location</span>
                                        <select value={rentForm.location} onChange={e => setRentForm(f => ({ ...f, location: e.target.value }))}>
                                            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                                        </select>
                                    </label>
                                    <label>
                                        <span>Pick-up date</span>
                                        <input type="date" required value={rentForm.pickupDate} onChange={e => setRentForm(f => ({ ...f, pickupDate: e.target.value }))} />
                                    </label>
                                    <label>
                                        <span>Return date</span>
                                        <input type="date" required value={rentForm.returnDate} onChange={e => setRentForm(f => ({ ...f, returnDate: e.target.value }))} />
                                    </label>
                                    <div className="rental-form-wide">
                                        <button className="primary-btn" type="submit" disabled={rentLoading}>
                                            {rentLoading ? "Sending…" : "Submit Request"}
                                        </button>
                                        {rentStatus === "error" && (
                                            <p className="rental-form-status" style={{ color: "var(--red)", marginTop: 12 }}>
                                                Something went wrong. Please try again.
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Fleet
