"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/seo";
import { useEffect, useRef, useState } from "react";

const nav = [
  { href: "/", label: "หน้าแรก" },
  { href: "/services", label: "บริการ" },
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/pricing", label: "ราคา" },
  { href: "/blog", label: "บทความ" },
  { href: "/contact", label: "ติดต่อ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-black/5 bg-white/95 shadow-[0_6px_20px_rgba(15,23,32,0.04)] backdrop-blur-xl">
      <div className="container-page flex h-[74px] items-center justify-between gap-2 md:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 md:flex-none">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white font-extrabold shadow-sm"
            style={{
              background:
                "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)",
            }}
          >
            B
          </span>

          <div className="min-w-0 max-w-[148px] leading-tight sm:max-w-[190px] md:max-w-none">
            <div className="truncate text-[13px] font-extrabold tracking-tight sm:text-[14px] md:text-[16px]">
              {SITE.name}
            </div>
            <div className="line-clamp-2 text-[11px] text-black/50 sm:text-xs md:line-clamp-1">
              {SITE.description}
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  color: active ? "white" : "rgba(15,23,32,0.82)",
                  background: active
                    ? "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)"
                    : "transparent",
                  boxShadow: active
                    ? "0 10px 24px rgba(47,111,179,0.18)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "var(--bb-blue-soft)";
                    e.currentTarget.style.color = "var(--bb-blue)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(15,23,32,0.82)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/contact" className="btn-primary hidden lg:inline-flex px-6 py-3.5">
            ขอใบเสนอราคา
          </Link>

          <div className="md:hidden">
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="close mobile menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[95] bg-black/10 backdrop-blur-[1px]"
        />
      )}

      <div ref={wrapRef} className="relative z-[110]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold shadow-sm"
          aria-expanded={open}
          aria-label="toggle mobile menu"
        >
          เมนู
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-[220px] rounded-2xl border border-black/10 bg-white/95 p-2 shadow-xl backdrop-blur-xl">
            {nav.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold transition"
                  style={{
                    background: active ? "var(--bb-blue-soft)" : "transparent",
                    color: active ? "var(--bb-blue)" : "rgba(15,23,32,0.84)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 px-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}