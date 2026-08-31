function ListSimple({text}) {
    return (
        <div className="flex items-baseline gap-1.5 text-left text-sm text-(--marine)">
                <span 
                    className="shrink-0  text-[0.75rem]"
                    aria-hidden="true"
                >
                    ✽
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