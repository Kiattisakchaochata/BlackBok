import Link from "next/link";

export default function CTA() {
  return (
    <section className="container-page py-8 md:py-10">
      <div
        className="rounded-[28px] p-[1px] shadow-[0_18px_40px_rgba(15,23,32,0.06)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(47,111,179,0.22) 0%, rgba(47,111,179,0.08) 45%, rgba(15,23,32,0.05) 100%)",
        }}
      >
        <div className="rounded-[27px] bg-white/96 px-6 py-8 backdrop-blur-xl md:px-10 md:py-10">
          <div className="max-w-3xl">
            <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[40px]">
              พร้อมสร้างเว็บไซต์หรือระบบที่ช่วยให้ธุรกิจโตขึ้นหรือยัง
            </h2>

            <p className="mt-3 text-[16px] leading-7 text-black/65 md:text-[17px]">
              ไม่ว่าจะเป็นเว็บไซต์บริษัท Landing Page ระบบหลังบ้าน หรือการวาง Tracking
              เพื่อยิงแอดและวัดผล เราช่วยออกแบบให้ครบและเหมาะกับธุรกิจของคุณ
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              ขอใบเสนอราคา
            </Link>

            <Link href="/services" className="btn-outline">
              ดูบริการทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}