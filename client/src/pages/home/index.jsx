import "./index.css"
import { useState } from "react"
import { useNavigate, Link } from "react-router"
import Navigation from "../../components/navigation"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"

const today = new Date().toISOString().split('T')[0]

const Home = () => {
    const navigate = useNavigate()
    const { t } = useLang()
    usePageTitle(null)
    const [discountApplied, setDiscountApplied] = useState(false)
    const [pickupDate, setPickupDate] = useState("")

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

    return (
        <>
            <Navigation />
            <Header />

            <main>
                <section className="booking-panel" id="booking" aria-label="Car rental search">
                    <form className="booking-form" id="bookingForm" onSubmit={handleBooking}>
                        <label>
                            <span>{t.home.locationLabel}</span>
                            <select id="pickupLocation" name="pickupLocation" required>
                                <option>Tirana Airport</option>
                                <option>Tirana City Center</option>
                                <option>Durres Port</option>
                                <option>Sarande Ferry Terminal</option>
                                <option>Vlore Promenade</option>
                            </select>
                        </label>
                        <label>
                            <span>{t.home.pickupLabel}</span>
                            <input id="pickupDate" name="pickupDate" type="date" required min={today} value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
                        </label>
                        <label>
                            <span>{t.home.returnLabel}</span>
                            <input id="returnDate" name="returnDate" type="date" required min={pickupDate || today} />
                        </label>
                        <button className="primary-btn" type="submit">{t.home.searchBtn}</button>
                    </form>
                    <p className="booking-note" aria-live="polite">
                        {discountApplied ? t.home.discountNote : t.home.bookingNote}
                    </p>
                </section>

                <section className="discount-banner" aria-label="Online booking discount">
                    <p>{t.home.bannerTag}</p>
                    <div>
                        <h2>{t.home.bannerH2}</h2>
                        <span>{t.home.bannerDesc}</span>
                    </div>
                    <button
                        className="primary-btn"
                        type="button"
                        onClick={() => setDiscountApplied(true)}
                        disabled={discountApplied}
                    >
                        {discountApplied ? t.home.appliedBtn : t.home.claimBtn}
                    </button>
                </section>

                <section className="section fleet-section" id="fleet">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">{t.home.fleetEyebrow}</p>
                            <h2>{t.home.fleetH2}</h2>
                        </div>
                        <Link to="/fleet">{t.home.viewAll}</Link>
                    </div>

                    <div className="fleet-grid">
                        <article data-car-type="city" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">{t.home.cityLabel}</p>
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
                                    <Link to="/fleet" className="btn btn-danger">{t.home.rent}</Link>
                                </div>
                            </div>
                        </article>

                        <article data-car-type="city" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">{t.home.cityLabel}</p>
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
                                    <Link to="/fleet" className="btn btn-danger">{t.home.rent}</Link>
                                </div>
                            </div>
                        </article>

                        <article data-car-type="suv" className="car-card">
                            <div className="car-image-placeholder">Image placeholder</div>
                            <div className="card-body">
                                <p className="car-class">{t.home.sedanLabel}</p>
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
                                    <Link to="/fleet" className="btn btn-danger">{t.home.rent}</Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="route-band" id="routes">
                    <div className="route-map" aria-label="Map from Tirana to the Albanian Riviera"></div>
                    <div className="route-content">
                        <p className="eyebrow">{t.home.routeEyebrow}</p>
                        <h2>{t.home.routeH2}</h2>
                        <p>{t.home.routeDesc}</p>
                        <div className="route-stats">
                            <span><strong>305 km</strong> {t.home.stat1}</span>
                            <span><strong>4-7 days</strong> {t.home.stat2}</span>
                        </div>
                        <Link className="primary-btn" to="/blog">{t.home.routeBtn}</Link>
                    </div>
                </section>

                <section className="section destination-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">{t.home.destEyebrow}</p>
                            <h2>{t.home.destH2}</h2>
                        </div>
                    </div>
                    <div className="destination-grid">
                        <article className="destination-card tirana">
                            <h3>Tirana</h3>
                            <p>{t.home.tiranaSub}</p>
                        </article>
                        <article className="destination-card alps">
                            <h3>Theth</h3>
                            <p>{t.home.thethSub}</p>
                        </article>
                        <article className="destination-card riviera">
                            <h3>Ksamil</h3>
                            <p>{t.home.ksamil}</p>
                        </article>
                    </div>
                </section>

                <section className="reviews-section" id="reviews">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">{t.home.reviewsEyebrow}</p>
                            <h2>{t.home.reviewsH2}</h2>
                        </div>
                    </div>
                    <div className="review-grid">
                        <article>
                            <strong>{t.home.r1title}</strong>
                            <p>{t.home.r1body}</p>
                            <span>{t.home.r1name}</span>
                        </article>
                        <article>
                            <strong>{t.home.r2title}</strong>
                            <p>{t.home.r2body}</p>
                            <span>{t.home.r2name}</span>
                        </article>
                        <article>
                            <strong>{t.home.r3title}</strong>
                            <p>{t.home.r3body}</p>
                            <span>{t.home.r3name}</span>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Home
