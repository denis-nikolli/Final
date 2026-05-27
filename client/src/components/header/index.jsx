import "./index.css"
import { useLang } from "../../context/LangContext"

const Header = () => {
    const { t } = useLang()
    return (
        <header className="hero">
            <div className="hero-card">
                <div className="hero-copy-block">
                    <p className="eyebrow">{t.header.eyebrow}</p>
                    <h1><span>{t.header.h1red}</span>{t.header.h1rest}</h1>
                    <p className="hero-copy">{t.header.copy}</p>
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
