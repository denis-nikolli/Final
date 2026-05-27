import "./index.css"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

const About = () => {
    return (
        <>
            <Navigation />

            <header className="page-hero about-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">About Us</p>
                    <h1>About Us</h1>
                </div>
            </header>

            <main className="page-content about-page">
                <section className="about-story">
                    <div>
                        <p className="eyebrow">Who we are</p>
                        <h2>Local car rental for travelers who want Albania to feel easy.</h2>
                        <p>
                            Rent a Car helps visitors move between Tirana Airport, Durres, Vlore, Sarande, and the mountain routes
                            with clean cars, clear pricing, and practical route advice from a local team.
                        </p>
                    </div>
                    <div className="about-image-placeholder image-placeholder">Image placeholder</div>
                </section>

                <section className="stack-grid">
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">Airport handover</p>
                            <h3>Fast pickup</h3>
                            <p>Meet the car at the terminal or city center with documents checked before you arrive.</p>
                        </div>
                    </article>
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">Fleet care</p>
                            <h3>Clean, ready cars</h3>
                            <p>City cars, SUVs, vans, and premium models prepared for Albanian roads and luggage needs.</p>
                        </div>
                    </article>
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">Route support</p>
                            <h3>Local guidance</h3>
                            <p>Get simple advice for Riviera drives, Theth routes, parking, ferry arrivals, and return options.</p>
                        </div>
                    </article>
                </section>

                <section className="why-section">
                    <h2>Why choose us</h2>
                    <div className="why-grid">
                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>Unlimited Mileage</h3>
                            <p>Explore Albania from coast to mountains with total freedom and flexible daily routes.</p>
                        </article>

                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>Travel Assistance</h3>
                            <p>We support you whenever the unexpected happens, from route questions to roadside help.</p>
                        </article>

                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>Complete Protection</h3>
                            <p>Drive with confidence using clear insurance options and straightforward rental terms.</p>
                        </article>

                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>Effortless Booking</h3>
                            <p>Book your Albania rental car in minutes with clear pricing and no hidden fees.</p>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default About
