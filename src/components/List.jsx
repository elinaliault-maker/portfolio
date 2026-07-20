function ListSimple({text}) {
    return (
        <div className="flex items-baseline gap-1.5 text-left text-sm text-(--text)">
                <span 
                    className="font-icon shrink-0  text-[0.5rem]
                    group-hover:text-(--violet) group-hover:translate-x-0.5 transition-all duration-300"
                    aria-hidden="true"
                >
                    {"\uf000"} {/* unicode arrow */}
                </span>
                
                <p>
                    {text}
                </p>
        </div>
    )
}

export default function List({textArray}) {
   return (
        <div className="group flex flex-col gap-0.75">
            {textArray.map((textList, i) => (
                <ListSimple text={textList} key={i} />
            ))}
        </div>
   )
}