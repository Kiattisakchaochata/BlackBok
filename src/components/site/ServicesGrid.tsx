import Link from "next/link";

const services = [
  {
    title: "ทำเว็บไซต์บริษัท",
    desc: "เว็บไซต์ภาพลักษณ์ + SEO + แชร์สวยบน Facebook",
  },
  {
    title: "Landing Page ยิงแอด",
    desc: "หน้าเดียวจบ เน้นเก็บ Leads และปิดการขาย",
  },
  {
    title: "ทำระบบหลังบ้าน",
    desc: "Admin, Dashboard, CRUD, Permissions และ Report",
  },
  {
    title: "Web App / SaaS",
    desc: "ระบบสมาชิก, จองคิว, ชำระเงิน และ Subscription",
  },
  {
    title: "SEO + Content",
    desc: "On-page SEO, Schema, Sitemap และบทความทำอันดับ",
  },
  {
    title: "Digital Marketing",
    desc: "Facebook Ads, TikTok Ads, Retargeting และ Strategy",
  },
];

export default function ServicesGrid() {
  return (
    <section className="container-page py-12 md:py-16">
      <div className="max-w-2xl">
        <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[38px]">
          ทำครบทั้งเว็บไซต์ ระบบ และการตลาด
        </h2>

        <p className="mt-4 text-[16px] leading-7 text-black/65 md:text-[17px]">
          เราวางโครงสร้างให้ครบตั้งแต่หน้าเว็บไซต์ ระบบหลังบ้าน ไปจนถึงการติดตั้ง
          Tracking และการทำการตลาดแบบวัดผลได้จริง
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <div
            key={item.title}
            className="group rounded-[26px] border border-black/8 bg-white/95 p-6 shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)"
                      : "linear-gradient(180deg, rgba(15,23,32,0.9) 0%, rgba(15,23,32,0.75) 100%)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[20px] font-extrabold tracking-tight text-black">
                {item.title}
              </h3>
            </div>

            <p className="mt-4 text-[15px] leading-7 text-black/60">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
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