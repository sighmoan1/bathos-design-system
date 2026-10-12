import type { HTMLAttributes } from "react";

type NoticeProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title: string;
  tone?: "info" | "success" | "warning" | "danger";
};
export function Notice({
  title,
  tone = "info",
  className = "",
  children,
  ...props
}: NoticeProps) {
  return (
    <aside {...props} className={`notice notice--${tone} ${className}`.trim()}>
      <p className="notice__title">{title}</p>
      {children}
    </aside>
  );
}
