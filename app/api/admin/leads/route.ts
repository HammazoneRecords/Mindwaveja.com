import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export async function GET(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = new URL(request.url).searchParams.get("site_slug");
  const target = new URL("/v1/interest", process.env.RAAS_API_URL ?? "https://raas-api.mindwaveja.com");
  if (site) target.searchParams.set("site_slug", site);
  const response = await fetch(target, { headers: { "x-raas-admin-key": process.env.RAAS_ADMIN_KEY ?? "" }, cache: "no-store" });
  const body = await response.json().catch(() => ({ error: "RAAS returned an invalid response" }));
  return NextResponse.json(body, { status: response.status });
}
