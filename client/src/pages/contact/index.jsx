import "./index.css"
import { useState } from "react"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"
import { useLang } from "../../context/LangContext"
import usePageTitle from "../../hooks/usePageTitle"

const Contact = () => {
    const { t } = useLang()
    usePageTitle("Contact")
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
    const [status, setStatus] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("sending")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error("Failed")
            setStatus("sent")
            setForm({ name: "", email: "", phone: "", message: "" })
        } catch {
            setStatus("error")
        }
    }

    return (
        <>
            <Navigation />

            <header className="page-hero contacts-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">{t.contact.eyebrow}</p>
                    <h1>{t.contact.h1}</h1>
                </div>
            </header>

            <main className="page-content contacts-page">
                <section className="office-section">
                    <div className="office-heading">
                        <h2>{t.contact.officesH2}</h2>
                        <p>{t.contact.officesDesc}</p>
                    </div>
                    <div className="office-list">
                        <article className="office-card is-featured">
                            <h3>Rent a Car &mdash; Tirana Airport Main Desk</h3>
                            <p>Tirana International Airport, Rinas, 1504, Albania</p>
                            <div>
                                <a href="tel:+355694001122">+355 69 400 1122</a>
                                <a href="mailto:hello@albaniadrive.com">hello@albaniadrive.com</a>
                            </div>
                        </article>
                        <article className="office-card">
                            <h3>Rent a Car &mdash; Tirana City Center</h3>
                            <p>Skanderbeg Square, Tirana, Albania</p>
                            <div>
                                <a href="tel:+355694001122">+355 69 400 1122</a>
                                <a href="mailto:hello@albaniadrive.com">hello@albaniadrive.com</a>
                            </div>
                        </article>
                        <article className="office-card">
                            <h3>Rent a Car &mdash; Sarande Ferry Terminal</h3>
                            <p>Port of Sarande, Sarande, Albania</p>
                            <div>
                                <a href="tel:+355694001122">+355 69 400 1122</a>
                                <a href="mailto:hello@albaniadrive.com">hello@albaniadrive.com</a>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="contact-layout">
                    <div className="contact-card">
                        <p className="eyebrow">{t.contact.contactEyebrow}</p>
                        <h2>{t.contact.contactH2}</h2>
                        <p>{t.contact.contactDesc}</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            <span>{t.contact.fullName}</span>
                            <input type="text" name="name" autoComplete="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                        </label>
                        <label>
                            <span>{t.contact.email}</span>
                            <input type="email" name="email" autoComplete="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        </label>
                        <label>
                            <span>{t.contact.phone}</span>
                            <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                        </label>
                        <label>
                            <span>{t.contact.message}</span>
                            <textarea name="message" rows="5" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}></textarea>
                        </label>
                        <button className="primary-btn" type="submit" disabled={status === "sending"}>
                            {status === "sending" ? t.contact.sending : t.contact.sendBtn}
                        </button>
                        {status === "sent" && (
                            <p className="contact-form-status contact-form-ok" aria-live="polite">{t.contact.sent}</p>
                        )}
                        {status === "error" && (
                            <p className="contact-form-status contact-form-err" aria-live="polite">{t.contact.formError}</p>
                        )}
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Contact
