import Link from "next/link";
import { Search, Megaphone, BarChart3, Sparkles, TrendingUp } from "lucide-react";

const features = [
  {
    title: "SEO",
    desc: "พร้อมทำ SEO",
    circleClass: "icon-blue",
    Icon: Search,
  },
  {
    title: "Ads",
    desc: "ยิงแอด FB / TikTok",
    circleClass: "icon-green",
    Icon: Megaphone,
  },
  {
    title: "Tracking",
    desc: "Pixel + GA4",
    circleClass: "icon-orange",
    Icon: BarChart3,
  },
];

const serviceItems = [
  "เว็บไซต์บริษัท / Landing Page (SEO Ready)",
  "ระบบหลังบ้าน Admin / Dashboard / API",
  "ทำ SEO + Content ให้ติดคำค้น",
  "ยิงแอด Facebook / TikTok + วาง Conversion",
  "ติดตั้ง Pixel, GA4, GTM + Report ผลลัพธ์",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] opacity-70 md:h-[320px]"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.10) 0%, transparent 28%), radial-gradient(circle at 85% 10%, rgba(124,58,237,0.08) 0%, transparent 24%)",
        }}
      />

      <div className="container-page relative pt-6 pb-8 md:pt-10 md:pb-10">
        <div className="grid items-start gap-8 md:grid-cols-[1.02fr_0.98fr] md:gap-8">
          {/* Left */}
          <div className="max-w-2xl min-w-0">
            <h1 className="text-[28px] font-extrabold leading-[1.02] tracking-[-0.04em] text-black sm:text-[40px] md:text-[56px]">
              เว็บไซต์ ระบบ และ
              <br />
              <span style={{ color: "var(--bb-blue)" }}>Digital Marketing</span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-[1.72] text-black/65 sm:text-[16px] md:text-[18px]">
              เราช่วยออกแบบเว็บไซต์ ระบบหลังบ้าน และการตลาดดิจิทัลแบบครบวงจร
              เพื่อให้ธุรกิจของคุณดูน่าเชื่อถือ ค้นหาเจอ ปิดการขายดีขึ้น
              และวัดผลได้จริงผ่าน SEO, Ads, Pixel, GA4 และ Dashboard
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:max-w-[430px] sm:flex-row">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                ขอใบเสนอราคา
              </Link>

              <Link href="/portfolio" className="btn-outline w-full sm:w-auto">
                ดูผลงาน
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-black/50 sm:text-[14px]">
              <span>SEO Ready</span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
              <span>Ads + Tracking</span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
              <span>Admin / Dashboard</span>
            </div>

            <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-5 sm:gap-x-8">
              {features.map(({ title, desc, circleClass, Icon }) => (
                <div key={title} className="icon-feature min-w-[84px]">
                  <div className={`icon-feature__circle ${circleClass}`}>
                    <Icon size={28} strokeWidth={2.2} />
                  </div>

                  <div className="text-[16px] font-extrabold tracking-tight text-black">
                    {title}
                  </div>

                  <div className="icon-feature__label !not-italic text-black/55">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative pt-0 md:pt-1">
            <div
              className="rounded-[28px] p-[1px] shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.10) 42%, rgba(124,58,237,0.10) 100%)",
              }}
            >
              <div className="rounded-[27px] bg-white/96 p-4 backdrop-blur-xl sm:p-5 md:p-6">
                <div className="flex flex-col gap-1.5">
                  <div className="text-sm font-semibold text-black/40">
                    เราช่วยคุณได้แบบครบวงจร
                  </div>
                  <div className="text-[21px] font-extrabold tracking-tight text-black md:text-[25px]">
                    Website + System + Growth
                  </div>
                </div>

                <ul className="mt-5 grid gap-3">
                  {serviceItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: "var(--bb-blue)" }}
                      />
                      <span className="text-[15px] leading-[1.58] text-black/78 md:text-[16px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {/* Card 1 */}
                  <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />

                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-sm">
                      <Sparkles size={18} strokeWidth={2.4} />
                    </div>

                    <div className="text-[12px] font-semibold uppercase tracking-wide text-blue-600/80">
                      เหมาะสำหรับ
                    </div>

                    <div className="mt-2 text-[15px] font-bold leading-snug text-black md:text-[16px]">
                      ธุรกิจที่อยากมีภาพลักษณ์และระบบที่พร้อมโต
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />

                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-sm">
                      <TrendingUp size={18} strokeWidth={2.4} />
                    </div>

                    <div className="text-[12px] font-semibold uppercase tracking-wide text-violet-600/80">
                      จุดเด่น
                    </div>

                    <div className="mt-2 text-[15px] font-bold leading-snug text-black md:text-[16px]">
                      หาเจอใน Google ยิงแอดได้ และวัดผลได้จริง
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -right-8 -top-8 hidden h-32 w-32 rounded-full blur-3xl md:block"
              style={{ background: "rgba(59,130,246,0.10)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}