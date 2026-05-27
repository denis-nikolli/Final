import "./index.css"
import { useState } from "react"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"

const Faq = () => {
    const { t } = useLang()
    usePageTitle("FAQ & Offers")
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <>
            <Navigation />

            <header className="page-hero offers-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">{t.faq.eyebrow}</p>
                    <h1>{t.faq.h1}</h1>
                </div>
            </header>

            <main className="page-content faq-page">
                <section>
                    <div className="section-heading" style={{ marginBottom: 28 }}>
                        <div>
                            <p className="eyebrow">{t.faq.offersEyebrow}</p>
                            <h2>{t.faq.offersH2}</h2>
                        </div>
                    </div>
                    <div className="stack-grid">
                        {t.faq.offers.map(o => (
                            <article key={o.title} className="stack-card">
                                <div>
                                    <h3>{o.title}</h3>
                                    <p>{o.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="faq-section">
                    <div className="section-heading" style={{ marginBottom: 28 }}>
                        <div>
                            <p className="eyebrow">{t.faq.faqEyebrow}</p>
                            <h2>{t.faq.faqH2}</h2>
                        </div>
                    </div>
                    <div className="faq-list">
                        {t.faq.faqs.map((item, i) => (
                            <article
                                key={item.q}
                                className={`faq-item${openIndex === i ? ' is-open' : ''}`}
                                onClick={() => toggle(i)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(i))}
                            >
                                <div className="faq-question">
                                    <h3>{item.q}</h3>
                                    <span className="faq-icon" aria-hidden="true">
                                        {openIndex === i ? '−' : '+'}
                                    </span>
                                </div>
                                {openIndex === i && <p className="faq-answer">{item.a}</p>}
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
