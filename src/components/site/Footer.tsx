import Link from "next/link";
import { SITE } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="container-page py-6 md:py-10">
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-[1.2fr_0.72fr_0.95fr] md:items-start md:gap-8 md:text-left">
          {/* Brand */}
          <div className="max-w-xl mx-auto md:mx-0 md:max-w-none">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white font-extrabold shadow-sm"
                style={{
                  background:
                    "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)",
                }}
              >
                B
              </span>

              <div className="min-w-0">
                <div className="text-[17px] font-extrabold tracking-tight md:text-[18px]">
                  {SITE.name}
                </div>
                <div className="text-sm text-black/50">{SITE.tagline}</div>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-7 text-black/65 md:mx-0 md:text-[15px]">
              รับทำเว็บไซต์ / รับทำระบบ / Digital Marketing แบบ Full Funnel
              พร้อมวางโครงสร้าง SEO, ยิงแอด และติดตั้งระบบวัดผลแบบมืออาชีพ
            </p>

            <div className="mt-4 text-sm text-black/45">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </div>
          </div>

          {/* Menu */}
          <div>
            <div className="text-sm font-bold tracking-wide text-black/85">เมนู</div>

            <div className="mt-4 grid gap-3">
              {[
                { href: "/services", label: "บริการ" },
                { href: "/portfolio", label: "ผลงาน" },
                { href: "/blog", label: "บทความ" },
                { href: "/pricing", label: "ราคา" },
                { href: "/contact", label: "ติดต่อ" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-black/65 transition hover:text-[var(--bb-blue)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-bold tracking-wide text-black/85">ติดต่อ</div>

            <div className="mt-4 grid gap-3 text-[14px] text-black/65 md:text-[15px]">
              <div>
                <span className="font-semibold text-black/85">อีเมล:</span> {SITE.email}
              </div>
              <div>
                <span className="font-semibold text-black/85">โทร:</span> {SITE.phone}
              </div>
              <div>
                <span className="font-semibold text-black/85">ที่ตั้ง:</span> {SITE.address}
              </div>
            </div>

            <div className="mt-5 flex justify-center md:justify-start">
              <Link
                href="/contact"
                className="btn-primary min-h-[46px] px-5 text-[14px] md:min-h-[52px] md:px-6 md:text-[15px]"
              >
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5">
        <div className="container-page py-3 text-center text-sm text-black/45 md:flex md:items-center md:justify-between md:text-left">
          <div className="leading-6">
            SEO • Facebook Ads • TikTok Ads • Tracking • Web / System
          </div>
          <div className="mt-1 md:mt-0">{SITE.description}</div>
        </div>
      </div>
    </footer>
  );
}