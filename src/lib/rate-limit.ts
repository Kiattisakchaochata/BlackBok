type RateItem = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateItem>();

export function rateLimit({
  key,
  limit = 5,
  windowMs = 60_000,
}: {
  key: string;
  limit?: number;
  windowMs?: number;
}) {
  const now = Date.now();
  const current = store.get(key);

  // ยังไม่มีข้อมูล หรือหมดเวลาแล้ว
  if (!current || current.resetAt < now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      ok: true,
      remaining: limit - 1,
    };
  }

  // เกิน limit
  if (current.count >= limit) {

    return {
      ok: false,
      remaining: 0,
    };
  }

  // เพิ่มจำนวนครั้ง
  current.count += 1;

  return {
    ok: true,
    remaining: limit - current.count,
  };
}