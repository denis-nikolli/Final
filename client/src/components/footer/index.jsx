import "./index.css"
import { Link } from "react-router"

const Footer = () => (
    <footer>
        <div className="footer-main">
            <div className="footer-brand">
                <Link className="brand" to="/">
                    <span className="brand-logo">Car Rental</span>
                </Link>
                <div className="footer-contact-info">
                    <p>+355 69 400 1122</p>
                    <p>+355 69 400 1123</p>
                    <p>hello@albaniadrive.com</p>
                </div>
            </div>

            <div className="footer-links-block">
                <strong>Quick Links</strong>
                <div className="footer-links-grid">
                    <Link to="/">Home</Link>
                    <Link to="/fleet">Fleet</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contacts</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/terms">Terms &amp; Conditions</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>

            <div className="footer-cta">
                <strong>Begin your Journey</strong>
                <Link to="/fleet" className="footer-start-btn">Start Renting</Link>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                </a>
            </div>
            <p className="footer-copy">&copy; {new Date().getFullYear()} Car Rental Albania. All rights reserved.</p>
        </div>

        <p className="footer-dev">Developed by <span>Car Rental Team</span></p>
    </footer>
)

export default Footer
