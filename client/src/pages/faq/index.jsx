import "./index.css"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

const offers = [
    {
        title: "Weekly Saver",
        description: "Save 12% on rentals of seven days or more. Perfect for coast-to-mountain trips.",
    },
    {
        title: "Airport Fast Lane",
        description: "Send documents before arrival and your car can be ready outside arrivals.",
    },
    {
        title: "One-way Return",
        description: "Pick up in Tirana and return in Vlore, Sarande, Durres, or Shkoder.",
    },
]

const faqs = [
    {
        q: "What documents do I need to rent a car?",
        a: "A valid driving licence, a passport or national ID, and a credit or debit card for the deposit.",
    },
    {
        q: "Is there a minimum rental age?",
        a: "Drivers must be at least 21 years old. Drivers under 25 may be subject to a young driver surcharge.",
    },
    {
        q: "Can I return the car at a different location?",
        a: "Yes. We offer one-way rentals between Tirana, Durres, Vlore, Sarande, and Shkoder.",
    },
    {
        q: "Is mileage unlimited?",
        a: "All our rentals include unlimited mileage — drive as far as you need across Albania.",
    },
    {
        q: "How does the online discount work?",
        a: "Book and pay online to automatically receive 15% off your rental total. No code needed at checkout.",
    },
    {
        q: "What fuel policy applies?",
        a: "Cars are provided with a full tank and should be returned full. Fuel top-up charges apply if not refuelled.",
    },
]

const Faq = () => {
    return (
        <>
            <Navigation />

            <header className="page-hero offers-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">Rental offers &amp; FAQ</p>
                    <h1>Better rates for longer Albania road trips.</h1>
                </div>
            </header>

            <main className="page-content faq-page">
                <section>
                    <div className="section-heading" style={{ marginBottom: 28 }}>
                        <div>
                            <p className="eyebrow">Current offers</p>
                            <h2>Save more on your trip</h2>
                        </div>
                    </div>
                    <div className="stack-grid">
                        {offers.map(o => (
                            <article key={o.title} className="stack-card">
                                <div>
                                    <h3>{o.title}</h3>
                                    <p>{o.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="faq-section">
                    <div className="section-heading" style={{ marginBottom: 28 }}>
                        <div>
                            <p className="eyebrow">FAQ</p>
                            <h2>Frequently asked questions</h2>
                        </div>
                    </div>
                    <div className="faq-list">
                        {faqs.map(item => (
                            <article key={item.q} className="faq-item">
                                <h3>{item.q}</h3>
                                <p>{item.a}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Faq
