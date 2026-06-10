import '../styles/Badge.css';

export default function Badge({ label, variant = 'default' }) {
  const cls = ['badge', variant !== 'default' ? `badge--${variant}` : ''].join(' ').trim();
  return <span className={cls}>{label}</span>;
}