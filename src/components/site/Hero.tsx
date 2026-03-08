import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page pt-5 pb-10 md:pt-10 md:pb-16">
        <div className="grid items-start gap-6 md:grid-cols-[1.02fr_0.98fr] md:gap-12">
          {/* Left */}
          <div className="max-w-2xl min-w-0">
            <h1 className="text-[26px] font-extrabold leading-[0.98] tracking-[-0.05em] text-black xs:text-[28px] sm:text-[34px] md:text-[60px]">
              รับทำเว็บไซต์ /
              <br />
              รับทำระบบ /
              <br />
              <span className="block sm:inline" style={{ color: "var(--bb-blue)" }}>
                Digital Marketing
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[14px] leading-[1.75] text-black/65 sm:text-[15px] md:mt-5 md:text-[19px]">
              เราสร้างเว็บที่ “ค้นหาเจอ” และ “ยิงแอดแล้วปิดการขายได้” พร้อม SEO,
              Content, Facebook Ads, TikTok Ads และการติดตั้ง Pixel / GA4 / GTM
              เพื่อวัดผลแบบมืออาชีพ
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-7 sm:max-w-[560px] sm:grid-cols-2">
              <Link href="/contact" className="btn-primary w-full">
                ขอใบเสนอราคา
              </Link>

              <Link href="/services" className="btn-outline w-full">
                ดูบริการทั้งหมด
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-3 max-w-[760px]">
              {[
                ["SEO", "พร้อมทำ SEO"],
                ["Ads", "ยิงแอด FB / TikTok"],
                ["Tracking", "Pixel + GA4"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/95 px-5 py-5 text-center shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md sm:h-[124px]"
                >
                  <div className="text-[18px] font-extrabold leading-none tracking-tight text-black sm:text-[20px]">
                    {title}
                  </div>

                  <div className="mt-2 text-sm leading-snug text-black/55">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative pt-0 md:pt-3">
            <div
              className="rounded-[28px] p-[1px] shadow-[0_18px_40px_rgba(15,23,32,0.06)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(47,111,179,0.22) 0%, rgba(47,111,179,0.08) 45%, rgba(15,23,32,0.05) 100%)",
              }}
            >
              <div className="rounded-[27px] bg-white/96 p-4 backdrop-blur-xl sm:p-5 md:p-6">
                <div className="text-sm font-medium text-black/45">
                  เราช่วยคุณได้แบบครบวงจร
                </div>

                <ul className="mt-4 grid gap-3 md:mt-5 md:gap-3.5">
                  {[
                    "เว็บไซต์บริษัท / Landing Page (SEO Ready)",
                    "ระบบหลังบ้าน Admin / Dashboard / API",
                    "ทำ SEO + Content ให้ติดคำค้น",
                    "ยิงแอด Facebook / TikTok + วาง Conversion",
                    "ติดตั้ง Pixel, GA4, GTM + Report ผลลัพธ์",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: "var(--bb-blue)" }}
                      />
                      <span className="text-[14px] leading-[1.6] text-black/80 sm:text-[15px] md:text-[16px]">
                        {x}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.018] p-4 md:mt-6">
                  <div className="text-sm text-black/45">เหมาะสำหรับธุรกิจที่ต้องการ</div>
                  <div className="mt-2 text-[15px] font-bold leading-snug sm:text-[16px] md:text-[18px]">
                    หาเจอใน Google + ยิงแอดแล้ววัดผลได้จริง
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -right-12 -top-10 hidden h-40 w-40 rounded-full blur-3xl md:block"
              style={{ background: "rgba(47,111,179,0.12)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}