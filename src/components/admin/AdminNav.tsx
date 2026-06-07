"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  FileText,
  Image,
  LayoutDashboard,
  MessageSquareQuote,
  Tags,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
  { href: "/admin/autores", label: "Autores", icon: UserRound },
  { href: "/admin/midia", label: "Midia", icon: Image },
  { href: "/admin/frases", label: "Frases", icon: MessageSquareQuote },
  { href: "/admin/timeline", label: "Timeline", icon: CalendarDays },
  { href: "/admin/rankings", label: "Rankings", icon: BarChart3 },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-2 overflow-x-auto px-4 py-3 lg:grid lg:overflow-visible lg:px-3">
      {nav.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring flex min-w-max items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-[var(--wine)] text-white shadow-sm"
                : "text-[var(--ink-soft)] hover:bg-white hover:text-[var(--wine)]",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
