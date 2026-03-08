"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/site/Lightbox";
import type { PortfolioItem } from "@/data/portfolio";

const badgeMap: Record<PortfolioItem["category"], string> = {
  Landing: "Ads + Landing",
  Website: "Website + SEO",
  System: "System",
  Tracking: "Tracking",
};

export default function ProjectCard({
  item,
  index = 0,
}: {
  item: PortfolioItem;
  index?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="card overflow-hidden h-full flex flex-col hover:shadow-md transition">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-left w-full h-full flex flex-col"
          aria-label={`open ${item.title}`}
        >
          {/* Image */}
          <div className="relative w-full h-56 sm:h-52 lg:h-48 overflow-hidden border-b border-black/10 bg-black/5">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition duration-300 hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
              priority={index === 0}
            />

            <div className="absolute left-4 top-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-black/10 shadow-sm"
                style={{ background: "rgba(255,255,255,0.94)" }}
              >
                {badgeMap[item.category]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-extrabold leading-tight">{item.title}</h3>

            <p className="mt-3 text-black/70 leading-relaxed flex-1">
              {item.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs rounded-full px-3 py-1 border border-black/10"
                  style={{ background: "rgba(67,136,198,0.08)" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <span className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold transition hover:bg-black/5">
                คลิกดูรูปใหญ่
              </span>
            </div>
          </div>
        </button>
      </article>

      <Lightbox
        open={open}
        src={item.image}
        title={item.title}
        onClose={() => setOpen(false)}
      />
    </>
  );
}