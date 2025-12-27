"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/use-role";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/dashboard", label: "Candidate" },
  { href: "/employer", label: "Employer" },
  { href: "/admin/moderation", label: "Admin" },
  { href: "/style-guide", label: "Style" },
];

const roles: Array<{ value: "candidate" | "employer" | "admin"; label: string }> = [
  { value: "candidate", label: "Candidate" },
  { value: "employer", label: "Employer" },
  { value: "admin", label: "Admin" },
];

export function TopNav() {
  const pathname = usePathname();
  const { role, updateRole } = useRole();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 backdrop-blur-lg bg-background/90 shadow-sm">
      <div className="container-slim flex h-14 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-base font-semibold tracking-tight hover:text-accent transition-colors">
            AllJobsAreEqual
          </Link>
          <div className="hidden gap-3 text-sm text-muted sm:flex">
            <span className="h-4 w-px bg-border/70" aria-hidden />
            <span className="text-foreground/60 text-xs">Inclusive hiring, no fine print.</span>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition hover:bg-muted",
                  active && "bg-muted text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-border bg-card p-1 sm:flex">
            {roles.map((item) => (
              <button
                key={item.value}
                onClick={() => updateRole(item.value)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition",
                  role === item.value ? "bg-foreground text-background" : "text-foreground/70",
                )}
                aria-label={`Switch to ${item.label} view`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Button asChild size="sm" variant="accent">
            <Link href="/jobs">Browse roles</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
