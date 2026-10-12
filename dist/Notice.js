import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Notice({ title, tone = "info", className = "", children, ...props }) {
    return (_jsxs("aside", { ...props, className: `notice notice--${tone} ${className}`.trim(), children: [_jsx("p", { className: "notice__title", children: title }), children] }));
}
