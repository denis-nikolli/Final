import "./index.css"
import { Link } from "react-router"
import { useLang } from "../../context/LangContext"

const Footer = () => {
    const { t } = useLang()
    return (
        <footer id="contact">
            <div>
                <Link className="brand" to="/">
                    <span className="brand-logo">Rent a Car</span>
                </Link>
                <p>{t.footer.tagline}</p>
            </div>

            <div className="footer-links">
                <Link to="/#booking">{t.footer.book}</Link>
                <Link to="/fleet">{t.footer.fleet}</Link>
                <Link to="/blog">{t.footer.guides}</Link>
                <Link to="/faq">{t.footer.offers}</Link>
            </div>

            <div>
                <strong>{t.footer.contact}</strong>
                <p>hello@albaniadrive.com<br />+355 69 400 1122</p>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Rent a Car Albania. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
