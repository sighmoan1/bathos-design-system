import type { HTMLAttributes } from "react";
type NoticeProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    title: string;
    tone?: "info" | "success" | "warning" | "danger";
};
export declare function Notice({ title, tone, className, children, ...props }: NoticeProps): import("react/jsx-runtime").JSX.Element;
export {};
