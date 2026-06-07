import type { ReactNode } from "react";

type PublicPageHeaderProps = {
  title: string;
  description: string;
  meta?: string;
  icon?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
};

export function PublicPageHeader({
  title,
  description,
  meta,
  icon,
  align = "left",
  inverse = false,
}: PublicPageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={`border-b pb-7 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl"
      } ${inverse ? "border-white/14" : "border-[var(--line)]"}`}
    >
      {icon ? (
        <div
          className={`mb-5 inline-grid h-11 w-11 place-items-center rounded-md border ${
            inverse
              ? "border-white/14 bg-white/[0.06] text-[var(--rose)]"
              : "border-[var(--line)] bg-white text-[var(--wine)] shadow-sm"
          }`}
        >
          {icon}
        </div>
      ) : null}
      {meta ? (
        <p className={`public-label mb-3 ${inverse ? "text-white/58" : "text-[var(--wine)]"}`}>
          {meta}
        </p>
      ) : null}
      <h1
        className={`font-editorial text-[clamp(3.25rem,7vw,6.25rem)] leading-[0.92] ${
          inverse ? "text-white" : "text-[var(--ink)]"
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-5 max-w-2xl text-base leading-8 ${
          centered ? "mx-auto" : ""
        } ${inverse ? "text-white/72" : "text-[var(--ink-soft)]"}`}
      >
        {description}
      </p>
    </header>
  );
}
