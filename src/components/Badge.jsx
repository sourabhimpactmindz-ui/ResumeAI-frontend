export function Badge({
  children,
  variant = "default", // "default" | "status" | "success" | "warning" | "pill"
  pulsing = false,
  className = "",
  icon,
}) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1 text-xs font-heading font-medium rounded-full backdrop-blur-md transition-all";

  const variants = {
    default: "bg-c-800/80 text-c-100 border border-c-700/60 shadow-sm",
    status:
      "bg-c-800/90 text-c-100 border border-c-700 shadow-[0_4px_16px_rgba(127,181,154,0.15)]",
    success: "bg-c-success/15 text-c-success border border-c-success/30",
    warning: "bg-c-warning/15 text-c-warning border border-c-warning/30",
    error: "bg-c-error/15 text-c-error border border-c-error/30",
    pill: "bg-c-700/40 text-c-300 border border-c-600/40 hover:text-c-100 hover:border-c-300",
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {pulsing && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-c-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-c-success shadow-[0_0_8px_#7FB59A]" />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
