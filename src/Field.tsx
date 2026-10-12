import type { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  help?: string;
  error?: string;
};
export function Field({
  id,
  label,
  help,
  error,
  className = "",
  "aria-describedby": describedBy,
  ...props
}: FieldProps) {
  const description = [
    describedBy,
    help && `${id}-help`,
    error && `${id}-error`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {help && (
        <p className="field__help" id={`${id}-help`}>
          {help}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
      <input
        {...props}
        id={id}
        aria-describedby={description || undefined}
        aria-invalid={error ? true : props["aria-invalid"]}
        className={`field__input ${className}`.trim()}
      />
    </div>
  );
}
