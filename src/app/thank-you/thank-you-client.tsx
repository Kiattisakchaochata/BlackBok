"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ThankYouClient() {
  useEffect(() => {
    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    // TikTok Pixel
    if (typeof window !== "undefined" && (window as any).ttq) {
      (window as any).ttq.track("SubmitForm");
    }

    // GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", { method: "contact_form" });
    }
  }, []);

  return (
    <div className="rounded-3xl border border-black/10 p-6 bg-white">
      <div className="font-bold">แนะนำต่อ</div>
      <div className="mt-2 text-black/70">
        ถ้ามีรายละเอียดเพิ่มเติม สามารถส่งเพิ่มได้เลย หรือดูบริการทั้งหมดของเรา
      </div>

      <div className="mt-5 flex gap-3 flex-wrap">
        <Link href="/services" className="btn-outline">
          ดูบริการ
        </Link>
        <Link href="/contact" className="btn-primary">
          ส่งรายละเอียดเพิ่ม
        </Link>
      </div>
    </div>
  );
}