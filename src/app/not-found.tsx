import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 text-sm"
          style={{ background: "rgba(67,136,198,0.08)" }}
        >
          404 • ไม่พบหน้านี้
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
          ขออภัยครับ ไม่พบหน้าที่คุณต้องการ
        </h1>

        <p className="mt-3 text-black/70">
          ลองกลับไปหน้าแรก หรือดูบริการ/บทความเพื่อหาสิ่งที่ต้องการได้เลย
        </p>

        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/" className="btn-primary">กลับหน้าแรก</Link>
          <Link href="/services" className="btn-outline">ดูบริการ</Link>
          <Link href="/blog" className="btn-outline">อ่านบทความ</Link>
        </div>
      </div>
    </section>
  );
}