import type { ReactNode } from "react";

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
      <h2 className="font-editorial text-[clamp(2rem,3vw,2.8rem)] leading-[0.95] text-[var(--ink)]">
        {title}
      </h2>
      {action ? <div className="shrink-0 text-sm">{action}</div> : null}
    </div>
  );
}
