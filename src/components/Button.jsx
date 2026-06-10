import '../styles/Button.css';

export default function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  className = '',
  disabled
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && (
        <span className="btn__spinner" />
      )}
      {icon && <span className="btn__icon">{icon}</span>}
      {label}
    </button>
  );
}