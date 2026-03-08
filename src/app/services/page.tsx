import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";

export const metadata = buildMetadata({
  title: "บริการ | The Black Bok",
  description:
    "บริการรับทำเว็บไซต์ รับทำระบบ และ Digital Marketing พร้อม SEO, Ads, Tracking และระบบวัดผลครบวงจร",
  path: "/services",
  ogImage: "/opengraph-image",
});

const services = [
  {
    title: "ทำเว็บไซต์บริษัท",
    desc: "เว็บไซต์ภาพลักษณ์องค์กรที่ดูน่าเชื่อถือ พร้อมโครงสร้าง SEO และแชร์โซเชียลได้สวย",
  },
  {
    title: "Landing Page ยิงแอด",
    desc: "ออกแบบหน้า Landing ที่เน้น Conversion, เก็บ Leads และต่อยอดการขายได้จริง",
  },
  {
    title: "ทำระบบหลังบ้าน",
    desc: "Admin, Dashboard, CRUD, Permissions และ Workflow สำหรับธุรกิจที่ต้องการระบบเฉพาะ",
  },
  {
    title: "Web App / SaaS",
    desc: "ระบบสมาชิก จองคิว ชำระเงิน และ Subscription ที่พร้อมต่อยอดธุรกิจ",
  },
  {
    title: "SEO + Content",
    desc: "On-page SEO, Schema, Sitemap และบทความเพื่อทำอันดับใน Google",
  },
  {
    title: "Ads + Tracking",
    desc: "ยิงแอด Facebook / TikTok พร้อมติด Pixel, GA4, GTM เพื่อวัดผลชัดเจน",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="บริการที่ช่วยให้ธุรกิจดูดีและขายได้จริง"
        description="เราช่วยวางโครงสร้างตั้งแต่เว็บไซต์ ระบบหลังบ้าน ไปจนถึง SEO, Ads และ Tracking เพื่อให้ทุกอย่างเชื่อมกันและสร้างผลลัพธ์ได้จริง"
      />

      <section className="container-page pb-10 md:pb-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-black/8 bg-white/95 p-6 shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md"
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

                <h2 className="text-[20px] font-extrabold tracking-tight text-black">
                  {item.title}
                </h2>
              </div>

              <p className="mt-4 text-[15px] leading-7 text-black/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}