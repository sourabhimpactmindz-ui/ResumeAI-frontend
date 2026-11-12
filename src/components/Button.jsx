import "../styles/Button.css";

/**
 * variant: "primary" | "light" | "outline" | "ghost"
 * size:    "sm" | "md" | "lg"
 * loading: shows the spinner. If you don't pass it, the spinner follows `disabled`
 *          (same behaviour as before, so existing usage keeps working).
 */
export default function Button({
  label,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  className = "",
  disabled,
  loading,
  type = "button",
}) {
  const showSpinner = loading ?? disabled;

  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={showSpinner ? "true" : undefined}
    >
      {showSpinner && <span className="btn__spinner" aria-hidden="true" />}
      {icon && <span className="btn__icon">{icon}</span>}
      {label}
    </button>
  );
}