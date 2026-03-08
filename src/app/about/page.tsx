import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";

export const metadata = buildMetadata({
  title: "เกี่ยวกับเรา | The Black Bok",
  description:
    "รู้จัก The Black Bok ทีมที่ช่วยออกแบบเว็บไซต์ ระบบ และ Digital Marketing ให้ธุรกิจดูดีและวัดผลได้จริง",
  path: "/about",
  ogImage: "/opengraph-image",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="ทีมที่ช่วยให้เว็บไซต์และระบบทำงานเพื่อธุรกิจจริง"
        description="เราเชื่อว่าเว็บไซต์ที่ดีไม่ควรเป็นแค่หน้าตาสวย แต่ควรช่วยสื่อสารคุณค่าของแบรนด์ ใช้งานง่าย วัดผลได้ และต่อยอดการเติบโตของธุรกิจได้จริง"
      />

      <section className="container-page pb-10 md:pb-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[26px] border border-black/8 bg-white/95 p-6 shadow-sm">
            <h2 className="text-[24px] font-extrabold tracking-tight text-black">
              แนวทางการทำงาน
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-black/65">
              เรามองทั้งฝั่งดีไซน์ โครงสร้าง SEO ระบบหลังบ้าน และการวัดผล
              เพื่อให้ทุกโปรเจกต์ใช้งานได้จริง ไม่ใช่แค่ดูดีในตอนเปิดตัว
            </p>
          </div>

          <div className="rounded-[26px] border border-black/8 bg-white/95 p-6 shadow-sm">
            <h2 className="text-[24px] font-extrabold tracking-tight text-black">
              สิ่งที่เราให้ความสำคัญ
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-black/65">
              ความชัดเจนของธุรกิจ ประสบการณ์ของผู้ใช้ ความยืดหยุ่นในการดูแลต่อ
              และระบบวัดผลที่ช่วยให้ตัดสินใจเชิงธุรกิจได้แม่นยำขึ้น
            </p>
          </div>
        </div>
      </section>
    </>
  );
}