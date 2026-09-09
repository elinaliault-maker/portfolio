import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const variants = {
    primary: `bg-(--marine) text-(--light-gray)
        border-2 border-(--marine) shadow-(--shadow-marine-clair)
        hover:shadow-none hover:translate-x-1 hover:translate-y-1`,
    secondary: `bg-(--marine-clair) text-(--marine)
        border-2 border-(--marine-clair) shadow-(--shadow-marine)
        hover:shadow-none hover:translate-x-1 hover:translate-y-1`,
};
const textSizes = {
    normal: `px-5 py-1.5 text-xl`,
    small: `px-3 py-2 text-sm`
}

export function Button({
    text,
    icon: Icon = ArrowRight,
    variant = "primary",
    textSize = "normal",
    to,
    href,
    onClick,
    className = "",
    ...props
}) {
    const classes = `w-fit rounded-full
        flex items-center gap-2
        font-(family-name:--font-text) 
        ${textSizes[textSize]}
        transition-all duration-200 ease-out
        cursor-pointer
        ${variants[variant]} ${className}`;

    const content = (
        <>
            {Icon && <Icon size={18} />}
            {text}
        </>
    );

    // Internal route
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    // External link
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                {...props}
            >
                {content}
            </a>
        );
    }

    // Plain button (form submit, modal trigger, etc.)
    return (
        <button type="button" onClick={onClick} className={classes} {...props}>
            {content}
        </button>
    );
}