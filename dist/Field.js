import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Field({ id, label, help, error, className = "", "aria-describedby": describedBy, ...props }) {
    const description = [
        describedBy,
        help && `${id}-help`,
        error && `${id}-error`,
    ]
        .filter(Boolean)
        .join(" ");
    return (_jsxs("div", { className: "field", children: [_jsx("label", { className: "field__label", htmlFor: id, children: label }), help && (_jsx("p", { className: "field__help", id: `${id}-help`, children: help })), error && (_jsx("p", { className: "field__error", id: `${id}-error`, children: error })), _jsx("input", { ...props, id: id, "aria-describedby": description || undefined, "aria-invalid": error ? true : props["aria-invalid"], className: `field__input ${className}`.trim() })] }));
}
