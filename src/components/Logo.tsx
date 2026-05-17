import clsx from "clsx";

export function WorkWiseLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)} aria-label="WorkWise Tools">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink text-white shadow-soft">
        <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
          <rect x="8" y="9" width="18" height="6" rx="2" fill="#2dd4bf" />
          <rect x="14" y="17" width="18" height="6" rx="2" fill="#ffffff" />
          <rect x="8" y="25" width="18" height="6" rx="2" fill="#f59e0b" />
          <path d="M27 10.5l2.1 4.1 4.4.7-3.2 3.1.8 4.4-4.1-2.1-4 2.1.8-4.4-3.2-3.1 4.4-.7L27 10.5z" fill="#ffffff" />
        </svg>
      </span>
      {compact ? null : (
        <span className="leading-none">
          <span className="block text-base font-bold text-ink">WorkWise</span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-brand">Tools</span>
        </span>
      )}
    </span>
  );
}
