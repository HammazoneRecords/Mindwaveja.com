import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export async function GET(request: Request) {
  if (!await requireAdmin()) return new NextResponse("Unauthorized", { status: 401 });
  const site = new URL(request.url).searchParams.get("site_slug");
  const target = new URL("/v1/interest", process.env.RAAS_API_URL ?? "https://raas-api.mindwaveja.com");
  if (site) target.searchParams.set("site_slug", site);
  const response = await fetch(target, { headers: { "x-raas-admin-key": process.env.RAAS_ADMIN_KEY ?? "" }, cache: "no-store" });
  const body = await response.json().catch(() => ({ error: "RAAS returned an invalid response" }));
  if (!response.ok) return NextResponse.json(body, { status: response.status });
  const { leads = [] } = body;
  const columns = ["id", "site_slug", "artist_name", "product_id", "product_name", "variant", "email", "location", "price_tier_label", "branded_merch_interest", "created_at"];
  const csv = [columns.join(","), ...leads.map((lead: Record<string, unknown>) => columns.map((column) => JSON.stringify(lead[column] ?? "")).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=mindwave-leads.csv" } });
}
