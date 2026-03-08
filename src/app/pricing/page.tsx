import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "ราคา | The Black Bok",
  description:
    "แพ็กเกจบริการเว็บไซต์ ระบบ และ Digital Marketing สำหรับธุรกิจที่ต้องการเริ่มต้นอย่างมืออาชีพ",
  path: "/pricing",
  ogImage: "/opengraph-image",
});

const plans = [
  {
    name: "Starter",
    price: "เริ่มต้น 15,000+",
    desc: "เหมาะสำหรับธุรกิจที่ต้องการเว็บไซต์เริ่มต้นแบบดูดีและใช้งานได้จริง",
    items: ["เว็บไซต์บริษัท", "Responsive", "พื้นฐาน SEO", "แบบฟอร์มติดต่อ"],
  },
  {
    name: "Growth",
    price: "เริ่มต้น 35,000+",
    desc: "เหมาะสำหรับธุรกิจที่ต้องการเว็บ + Landing + Tracking เพื่อรองรับการตลาด",
    items: ["Landing Page", "Pixel / GA4 / GTM", "SEO พร้อมใช้งาน", "รองรับ Ads"],
  },
  {
    name: "Custom",
    price: "ประเมินตามโปรเจกต์",
    desc: "สำหรับระบบเฉพาะทางหรือธุรกิจที่ต้องการ workflow และฟีเจอร์เฉพาะ",
    items: ["Dashboard / Admin", "API / Integration", "Workflow ธุรกิจ", "ออกแบบตาม requirement"],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="เริ่มต้นโปรเจกต์ในงบที่เหมาะกับธุรกิจ"
        description="ราคาแต่ละโปรเจกต์ขึ้นอยู่กับขอบเขตงาน ฟีเจอร์ และระดับการวางระบบ แต่เราช่วยออกแบบ solution ที่เหมาะกับงบและเป้าหมายของธุรกิจคุณได้"
      />

      <section className="container-page pb-10 md:pb-12">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className="rounded-[26px] border border-black/8 bg-white/95 p-6 shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[24px] font-extrabold tracking-tight text-black">
                  {plan.name}
                </h2>
                {idx === 1 && (
                  <span className="rounded-full bg-[rgba(47,111,179,0.08)] px-3 py-1 text-xs font-bold text-[var(--bb-blue)]">
                    แนะนำ
                  </span>
                )}
              </div>

              <div className="mt-4 text-[22px] font-extrabold text-black">{plan.price}</div>

              <p className="mt-3 text-[15px] leading-7 text-black/60">{plan.desc}</p>

              <ul className="mt-5 grid gap-2 text-[15px] text-black/70">
                {plan.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <div className="mt-6">
                <Link href="/contact" className={idx === 1 ? "btn-primary" : "btn-outline"}>
                  ขอรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}