function LogoIcon() {
    return (

        <svg xmlns="http://www.w3.org/2000/svg"
            width="150" height="50" viewBox="0 0 350 100"
            role="img" aria-labelledby="title desc">
            <title id="title">ጤናtech</title>
            <desc id="desc">Healthcare technology logo with an open book,
                medical cross and search symbol.</desc>

            <defs>
                <linearGradient id="health" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#12B8A6" />
                    <stop offset="100%" stopColor="#087A91" />
                </linearGradient>
            </defs>

            <path d="M12 26 Q35 16 57 31 Q79 16 102 26
           L102 83 Q79 72 57 88 Q35 72 12 83 Z"
                fill="url(#health)" />

            <path d="M57 31 V88"
                stroke="#FFFFFF" strokeWidth="3" fill="none" />

            <g fill="none" stroke="#D9FFFA"
                strokeWidth="3" strokeLinecap="round">
                <path d="M23 40 Q38 36 48 44" />
                <path d="M23 51 Q38 47 48 55" />
                <path d="M66 44 Q79 36 91 40" />
                <path d="M66 55 Q79 47 91 51" />
            </g>

            <circle cx="82" cy="76" r="19"
                fill="#FFFFFF" stroke="#087A91" strokeWidth="5" />
            <path d="M82 66 V86 M72 76 H92"
                stroke="#12B8A6" strokeWidth="5"
                strokeLinecap="round" />
            <path d="M96 90 L108 102"
                stroke="#087A91" strokeWidth="6"
                strokeLinecap="round" />

            <text x="128" y="73"
                fontFamily="Noto Sans Ethiopic, sans-serif"
                fontSize="53" fontWeight="700"
                fill="#087A91">ጤና<tspan fill="#12A99A"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700">tech</tspan></text>
            <text x="131" y="96"
                fontFamily="Arial, sans-serif"
                fontSize="11" letterSpacing="2"
                fill="#526C77">KNOW MEDICINE. LIVE HEALTHIER.</text>
        </svg>

    )
}

export default LogoIcon