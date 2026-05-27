import "./index.css"
import { useState } from "react"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
    const [status, setStatus] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("sending")
        await new Promise(r => setTimeout(r, 800))
        setStatus("sent")
        setForm({ name: "", email: "", phone: "", message: "" })
    }

    return (
        <>
            <Navigation />

            <header className="page-hero contacts-hero">
                <div className="page-hero-content">
                    <p className="eyebrow">Contacts</p>
                    <h1>Contacts</h1>
                </div>
            </header>

            <main className="page-content contacts-page">
                <section className="office-section">
                    <div className="office-heading">
                        <h2>Our Offices</h2>
                        <p>Find the location that best serves you.</p>
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
                        <p className="eyebrow">Contact</p>
                        <h2>Book, change, or confirm your rental.</h2>
                        <p>Our team can help with airport pickup, delivery times, border crossing questions, and car availability.</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            <span>Full name</span>
                            <input type="text" name="name" autoComplete="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email" name="email" autoComplete="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        </label>
                        <label>
                            <span>Phone / WhatsApp</span>
                            <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                        </label>
                        <label>
                            <span>Message</span>
                            <textarea name="message" rows="5" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}></textarea>
                        </label>
                        <button className="primary-btn" type="submit" disabled={status === "sending"}>
                            {status === "sending" ? "Sending…" : "Send Message"}
                        </button>
                        {status === "sent" && (
                            <p className="contact-form-status" aria-live="polite">
                                Message sent! We&apos;ll get back to you soon.
                            </p>
                        )}
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Contact
