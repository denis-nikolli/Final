const CarIllustration = ({ color = "#d90429" }) => {
    const dark = "#7a0010"
    const mid = "#b0001e"

    return (
        <svg viewBox="0 0 380 190" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
                <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} />
                    <stop offset="100%" stopColor={dark} />
                </linearGradient>
                <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={mid} />
                </linearGradient>
                <linearGradient id="wheelRim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#888" />
                    <stop offset="100%" stopColor="#333" />
                </linearGradient>
                <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="dropshadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.22" />
                </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="190" cy="178" rx="148" ry="10" fill="url(#shadow)" />

            <g filter="url(#dropshadow)">
                {/* Lower body */}
                <path
                    d="M48 125 L48 155 Q50 166 68 168 L312 168 Q330 166 332 155 L332 125 Z"
                    fill="url(#body)"
                />

                {/* Roof / cabin */}
                <path
                    d="M102 125 L124 78 Q128 72 136 71 L244 71 Q252 72 256 78 L278 125 Z"
                    fill="url(#roof)"
                />

                {/* Front slant */}
                <path d="M48 125 L72 98 L102 125 Z" fill={mid} />

                {/* Rear slant */}
                <path d="M278 125 L308 98 L332 125 Z" fill={dark} />

                {/* Windshield */}
                <path
                    d="M106 122 L126 76 L254 76 L274 122 Z"
                    fill="rgba(190,230,255,0.72)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                />
                {/* Windshield top glare */}
                <path d="M118 119 L133 80 L196 80 L182 119 Z" fill="rgba(255,255,255,0.18)" />

                {/* Front door window */}
                <path
                    d="M108 121 L128 77 L188 77 L188 121 Z"
                    fill="rgba(160,215,255,0.68)"
                    stroke="rgba(80,0,10,0.35)"
                    strokeWidth="1.2"
                />
                {/* Rear door window */}
                <path
                    d="M192 77 L252 77 L272 121 L192 121 Z"
                    fill="rgba(160,215,255,0.68)"
                    stroke="rgba(80,0,10,0.35)"
                    strokeWidth="1.2"
                />
                {/* B-pillar */}
                <rect x="188" y="75" width="4" height="48" fill={dark} />

                {/* Door line (horizontal) */}
                <line x1="106" y1="125" x2="274" y2="125" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
                {/* Door split (vertical) */}
                <line x1="190" y1="125" x2="190" y2="165" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />

                {/* Front bumper */}
                <path d="M48 150 Q46 168 68 168 L95 168 L93 150 Z" fill="#222" />
                {/* Rear bumper */}
                <path d="M287 150 L285 168 L312 168 Q334 168 332 150 Z" fill="#1a1a1a" />

                {/* Grille */}
                <rect x="52" y="138" width="40" height="18" rx="4" fill="#1e1e1e" />
                <rect x="55" y="141" width="34" height="3" rx="1" fill="#3a3a3a" />
                <rect x="55" y="147" width="34" height="3" rx="1" fill="#3a3a3a" />
                <rect x="55" y="153" width="34" height="2" rx="1" fill="#3a3a3a" />

                {/* Headlight */}
                <path d="M50 133 L65 129 L65 145 L50 147 Z" fill="#fffcd0" opacity="0.95" />
                <rect x="47" y="133" width="4" height="15" rx="2" fill="rgba(255,255,200,0.5)" />

                {/* Taillight */}
                <path d="M315 129 L330 133 L330 147 L315 145 Z" fill="#ff2222" opacity="0.9" />
                <rect x="329" y="133" width="4" height="15" rx="2" fill="#ff0000" opacity="0.6" />

                {/* Front door handle */}
                <rect x="148" y="140" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
                {/* Rear door handle */}
                <rect x="222" y="140" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />

                {/* Roof highlight stripe */}
                <path d="M130 74 L250 74 L260 84 L124 84 Z" fill="rgba(255,255,255,0.1)" />

                {/* Side mirror */}
                <path d="M98 110 L90 108 L90 118 L100 118 Z" fill={mid} />
            </g>

            {/* Front wheel */}
            <circle cx="112" cy="168" r="26" fill="#111" />
            <circle cx="112" cy="168" r="19" fill="url(#wheelRim)" />
            <circle cx="112" cy="168" r="9" fill="#2a2a2a" />
            <circle cx="112" cy="168" r="4" fill="#999" />
            <line x1="112" y1="150" x2="112" y2="168" stroke="#666" strokeWidth="2.5" />
            <line x1="112" y1="168" x2="112" y2="186" stroke="#666" strokeWidth="2.5" />
            <line x1="94" y1="168" x2="130" y2="168" stroke="#666" strokeWidth="2.5" />
            <line x1="99" y1="155" x2="125" y2="181" stroke="#666" strokeWidth="2" />
            <line x1="125" y1="155" x2="99" y2="181" stroke="#666" strokeWidth="2" />

            {/* Rear wheel */}
            <circle cx="268" cy="168" r="26" fill="#111" />
            <circle cx="268" cy="168" r="19" fill="url(#wheelRim)" />
            <circle cx="268" cy="168" r="9" fill="#2a2a2a" />
            <circle cx="268" cy="168" r="4" fill="#999" />
            <line x1="268" y1="150" x2="268" y2="168" stroke="#666" strokeWidth="2.5" />
            <line x1="268" y1="168" x2="268" y2="186" stroke="#666" strokeWidth="2.5" />
            <line x1="250" y1="168" x2="286" y2="168" stroke="#666" strokeWidth="2.5" />
            <line x1="255" y1="155" x2="281" y2="181" stroke="#666" strokeWidth="2" />
            <line x1="281" y1="155" x2="255" y2="181" stroke="#666" strokeWidth="2" />
        </svg>
    )
}

export default CarIllustration
