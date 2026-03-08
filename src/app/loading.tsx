export default function Loading() {
  return (
    <section className="container-page py-20">
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-4 w-4 rounded-full animate-pulse"
          style={{ background: "var(--bb-blue)" }}
        />
        <div className="text-black/70 font-semibold">กำลังโหลด...</div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-black/10 p-6 bg-white animate-pulse"
          >
            <div className="h-4 w-2/3 bg-black/10 rounded" />
            <div className="mt-4 h-3 w-full bg-black/10 rounded" />
            <div className="mt-2 h-3 w-5/6 bg-black/10 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}