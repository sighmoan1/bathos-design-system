import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "quiet" | "danger";
function classes(variant: Variant, className = "") {
  return `button button--${variant} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};
export function Button({
  variant = "secondary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={classes(variant, className)} />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };
export function ButtonLink({
  variant = "secondary",
  className,
  ...props
}: ButtonLinkProps) {
  return <a {...props} className={classes(variant, className)} />;
}
