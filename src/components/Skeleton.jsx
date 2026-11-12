export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-c-800/80 border border-c-700/40 ${className}`}
    />
  );
}

export function EmptyState({
  icon,
  title = "No scans yet",
  description = "Upload your resume against a target job to generate your first ATS diagnostic.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-[32px] bg-c-800/40 border border-c-700/50 backdrop-blur-xl max-w-lg mx-auto">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-c-700/50 border border-c-600/50 flex items-center justify-center text-c-100 mb-4 shadow-[0_0_20px_rgba(155,168,171,0.1)]">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-bold text-xl text-c-100 mb-2">{title}</h3>
      <p className="text-sm text-c-300 font-sans max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  );
}

export default Skeleton;

