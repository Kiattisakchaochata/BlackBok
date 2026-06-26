const testimonials = [
  {
    quote:
      "โครงสร้างเว็บดูดีขึ้นมาก และทำให้การสื่อสารแบรนด์ชัดขึ้น ลูกค้าเข้าใจบริการเร็วขึ้น",
    name: "ลูกค้าธุรกิจบริการ",
    role: "Website + Branding",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    quote:
      "หลังจากปรับ Landing Page และวาง Tracking ใหม่ การยิงแอดเห็นผลและวัดผลได้ชัดเจนขึ้น",
    name: "เจ้าของธุรกิจ SME",
    role: "Ads + Tracking",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    quote:
      "สิ่งที่ชอบคือทีมมองทั้งภาพธุรกิจ ไม่ได้ทำแค่หน้าเว็บ แต่ช่วยคิดเรื่องการใช้งานจริงด้วย",
    name: "ผู้บริหารบริษัท",
    role: "System + UX",
    accent: "from-emerald-500 to-teal-400",
  },
];

export default function Testimonials() {
  return (
    <section className="container-page pt-3 pb-4 md:pt-4 md:pb-5">
      <div className="max-w-2xl">
        <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[38px]">
          มุมมองที่สะท้อนคุณภาพงานของเรา
        </h2>

        <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
          เราเชื่อว่าผลงานที่ดีต้องช่วยให้ธุรกิจสื่อสารชัดขึ้น ใช้งานง่ายขึ้น และสร้างผลลัพธ์ได้จริง
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="group relative overflow-hidden rounded-[28px] border border-black/6 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-[4px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
            />

            <div className="pointer-events-none absolute right-4 top-3 hidden text-[56px] font-extrabold leading-none tracking-[-0.08em] text-black/[0.03] md:block">
              ”
            </div>

            <div className="relative">
              <div className="pr-0 text-[17px] leading-8 text-black/72 md:pr-8">
                “{item.quote}”
              </div>

              <div className="mt-6 border-t border-black/6 pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${item.accent} shadow-sm`}
                  />

                  <div>
                    <div className="text-[18px] font-extrabold tracking-tight text-black">
                      {item.name}
                    </div>
                    <div className="text-sm font-medium text-black/45">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}