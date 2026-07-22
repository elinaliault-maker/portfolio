export default function PageTitleWithIcons({text}) {
    return (
        <div className="relative inline-block mt-4 mb-8 px-16">
            <span 
                className="font-icon text-2xl text-(--bleu-clair) absolute top-5.5 left-8.5 animate-spin-slow"
                aria-hidden="true"
            >
                {"\uf003"}
            </span>
            <h1>
                {text}
            </h1>
            <span 
                className="font-icon text-2xl text-(--violet) absolute bottom-6 right-7 animate-spin-slow"
                style={{ animationDelay: '0.5s' }}
                aria-hidden="true"
            >
                {"\uf002"}
            </span>
        </div>
    )
}