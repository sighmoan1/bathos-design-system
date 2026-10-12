import type { HTMLAttributes } from "react";

type PanelProps = HTMLAttributes<HTMLElement> & {
  tone?: "default" | "muted" | "accent";
};
export function Panel({
  tone = "default",
  className = "",
  ...props
}: PanelProps) {
  return (
    <article
      {...props}
      className={`panel panel--${tone} ${className}`.trim()}
    />
  );
}
