import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { LeadsDashboard } from "@/components/admin/LeadsDashboard";

export default async function AdminLeadsPage() {
  if (!await requireAdmin()) redirect("/login?from=/admin/leads");
  return <LeadsDashboard />;
}

