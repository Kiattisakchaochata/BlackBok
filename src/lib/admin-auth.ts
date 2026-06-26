import crypto from "crypto";

const COOKIE_NAME = "bb_admin_session";

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-secret";
  const payload = Buffer.from(
    JSON.stringify({
      role: "admin",
      createdAt: Date.now(),
    })
  ).toString("base64url");

  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");

  return `${payload}.${sig}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET || "dev-secret";
  const [payload, sig] = token.split(".");

  if (!payload || !sig) return false;

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");

  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}