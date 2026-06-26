import {
  DollarSign,
  Grid2x2,
  TabletSmartphone,
  Rocket,
} from "lucide-react";

const items = [
  {
    label: "Free",
    colorClass: "icon-blue",
    icon: DollarSign,
  },
  {
    label: "Four in one",
    colorClass: "icon-green",
    icon: Grid2x2,
  },
  {
    label: "Smaller size",
    colorClass: "icon-orange",
    icon: TabletSmartphone,
  },
  {
    label: "Start faster",
    colorClass: "icon-red",
    icon: Rocket,
  },
];

export default function ColorfulFeatures() {
  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="icon-feature">
              <div className={`icon-feature__circle ${item.colorClass}`}>
                <Icon size={28} strokeWidth={2.2} />
              </div>
              <div className="icon-feature__label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}