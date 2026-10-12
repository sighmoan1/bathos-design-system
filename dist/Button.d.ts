import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
type Variant = "primary" | "secondary" | "quiet" | "danger";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};
export declare function Button({ variant, className, type, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
};
export declare function ButtonLink({ variant, className, ...props }: ButtonLinkProps): import("react/jsx-runtime").JSX.Element;
export {};
