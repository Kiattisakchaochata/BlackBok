const testimonials = [
  {
    quote:
      "โครงสร้างเว็บดูดีขึ้นมาก และทำให้การสื่อสารแบรนด์ชัดขึ้น ลูกค้าเข้าใจบริการเร็วขึ้น",
    name: "ลูกค้าธุรกิจบริการ",
    role: "Website + Branding",
  },
  {
    quote:
      "หลังจากปรับ Landing Page และวาง Tracking ใหม่ การยิงแอดเห็นผลและวัดผลได้ชัดเจนขึ้น",
    name: "เจ้าของธุรกิจ SME",
    role: "Ads + Tracking",
  },
  {
    quote:
      "สิ่งที่ชอบคือทีมมองทั้งภาพธุรกิจ ไม่ได้ทำแค่หน้าเว็บ แต่ช่วยคิดเรื่องการใช้งานจริงด้วย",
    name: "ผู้บริหารบริษัท",
    role: "System + UX",
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-8 md:py-10">
      <div className="max-w-2xl">
        <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[38px]">
          มุมมองที่สะท้อนคุณภาพงานของเรา
        </h2>

        <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
          เราเชื่อว่าผลงานที่ดีต้องช่วยให้ธุรกิจสื่อสารชัดขึ้น ใช้งานง่ายขึ้น และสร้างผลลัพธ์ได้จริง
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-[24px] border border-black/8 bg-white/95 p-6 shadow-sm"
          >
            <div className="text-[16px] leading-8 text-black/70">“{item.quote}”</div>

            <div className="mt-6 border-t border-black/5 pt-4">
              <div className="font-bold text-black">{item.name}</div>
              <div className="text-sm text-black/45">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}