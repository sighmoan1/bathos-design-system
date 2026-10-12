import type { InputHTMLAttributes } from "react";
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    help?: string;
    error?: string;
};
export declare function Field({ id, label, help, error, className, "aria-describedby": describedBy, ...props }: FieldProps): import("react/jsx-runtime").JSX.Element;
export {};
