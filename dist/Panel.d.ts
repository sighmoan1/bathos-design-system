import type { HTMLAttributes } from "react";
type PanelProps = HTMLAttributes<HTMLElement> & {
    tone?: "default" | "muted" | "accent";
};
export declare function Panel({ tone, className, ...props }: PanelProps): import("react/jsx-runtime").JSX.Element;
export {};
