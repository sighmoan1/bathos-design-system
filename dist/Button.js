import { jsx as _jsx } from "react/jsx-runtime";
function classes(variant, className = "") {
    return `button button--${variant} ${className}`.trim();
}
export function Button({ variant = "secondary", className, type = "button", ...props }) {
    return (_jsx("button", { ...props, type: type, className: classes(variant, className) }));
}
export function ButtonLink({ variant = "secondary", className, ...props }) {
    return _jsx("a", { ...props, className: classes(variant, className) });
}
