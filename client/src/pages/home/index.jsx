import "./index.css"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import Navigation from "../../components/navigation"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"
import AlbaniaMap from "../../components/albaniamap"

const today = new Date().toISOString().split('T')[0]

const Home = () => {
    const navigate = useNavigate()
    const { t } = useLang()
    usePageTitle(null)
    const [discountApplied, setDiscountApplied] = useState(false)
    const [pickupDate, setPickupDate] = useState("")
    const [featuredCars, setFeaturedCars] = useState([])
    const [carouselIndex, setCarouselIndex] = useState(0)

    useEffect(() => {
        fetch("/api/cars")
            .then(r => r.json())
            .then(data => setFeaturedCars((data.results ?? data).slice(0, 5)))
            .catch(() => {})
    }, [])

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


                <section className="section fleet-section" id="fleet">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">{t.home.fleetEyebrow}</p>
                            <h2>{t.home.fleetH2}</h2>
                        </div>
                        <Link to="/fleet">{t.home.viewAll}</Link>
                    </div>

                    <div className="carousel-wrapper">
                        <button
                            className="carousel-btn carousel-prev"
                            type="button"
                            onClick={() => setCarouselIndex(i => Math.max(0, i - 1))}
                            disabled={carouselIndex === 0}
                            aria-label="Previous"
                        >&#8592;</button>

                        <div className="carousel-track">
                            {featuredCars.slice(carouselIndex, carouselIndex + 3).map(car => (
                                <article key={car.id} className="car-card">
                                    {car.image
                                        ? <div className="car-image"><img src={car.image} alt={car.name} /></div>
                                        : <div className="car-image-placeholder">No image</div>
                                    }
                                    <div className="card-body">
                                        <p className="car-class">{car.type}</p>
                                        <h3 className="card-title">{car.name}</h3>
                                        <div className="spec-list">
                                            <span className="badge">{car.transmission}</span>
                                            <span className="badge">{car.seats} seats</span>
                                            <span className="badge">{car.fuel}</span>
                                        </div>
                                        <div className="price-row">
                                            <strong>EUR {car.price}/day</strong>
                                            <Link to="/fleet" className="btn btn-danger">{t.home.rent}</Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <button
                            className="carousel-btn carousel-next"
                            type="button"
                            onClick={() => setCarouselIndex(i => Math.min(featuredCars.length - 3, i + 1))}
                            disabled={carouselIndex >= featuredCars.length - 3}
                            aria-label="Next"
                        >&#8594;</button>
                    </div>

                    <div className="carousel-dots">
                        {Array.from({ length: featuredCars.length - 2 }, (_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot${carouselIndex === i ? " is-active" : ""}`}
                                type="button"
                                onClick={() => setCarouselIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>

                <section className="route-band" id="routes">
                    <div className="route-map" aria-label="Map from Tirana to the Albanian Riviera">
                        <AlbaniaMap />
                    </div>
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
                    <div className="reviews-header">
                        <div>
                            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>{t.home.reviewsEyebrow}</p>
                            <h2 className="reviews-title">{t.home.reviewsH2}</h2>
                        </div>
                        <p className="reviews-intro">Thousands of travellers trust us every year. Discover real experiences from guests who explored Albania with comfort, safety, and our friendly service.</p>
                    </div>
                    <div className="review-scroll">
                        {[
                            { name: "Elena M.", color: "#7c5cbf", body: "The Polo was perfect for our Tirana stay. Airport pickup took ten minutes and the team marked every stop we wanted on the map." },
                            { name: "Arben K.", color: "#2a9d8f", body: "No surprise charges. We drove from Tirana to Sarande and returned the car in Vlore. Very smooth experience overall." },
                            { name: "Julia R.", color: "#e07b4a", body: "Great car, fast replies, and the Riviera route advice was genuinely useful. The photos finally match the trip!" },
                            { name: "Marco T.", color: "#457b9d", body: "Clean car, easy pickup at Tirana Airport. Staff was very helpful with route suggestions for Berat and Gjirokaster." },
                            { name: "Sarah L.", color: "#2d6a4f", body: "Loved the flexibility of returning in a different city. Made our Riviera road trip so much easier. Highly recommend!" },
                        ].map(r => (
                            <article key={r.name} className="review-card">
                                <div className="review-top">
                                    <div className="review-avatar" style={{ background: r.color }}>{r.name[0]}</div>
                                    <div>
                                        <strong className="review-name">{r.name}</strong>
                                        <div className="review-stars">★★★★★</div>
                                    </div>
                                </div>
                                <p className="review-body">{r.body}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Home
