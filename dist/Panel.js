import { jsx as _jsx } from "react/jsx-runtime";
export function Panel({ tone = "default", className = "", ...props }) {
    return (_jsx("article", { ...props, className: `panel panel--${tone} ${className}`.trim() }));
}
