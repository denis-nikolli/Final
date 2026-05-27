import { Link } from "react-router"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"
import usePageTitle from "../../hooks/usePageTitle"

const NotFound = () => {
    usePageTitle("Page Not Found")
    return (
        <>
            <Navigation />
            <div className="notfound-page">
                <p className="eyebrow">404</p>
                <h1>Page not found</h1>
                <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
                <Link to="/" className="primary-btn" style={{ marginTop: 28 }}>Back to Home</Link>
            </div>
            <Footer />
        </>
    )
}

export default NotFound
