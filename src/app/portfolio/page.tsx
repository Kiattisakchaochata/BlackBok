"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/site/PageHero";
import { PORTFOLIO } from "@/data/portfolio";
import ProjectCard from "@/components/site/ProjectCard";

const filters = ["All", "Landing", "Website", "System", "Tracking"] as const;
type FilterType = (typeof filters)[number];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return PORTFOLIO;
    return PORTFOLIO.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <PageHero
  title="ตัวอย่างงานที่ออกแบบเพื่อผลลัพธ์"
  description="งานของเราเน้นทั้งภาพลักษณ์ ความน่าเชื่อถือ การใช้งานจริง และการวัดผล เพื่อให้เว็บไซต์หรือระบบช่วยธุรกิจได้จริง"
/>

      <section className="container-page pb-10 md:pb-12">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="rounded-2xl px-4 py-2 text-sm font-semibold transition"
                style={{
                  background: active ? "var(--bb-blue)" : "white",
                  color: active ? "white" : "rgba(15,23,32,0.82)",
                  border: active ? "1px solid var(--bb-blue)" : "1px solid rgba(15,23,32,0.1)",
                  boxShadow: active ? "0 10px 24px rgba(47,111,179,0.18)" : "none",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-5 text-sm text-black/45">
          แสดงทั้งหมด {filteredItems.length} รายการ
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <ProjectCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </section>
    </>
  );
}