export default function PageTitleWithIcons({text}) {
    return (
        <div className="relative inline-block mt-4 mb-8 px-16">
            <span 
                className="font-icon text-2xl text-(--bleu-clair) absolute top-[22px] left-[34px] animate-spin-slow"
                aria-hidden="true"
            >
                {"\uf003"}
            </span>
            <h1>
                {text}
            </h1>
            <span 
                className="font-icon text-2xl text-(--violet) absolute bottom-[24px] right-[28px] animate-spin-slow"
                style={{ animationDelay: '0.5s' }}
                aria-hidden="true"
            >
                {"\uf002"}
            </span>
        </div>
    )
}