import Header from "./Header";

export default function SectionTop({ pageIsLight }) {
    // const bgClass = pageIsLight ? "bg-[url(/texture/paper-blue.png)]" : "bg-[url(/texture/paper-light-gray.png)]" ;
    const bgUrl = pageIsLight ? "/texture/paper-purple.png" : "/texture/paper-light-gray.png" ;
    return (
        <section 
            className="relative w-full"
            // className={`${!bgClass} text-(--light-text)
            // flex flex-col items-center w-full`}
        >
            <div
                className="relative h-fit pb-40 overflow-hidden
                text-(--light-text)
                flex flex-col items-center"
                style={{ clipPath: 'url(#hero-curve)' }}
            >
                <img src={bgUrl} className="absolute inset-0 w-full h-full object-cover -z-1000" />
                <Header isLight={!pageIsLight} />
                <h1 className={`${pageIsLight ? "text-(--light-text)" : "text-(--dark-text)"}
                mt-10`}>Top of page</h1>
                <p className={`${pageIsLight ? "text-(--light-text)" : "text-(--dark-text)"}
                mt-10`}>Details</p>
            </div>
            {/* SVG defining the clip path shape, rendered but invisible */}
            <svg width="0" height="0">
                <defs>
                <clipPath id="hero-curve" clipPathUnits="objectBoundingBox">
                    <path d="M0,0 L1,0 L1,0.7 Q0.5,1 0,0.7 Z" />
                </clipPath>
                </defs>
            </svg>
        </section>
    )
}