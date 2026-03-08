import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";

export const metadata = buildMetadata({
  title: "ติดต่อ | The Black Bok",
  description:
    "ติดต่อ The Black Bok เพื่อขอใบเสนอราคา ปรึกษาเว็บไซต์ ระบบ หรือ Digital Marketing สำหรับธุรกิจของคุณ",
  path: "/contact",
  ogImage: "/opengraph-image",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="เล่าโปรเจกต์ของคุณให้เราฟัง"
        description="หากคุณกำลังวางแผนทำเว็บไซต์ ระบบหลังบ้าน Landing Page หรืออยากปรับโครงสร้างการตลาดออนไลน์ เรายินดีช่วยวางแนวทางที่เหมาะกับธุรกิจของคุณ"
      />

      <section className="container-page pb-10 md:pb-12">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-black/8 bg-white/95 p-6 shadow-sm md:p-8">
            <div className="max-w-xl">
              <h2 className="text-[24px] font-extrabold tracking-tight text-black">
                ขอใบเสนอราคาหรือปรึกษาโปรเจกต์
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-black/60">
                กรอกรายละเอียดเบื้องต้นไว้ได้เลย
                เราจะนำข้อมูลไปประเมินแนวทางและติดต่อกลับให้เร็วที่สุด
              </p>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-black/75">ชื่อ</label>
                <input
                  type="text"
                  placeholder="ชื่อของคุณ"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--bb-blue)] focus:ring-4 focus:ring-[rgba(47,111,179,0.08)]"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-black/75">เบอร์โทร</label>
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--bb-blue)] focus:ring-4 focus:ring-[rgba(47,111,179,0.08)]"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-black/75">อีเมล</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--bb-blue)] focus:ring-4 focus:ring-[rgba(47,111,179,0.08)]"
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-black/75">รายละเอียดโปรเจกต์</label>
                <textarea
                  placeholder="เล่าเป้าหมายของเว็บไซต์ / ระบบ / การตลาด ที่คุณต้องการ"
                  rows={6}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[var(--bb-blue)] focus:ring-4 focus:ring-[rgba(47,111,179,0.08)]"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button type="submit" className="btn-primary">
                  ส่งข้อความ
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-black/8 bg-white/95 p-6 shadow-sm md:p-8">
            <h2 className="text-[24px] font-extrabold tracking-tight text-black">
              ช่องทางติดต่อ
            </h2>

            <div className="mt-5 grid gap-4 text-[15px] text-black/65">
              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">อีเมล</div>
                <div className="mt-2 font-semibold text-black/85">contact@example.com</div>
              </div>

              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">โทรศัพท์</div>
                <div className="mt-2 font-semibold text-black/85">+66xxxxxxxxx</div>
              </div>

              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">ที่ตั้ง</div>
                <div className="mt-2 font-semibold text-black/85">Bangkok, Thailand</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}