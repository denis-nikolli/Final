import "./index.css"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"

const About = () => {
    const { t } = useLang()
    usePageTitle("About Us")
    return (
        <>
            <Navigation />

            <header className="page-hero about-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">{t.about.eyebrow}</p>
                    <h1>{t.about.h1}</h1>
                </div>
            </header>

            <main className="page-content about-page">
                <section className="about-story">
                    <div>
                        <p className="eyebrow">{t.about.whoEyebrow}</p>
                        <h2>{t.about.whoH2}</h2>
                        <p>{t.about.whoDesc}</p>
                    </div>
                    <div className="about-image-placeholder image-placeholder">Image placeholder</div>
                </section>

                <section className="stack-grid">
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">{t.about.c1class}</p>
                            <h3>{t.about.c1h3}</h3>
                            <p>{t.about.c1desc}</p>
                        </div>
                    </article>
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">{t.about.c2class}</p>
                            <h3>{t.about.c2h3}</h3>
                            <p>{t.about.c2desc}</p>
                        </div>
                    </article>
                    <article className="stack-card">
                        <div className="stack-image-placeholder">Image placeholder</div>
                        <div>
                            <p className="car-class">{t.about.c3class}</p>
                            <h3>{t.about.c3h3}</h3>
                            <p>{t.about.c3desc}</p>
                        </div>
                    </article>
                </section>

                <section className="why-section">
                    <h2>{t.about.whyH2}</h2>
                    <div className="why-grid">
                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>{t.about.w1h3}</h3>
                            <p>{t.about.w1desc}</p>
                        </article>
                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>{t.about.w2h3}</h3>
                            <p>{t.about.w2desc}</p>
                        </article>
                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>{t.about.w3h3}</h3>
                            <p>{t.about.w3desc}</p>
                        </article>
                        <article className="why-card">
                            <span className="why-icon" aria-hidden="true">AD</span>
                            <h3>{t.about.w4h3}</h3>
                            <p>{t.about.w4desc}</p>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default About
