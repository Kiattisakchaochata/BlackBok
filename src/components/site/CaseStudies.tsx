import Link from "next/link";

const cases = [
  {
    title: "Landing Page ยิงแอด",
    tag: "Lead Generation",
    desc: "ออกแบบหน้า Landing + CTA + Tracking เพื่อให้เก็บ Lead ได้จริงและวัดผลได้ชัด",
  },
  {
    title: "เว็บไซต์บริษัท",
    tag: "Brand + SEO",
    desc: "วางภาพลักษณ์แบรนด์ พร้อมโครงสร้าง SEO ที่ช่วยให้ค้นหาเจอได้ง่ายขึ้น",
  },
  {
    title: "ระบบหลังบ้าน",
    tag: "Dashboard / Admin",
    desc: "พัฒนาระบบจัดการข้อมูล รายงานผล และ Workflow ที่เหมาะกับธุรกิจจริง",
  },
];

export default function CaseStudies() {
  return (
    <section className="container-page py-8 md:py-10">
      <div className="max-w-2xl">
        <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[38px]">
          งานที่ช่วยให้ธุรกิจดูดีและขายได้จริง
        </h2>

        <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
          เราออกแบบทั้งประสบการณ์ผู้ใช้ ความน่าเชื่อถือของแบรนด์ และระบบวัดผล
          เพื่อให้เว็บไซต์ไม่ใช่แค่สวย แต่ใช้งานได้จริงและสร้างผลลัพธ์ได้
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {cases.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-black/8 bg-white/95 p-6 shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md"
          >
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background:
                  index % 2 === 0
                    ? "rgba(47,111,179,0.08)"
                    : "rgba(15,23,32,0.06)",
                color: index % 2 === 0 ? "var(--bb-blue)" : "rgba(15,23,32,0.78)",
              }}
            >
              {item.tag}
            </span>

            <h3 className="mt-4 text-[22px] font-extrabold tracking-tight text-black">
              {item.title}
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-black/60">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/portfolio" className="btn-outline">
          ดูผลงานทั้งหมด
        </Link>
      </div>
    </section>
  );
}