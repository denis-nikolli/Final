import "./index.css"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const routes = [
    {
        title: "Tirana to the Albanian Riviera",
        distance: "305 km",
        duration: "4–7 days",
        description: "Cruise through Vlore, climb Llogara Pass, stop in Dhermi, and end near Ksamil with turquoise coves and flexible return options.",
        highlights: ["Vlore city stop", "Llogara Pass (1027 m)", "Dhermi beach", "Ksamil coves"],
    },
    {
        title: "Tirana to Theth",
        distance: "190 km",
        duration: "2–3 days",
        description: "Head north through Shkoder and into the Albanian Alps. Theth offers dramatic gorges, a waterfall, and a blue-eye pool.",
        highlights: ["Shkoder Old Town", "Komani Lake ferry", "Valbona Valley", "Theth waterfall"],
    },
    {
        title: "Tirana to Berat & Gjirokaster",
        distance: "260 km",
        duration: "2–4 days",
        description: "Two UNESCO-listed 'cities of a thousand windows' in a single loop through central and southern Albania.",
        highlights: ["Berat Castle", "Cobo Winery", "Gjirokaster Bazaar", "Blue Eye Spring"],
    },
]

const Blog = () => {
    return (
        <>
            <Navigation />

            <header className="page-hero guides-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">Driving guides</p>
                    <h1>Routes that make the car rental feel worth it.</h1>
                </div>
            </header>

            <main className="page-content blog-page">
                <section>
                    <div className="section-heading" style={{ marginBottom: 32 }}>
                        <div>
                            <p className="eyebrow">Curated routes</p>
                            <h2>Albania by road</h2>
                        </div>
                    </div>

                    <div className="route-cards">
                        {routes.map(route => (
                            <article key={route.title} className="route-card">
                                <div className="route-card-image image-placeholder">Image placeholder</div>
                                <div className="route-card-body">
                                    <h3>{route.title}</h3>
                                    <p className="route-card-desc">{route.description}</p>
                                    <div className="route-card-stats">
                                        <span><strong>{route.distance}</strong> total drive</span>
                                        <span><strong>{route.duration}</strong> ideal trip</span>
                                    </div>
                                    <ul className="route-highlights">
                                        {route.highlights.map(h => <li key={h}>{h}</li>)}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="blog-tip-band">
                    <div>
                        <p className="eyebrow">Driving tips</p>
                        <h2>Know before you go</h2>
                    </div>
                    <div className="blog-tips">
                        <article className="blog-tip">
                            <h3>Mountain passes</h3>
                            <p>Llogara Pass and the Theth road require confidence on narrow switchbacks. An SUV is recommended for both.</p>
                        </article>
                        <article className="blog-tip">
                            <h3>Fuel stations</h3>
                            <p>Fill up before entering remote mountain areas. Major towns have plenty of stations; rural stretches do not.</p>
                        </article>
                        <article className="blog-tip">
                            <h3>One-way returns</h3>
                            <p>You can pick up in Tirana and return in Vlore, Sarande, or Durres. Ideal for a linear Riviera route.</p>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Blog
