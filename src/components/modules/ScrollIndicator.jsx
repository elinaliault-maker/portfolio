import { Mouse } from "lucide-react";

export function ScrollIndicator({ leftText, rightText }) {
    return (
        <div className="flex items-center justify-center gap-4 px-2
        font-(family-name:--font-text) text-sm text-(--marine)
        my-24">
            <span className="whitespace-nowrap">{leftText}</span>
            <span className="flex-1 h-px bg-(--marine-clair) max-w-32" />
            <Mouse size={20} className="shrink-0" />
            <span className="flex-1 h-px bg-(--marine-clair) max-w-32" />
            <span className="whitespace-nowrap">{rightText}</span>
        </div>
    );
}