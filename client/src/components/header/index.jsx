import "./index.css"

const Header = () => {
    return (
        <header className="hero">
            <div className="hero-card">
                <div className="hero-copy-block">
                    <p className="eyebrow">Rent a car in Albania</p>
                    <h1><span>Save 15%</span> on your booking</h1>
                    <p className="hero-copy">
                        Reserve now and pay online to automatically receive a discount at checkout.
                    </p>
                </div>

                <div className="hero-cars" aria-hidden="true">
                    <div className="image-placeholder">Image placeholder</div>
                    <div className="image-placeholder">Image placeholder</div>
                </div>
            </div>
        </header>
    )
}

export default Header
