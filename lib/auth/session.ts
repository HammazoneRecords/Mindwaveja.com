import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSessionUser() {
  const current = await auth.api.getSession({ headers: await headers() });
  if (!current) return null;
  return { userId: current.user.id, email: current.user.email, name: current.user.name ?? null };
}

export async function requireAdmin() {
  const current = await getSessionUser();
  const allowed = (process.env.MW_ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  if (!current || !allowed.includes(current.email.toLowerCase())) return null;
  return current;
}
