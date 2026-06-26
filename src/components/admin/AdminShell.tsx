"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <main className="h-dvh overflow-hidden bg-[#eef4ff]">
      <div className="grid h-dvh md:grid-cols-[260px_1fr]">
        <aside className="hidden h-dvh border-r border-black/6 bg-white/95 px-5 py-6 shadow-sm md:flex md:flex-col">
          <Brand />

          <nav className="mt-8 grid gap-2">
            <AdminLink href="/admin/dashboard" label="Dashboard" />
            <AdminLink href="/admin/leads" label="Leads" />
            <AdminLink href="/" label="กลับหน้าเว็บ" />
          </nav>

          <div className="mt-auto">
            <LogoutButton />
          </div>
        </aside>

        <section className="h-dvh min-w-0 overflow-y-auto px-4 pb-28 pt-4 md:px-8 md:py-8 lg:px-10">
          <div className="sticky top-0 z-30 mb-5 rounded-3xl border border-black/6 bg-white/90 p-3 shadow-sm backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3">
              <Brand />
              <LogoutButton compact />
            </div>
          </div>

          {children}
        </section>

        <div className="fixed inset-x-3 bottom-3 z-50 rounded-[22px] border border-black/8 bg-white/95 p-2 shadow-[0_14px_40px_rgba(15,23,42,0.14)] backdrop-blur md:hidden">
          <div className="grid grid-cols-3 gap-2">
            <MobileLink href="/admin/dashboard" label="Dashboard" />
            <MobileLink href="/admin/leads" label="Leads" />
            <MobileLink href="/" label="หน้าเว็บ" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--bb-blue)] text-base font-extrabold text-white shadow">
        B
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-extrabold text-black">
          The Black Bok
        </div>
        <div className="truncate text-xs text-black/45">Admin CRM</div>
      </div>
    </div>
  );
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl px-4 py-3 text-sm font-bold text-black/65 transition hover:bg-blue-50 hover:text-[var(--bb-blue)]"
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center justify-center rounded-2xl text-xs font-extrabold text-black/60 transition hover:bg-blue-50 hover:text-[var(--bb-blue)]"
    >
      {label}
    </Link>
  );
}