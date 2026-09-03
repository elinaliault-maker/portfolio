export default function IndividualTag({text}) {
    const classes = `w-fit px-2 text-base sm:text-xl
        bg-(--marine-clair) text-(--marine)`;
    return (
        <p className={classes}>
            {text}
        </p>
    )
}