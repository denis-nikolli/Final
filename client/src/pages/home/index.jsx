import "./index.css"
import { useState } from "react"
import { useNavigate, Link } from "react-router"
import Navigation from "../../components/navigation"
import Header from "../../components/header"
import Footer from "../../components/footer"

const Home = () => {
    const navigate = useNavigate()
    const [discountApplied, setDiscountApplied] = useState(false)

    const handleBooking = (e) => {
        e.preventDefault()
        const form = e.target
        const params = new URLSearchParams({
            location: form.pickupLocation.value,
            pickupDate: form.pickupDate.value,
            returnDate: form.returnDate.value,
        })
        if (discountApplied) params.set("discountCode", "SAVE15")
        navigate(`/fleet?${params}`)
    }

    const handleClaimDiscount = () => {
        setDiscountApplied(true)
    }

    return (
        <>
            <Navigation />
            <Header />

            <main>
                <section className="booking-panel" id="booking" aria-label="Car rental search">
                    <form className="booking-form" id="bookingForm" onSubmit={handleBooking}>
                        <label>
                            <span>Pick-up location</span>
                            <select id="pickupLocation" name="pickupLocation" required>
                                <option>Tirana Airport</option>
                                <option>Tirana City Center</option>
                                <option>Durres Port</option>
                                <option>Sarande Ferry Terminal</option>
                                <option>Vlore Promenade</option>
                            </select>
                        </label>

                        <label>
                            <span>Pick-up date</span>
                            <input id="pickupDate" name="pickupDate" type="date" required />
                        </label>

                        <label>
                            <span>Return date</span>
                            <input id="returnDate" name="returnDate" type="date" required />
                        </label>

                        <button className="primary-btn" type="submit">Search Cars</button>
                    </form>

                    <p className="booking-note" id="bookingNote" aria-live="polite">
                        {discountApplied
                            ? "Discount SAVE15 applied — 15% off your rental!"
                            : "Free airport handover, unlimited support, and no hidden cleaning fees."}
                    </p>
                </section>

                <section className="discount-banner" aria-label="Online booking discount">
                    <p>Save 15% Now</p>
                    <div>
                        <h2>Pay online and save instantly on your Albania rental.</h2>
                        <span>
                            Reserve your vehicle today, pay securely online, and receive an
                            immediate discount before you start the road trip.
                        </span>
                    </div>
                    <button
                        className="primary-btn"
                        type="button"
                        onClick={handleClaimDiscount}
                        disabled={discountApplied}
                    >
                        {discountApplied ? "Discount Applied!" : "Claim Discount"}
                    </button>
                </section>

                <section className="section fleet-section" id="fleet">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Fleet</p>
                            <h2>Popular rentals</h2>
                        </div>
                        <Link to="/fleet">View all cars</Link>
                    </div>

                    <div className="fleet-grid">
                        <article data-car-type="city" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">City car</p>
                                <h3 className="card-title">Volkswagen Polo</h3>
                                <p className="car-detail">Tirana parking, couples, short coastal drives</p>
                                <div className="spec-list">
                                    <span className="badge">Automatic</span>
                                    <span className="badge">5 seats</span>
                                    <span className="badge">2 bags</span>
                                    <span className="badge">Petrol</span>
                                </div>
                                <div className="price-row">
                                    <strong>EUR 32/day</strong>
                                    <Link to="/fleet" className="btn btn-danger">Rent</Link>
                                </div>
                            </div>
                        </article>

                        <article data-car-type="city" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">City car</p>
                                <h3 className="card-title">Toyota Yaris Hybrid</h3>
                                <p className="car-detail">Low fuel use, city routes, airport handovers</p>
                                <div className="spec-list">
                                    <span className="badge">Automatic</span>
                                    <span className="badge">5 seats</span>
                                    <span className="badge">2 bags</span>
                                    <span className="badge">Hybrid</span>
                                </div>
                                <div className="price-row">
                                    <strong>EUR 36/day</strong>
                                    <Link to="/fleet" className="btn btn-danger">Rent</Link>
                                </div>
                            </div>
                        </article>

                        <article data-car-type="suv" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">Sedan</p>
                                <h3 className="card-title">Skoda Octavia</h3>
                                <p className="car-detail">Business trips, Berat, Gjirokaster, family luggage</p>
                                <div className="spec-list">
                                    <span className="badge">Automatic</span>
                                    <span className="badge">5 seats</span>
                                    <span className="badge">3 bags</span>
                                    <span className="badge">Diesel</span>
                                </div>
                                <div className="price-row">
                                    <strong>EUR 44/day</strong>
                                    <Link to="/fleet" className="btn btn-danger">Rent</Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="route-band" id="routes">
                    <div className="route-map" id="signatureRouteMap" aria-label="Map from Tirana to the Albanian Riviera"></div>
                    <div className="route-content">
                        <p className="eyebrow">Signature route</p>
                        <h2>Tirana to the Albanian Riviera</h2>
                        <p>
                            Cruise through Vlore, climb Llogara Pass, stop in Dhermi, and end
                            near Ksamil with turquoise coves and flexible return options.
                        </p>
                        <div className="route-stats">
                            <span><strong>305 km</strong> scenic drive</span>
                            <span><strong>4-7 days</strong> ideal trip</span>
                        </div>
                        <Link className="primary-btn" to="/blog">See Driving Guides</Link>
                    </div>
                </section>

                <section className="section destination-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Where your rental takes you</p>
                            <h2>Albania highlights</h2>
                        </div>
                    </div>

                    <div className="destination-grid">
                        <article className="destination-card tirana">
                            <h3>Tirana</h3>
                            <p>Easy airport pickup, cafes, museums, and day trips to Kruje.</p>
                        </article>

                        <article className="destination-card alps">
                            <h3>Theth</h3>
                            <p>Mountain villages, waterfalls, and dramatic northern roads.</p>
                        </article>

                        <article className="destination-card riviera">
                            <h3>Ksamil</h3>
                            <p>Beach coves, island views, and relaxed Riviera driving.</p>
                        </article>
                    </div>
                </section>

                <section className="reviews-section" id="reviews">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Trusted by travelers</p>
                            <h2>Simple handovers, clean cars, better road trips.</h2>
                        </div>
                    </div>

                    <div className="review-grid">
                        <article>
                            <strong>&quot;The Duster was perfect for Theth.&quot;</strong>
                            <p>Airport pickup took ten minutes and the team marked every stop we wanted on the map.</p>
                            <span>Elena M.</span>
                        </article>

                        <article>
                            <strong>&quot;No surprise charges.&quot;</strong>
                            <p>We drove from Tirana to Sarande and returned the car in Vlore. Very smooth.</p>
                            <span>Arben K.</span>
                        </article>

                        <article>
                            <strong>&quot;The photos finally match the trip.&quot;</strong>
                            <p>Great car, fast replies, and the Riviera route advice was genuinely useful.</p>
                            <span>Julia R.</span>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home
