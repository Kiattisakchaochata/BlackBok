import Link from "next/link";

const services = [
  {
    title: "ทำเว็บไซต์บริษัท",
    desc: "เว็บไซต์ภาพลักษณ์ + SEO + แชร์สวยบน Facebook",
    color: "from-blue-500 to-blue-600",
    soft: "rgba(59,130,246,0.10)",
    label: "Corporate Website",
  },
  {
    title: "Landing Page ยิงแอด",
    desc: "หน้าเดียวจบ เน้นเก็บ Leads และปิดการขาย",
    color: "from-emerald-500 to-teal-500",
    soft: "rgba(16,185,129,0.10)",
    label: "Lead Generation",
  },
  {
    title: "ทำระบบหลังบ้าน",
    desc: "Admin, Dashboard, CRUD, Permissions และ Report",
    color: "from-violet-500 to-indigo-500",
    soft: "rgba(124,58,237,0.10)",
    label: "Dashboard / Admin",
  },
  {
    title: "Web App / SaaS",
    desc: "ระบบสมาชิก, จองคิว, ชำระเงิน และ Subscription",
    color: "from-orange-500 to-amber-500",
    soft: "rgba(245,158,11,0.10)",
    label: "SaaS / Membership",
  },
  {
    title: "SEO + Content",
    desc: "On-page SEO, Schema, Sitemap และบทความทำอันดับ",
    color: "from-pink-500 to-rose-500",
    soft: "rgba(244,63,94,0.10)",
    label: "Organic Growth",
  },
  {
    title: "Digital Marketing",
    desc: "Facebook Ads, TikTok Ads, Retargeting และ Strategy",
    color: "from-cyan-500 to-blue-500",
    soft: "rgba(6,182,212,0.10)",
    label: "Performance Ads",
  },
];

export default function ServicesGrid() {
  return (
    <section className="container-page pt-6 pb-3 md:pt-8 md:pb-4">
      <div className="max-w-2xl">
        <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[36px]">
          ทำครบทั้งเว็บไซต์ ระบบ และการตลาด
        </h2>

        <p className="mt-2 text-[15px] leading-7 text-black/65 md:text-[16px]">
          เราวางโครงสร้างให้ครบตั้งแต่หน้าเว็บไซต์ ระบบหลังบ้าน ไปจนถึงการติดตั้ง
          Tracking และการทำการตลาดแบบวัดผลได้จริง
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
          >
            {/* top gradient line */}
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${item.color}`}
            />

            {/* glow */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-xl opacity-0 transition group-hover:opacity-100"
              style={{ background: item.soft }}
            />

            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-[15px] font-bold text-white`}
              >
                {index + 1}
              </div>

              <span
                className={`rounded-full bg-gradient-to-r ${item.color} px-2.5 py-1 text-[10px] font-semibold text-white`}
              >
                {item.label}
              </span>
            </div>

            <h3 className="mt-3 text-[18px] font-extrabold text-black">
              {item.title}
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-black/60">
              {item.desc}
            </p>

            <div className="mt-3 flex items-center gap-2 text-[12px] text-black/45">
              <span
                className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.color}`}
              />
              ใช้งานได้จริง
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/services" className="btn-primary">
          ดูบริการทั้งหมด
        </Link>

        <Link href="/contact" className="btn-outline">
          ปรึกษาโปรเจกต์
        </Link>
      </div>
    </section>
  );
}