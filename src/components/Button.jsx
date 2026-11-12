import { forwardRef } from "react";
import { Link } from "react-router-dom";

export const Button = forwardRef(function Button(
  {
    children,
    to,
    href,
    variant = "primary", // "primary" | "secondary" | "ghost" | "danger"
    size = "md", // "sm" | "md" | "lg"
    className = "",
    icon,
    disabled = false,
    onClick,
    type = "button",
    ...props
  },
  ref
) {
  const baseClasses =
    "inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-300 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-c-100 text-c-900 border border-transparent shadow-[0_8px_24px_-4px_rgba(204,208,207,0.25)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-4px_rgba(204,208,207,0.4)] active:translate-y-0",
    secondary:
      "bg-transparent text-c-100 border border-c-600 hover:border-c-300 hover:bg-c-700/40 hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-c-300 hover:text-c-100 hover:bg-c-800/60 active:translate-y-0",
    danger:
      "bg-c-error/20 text-c-error border border-c-error/40 hover:bg-c-error/30 hover:-translate-y-0.5 active:translate-y-0",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
    variantClasses[variant] || variantClasses.primary
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} ref={ref} {...props}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} ref={ref} {...props}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

export default Button;
