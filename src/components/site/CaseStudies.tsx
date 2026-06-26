import Link from "next/link";

const cases = [
  {
    title: "Landing Page ยิงแอด",
    tag: "Lead Generation",
    color: "from-blue-500 to-indigo-500",
    desc: "ออกแบบหน้า Landing + CTA + Tracking เพื่อให้เก็บ Lead ได้จริงและวัดผลได้ชัด",
  },
  {
    title: "เว็บไซต์บริษัท",
    tag: "Brand + SEO",
    color: "from-emerald-500 to-teal-500",
    desc: "วางภาพลักษณ์แบรนด์ พร้อมโครงสร้าง SEO ที่ช่วยให้ค้นหาเจอได้ง่ายขึ้น",
  },
  {
    title: "ระบบหลังบ้าน",
    tag: "Dashboard / Admin",
    color: "from-violet-500 to-purple-500",
    desc: "พัฒนาระบบจัดการข้อมูล รายงานผล และ Workflow ที่เหมาะกับธุรกิจจริง",
  },
];

export default function CaseStudies() {
  return (
    <section className="container-page pt-3 pb-3 md:pt-4 md:pb-4">
      <div className="max-w-2xl">
        <h2 className="text-[32px] font-extrabold tracking-[-0.03em] text-black md:text-[40px]">
          งานที่ช่วยให้ธุรกิจดูดีและขายได้จริง
        </h2>

        <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
          เราออกแบบทั้งประสบการณ์ผู้ใช้ ความน่าเชื่อถือของแบรนด์ และระบบวัดผล
          เพื่อให้เว็บไซต์ไม่ใช่แค่สวย แต่ใช้งานได้จริงและสร้างผลลัพธ์ได้
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {cases.map((item) => (
          <div
            key={item.title}
            className="group rounded-[24px] border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span
              className={`inline-flex rounded-full bg-gradient-to-r ${item.color} px-3 py-1 text-xs font-bold text-white`}
            >
              {item.tag}
            </span>

            <h3 className="mt-4 text-[22px] font-extrabold text-black">
              {item.title}
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-black/60">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Link href="/portfolio" className="btn-outline">
          ดูผลงานทั้งหมด
        </Link>
      </div>
    </section>
  );
}