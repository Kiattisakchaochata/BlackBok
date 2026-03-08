import { buildMetadata } from "@/lib/seo";
import ThankYouClient from "./thank-you-client";

export const metadata = buildMetadata({
  title: "ส่งข้อมูลสำเร็จ | The Black Bok",
  description: "ขอบคุณสำหรับการติดต่อ ทีมงานจะติดต่อกลับโดยเร็ว",
  path: "/thank-you",
  ogImage: "/opengraph-image",
});

export default function ThankYouPage() {
  return (
    <section className="container-page page-section">
      <h1 className="text-4xl font-extrabold tracking-tight">ขอบคุณครับ ✅</h1>
      <p className="mt-3 text-black/70">เราได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็ว</p>

      <div className="mt-8">
        <ThankYouClient />
      </div>
    </section>
  );
}