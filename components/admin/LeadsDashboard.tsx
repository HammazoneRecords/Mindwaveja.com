"use client";

import { useEffect, useState } from "react";

type Lead = { id: number; site_slug: string; artist_name: string; product_name: string; email: string; location: string; price_tier_label: string; created_at: string };

export function LeadsDashboard() {
  const [site, setSite] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const load = async () => { const response = await fetch(`/api/admin/leads${site ? `?site_slug=${encodeURIComponent(site)}` : ""}`); const data = await response.json(); if (!response.ok) return setError(data.error ?? "Unable to load leads"); setLeads(data.leads ?? []); };
  useEffect(() => { load(); }, []);
  return <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
    <p style={{ color: "#ec3237", letterSpacing: ".12em", textTransform: "uppercase" }}>MindWave Admin</p>
    <h1>Lead capture</h1><p>Read-only view of brand-extension interest signups.</p>
    <div style={{ display: "flex", gap: 12, margin: "24px 0" }}><input aria-label="Filter by site slug" placeholder="site slug (optional)" value={site} onChange={(event) => setSite(event.target.value)} /><button onClick={load}>Refresh</button><a href={`/api/admin/leads/export${site ? `?site_slug=${encodeURIComponent(site)}` : ""}`}>Export CSV</a></div>
    {error && <p role="alert">{error}</p>}<p>{leads.length} lead(s)</p>
    <div style={{ overflowX: "auto" }}><table><thead><tr>{["Site", "Artist", "Product", "Email", "Location", "Price", "Created"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{leads.map((lead) => <tr key={lead.id}><td>{lead.site_slug}</td><td>{lead.artist_name}</td><td>{lead.product_name}</td><td>{lead.email}</td><td>{lead.location}</td><td>{lead.price_tier_label}</td><td>{new Date(lead.created_at).toLocaleString()}</td></tr>)}</tbody></table></div>
  </main>;
}

