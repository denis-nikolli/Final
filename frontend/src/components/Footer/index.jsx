import "./index.css"
import { Link } from "react-router"

const Footer = () => {
    return (
        <footer id="contact">
            <div>
                <Link className="brand" to="/">
                    <span className="brand-logo">Rent a Car</span>
                </Link>
                <p>Car rental in Tirana, Durres, Vlore, Sarande, and beyond.</p>
            </div>

            <div className="footer-links">
                <Link to="/#booking">Book</Link>
                <Link to="/fleet">Fleet</Link>
                <Link to="/blog">Guides</Link>
                <Link to="/faq">Offers</Link>
            </div>

            <div>
                <strong>Contact</strong>
                <p>hello@albaniadrive.com<br />+355 69 400 1122</p>
            </div>
        </footer>
    )
}

export default Footer
