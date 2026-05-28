import "./index.css"
import { Link } from "react-router"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"

const Blog = () => {
    const { t } = useLang()
    usePageTitle("Driving Guides")
    return (
        <>
            <Navigation />

            <header className="page-hero guides-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">{t.blog.eyebrow}</p>
                    <h1>{t.blog.h1}</h1>
                </div>
            </header>

            <main className="page-content blog-page">
                <section>
                    <div className="section-heading" style={{ marginBottom: 32 }}>
                        <div>
                            <p className="eyebrow">{t.blog.routesEyebrow}</p>
                            <h2>{t.blog.routesH2}</h2>
                        </div>
                    </div>

                    <div className="route-cards">
                        {t.blog.routes.map((route, i) => {
                            const images = ["/destinations/ksamil.jpg", "/destinations/theth.jpg", "/destinations/berat.jpg"]
                            return (
                                <article key={route.title} className="route-card">
                                    <img className="route-card-image" src={images[i]} alt={route.title} />
                                    <div className="route-card-body">
                                        <h3>{route.title}</h3>
                                        <p className="route-card-desc">{route.desc}</p>
                                        <div className="route-card-stats">
                                            <span><strong>{route.distance}</strong> {t.blog.totalDrive}</span>
                                            <span><strong>{route.duration}</strong> {t.blog.idealTrip}</span>
                                        </div>
                                        <ul className="route-highlights">
                                            {route.highlights.map(h => <li key={h}>{h}</li>)}
                                        </ul>
                                        <Link to="/fleet?type=suv" className="primary-btn route-cta">
                                            {t.blog.rentForRoute}
                                        </Link>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>

                <section className="blog-tip-band">
                    <div>
                        <p className="eyebrow">{t.blog.tipsEyebrow}</p>
                        <h2>{t.blog.tipsH2}</h2>
                    </div>
                    <div className="blog-tips">
                        {t.blog.tips.map(tip => (
                            <article key={tip.h3} className="blog-tip">
                                <h3>{tip.h3}</h3>
                                <p>{tip.p}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Blog
