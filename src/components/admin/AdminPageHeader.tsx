export function AdminPageHeader({
  eyebrow = "Painel admin",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--wine)]">{eyebrow}</p>
        <h1 className="font-editorial mt-2 text-[clamp(3rem,6vw,4.75rem)] leading-[0.9]">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
