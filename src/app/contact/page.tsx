import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";

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

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="rounded-[28px] border border-black/8 bg-white/95 p-6 shadow-sm md:p-8">
            <h2 className="text-[24px] font-extrabold tracking-tight text-black">
              ช่องทางติดต่อ
            </h2>

            <div className="mt-5 grid gap-4 text-[15px] text-black/65">
              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">อีเมล</div>
                <div className="mt-2 font-semibold text-black/85">
                  ck.complete@gmail.com
                </div>
              </div>

              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">โทรศัพท์</div>
                <div className="mt-2 font-semibold text-black/85">
                  +66657151099
                </div>
              </div>

              <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-4">
                <div className="text-sm font-semibold text-black/45">ที่ตั้ง</div>
                <div className="mt-2 font-semibold text-black/85">
                  Bangkok, Thailand
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}