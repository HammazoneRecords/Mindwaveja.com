# BRANCH_STATUS — MindWave JA

**App path:** `active_apps/mindwaveja.com/website/`
**Live domain:** `mindwaveja.com`
**VPS container:** `mw-mindwaveja`
**VPS port:** 3001
**Repo:** `https://github.com/HammazoneRecords/Mindwaveja.com`

---

## Current State

| Branch | Last Updated | Deployed? | Notes |
|---|---|---|---|
| feature/adtl-nav-link | 2026-06-05 | ⬜ Local only | Hero text, PackCard compact, 3-pack grid, product swap |
| master | 2026-06-04 | ⚠️ Local changes not deployed | LCP fix: compressed video + poster added |
| main | 2026-05-19 | ✅ Production (stale) | Last deploy pre-LCP fix |

## Last Action (2026-06-05)

**Date:** 2026-06-05
**Branch:** feature/adtl-nav-link
**Action:** Homepage copy + UI updates
**What changed:**
- HeroSection: headline → "The Infrastructure Layer for Jamaican Ideas", tagline → "Phase packs, R&D resources, and digital infrastructure — for those building from the inside out.", CTAs → Phase Packs · Marketplace · ADTL
- PackCard: `compact` prop added — hides packScore strip, capitalRange stat, firstSevenActions preview; only shows First Sale duration. Full pack pages unchanged.
- PhasePacksHighlight: grid changed `md:grid-cols-2 lg:grid-cols-3` → `sm:grid-cols-2 md:grid-cols-3`; passes `compact` to cards
- phasePacks.json: Basic Website Creation marked `featured: true` (was false) — now 3 featured packs
- products.json: Black Espionage marked `featured: false`; ADTL now shows as 3rd featured product (was cut by slice)
**Schema migration:** none

## Previous Action
**Branch:** master
**Action:** 4-commit session — pack renovations, rural context switch, homepage funnel fixes, deploy ×3
**What changed:**

*Commit 7b7d72c — Phase Packs + rural context switch:*
- `/phase-packs` and `/phase-packs/[slug]` routes restored from `_archived_phase-packs/`
- Phase Packs added to NavBar (first position)
- Rural context toggle button on pack detail pages (`ruralVariant: true` packs only)
- Rural panel: parishes, supply advantage, market entry, cold chain, premium opportunity
- "Rural Ready" badge on PackCard
- `dailyMinimum` handled as string or structured object (Week/Month projections)
- `valueAddMenu` made optional in render
- PhasePack type extended: ruralVariant, ruralPositioning, DailyMinimumDetail, ethicalCommunityRules, prePack, invariantScore, executionTest, whoThisIsNotFor
- PackScore fields made optional (capitalDifficulty, skillRequired)
- pp-063 Natural Juice Production Wholesale: all 18 canon files, 5 downloads, 23-entry zip, full JSON (invariantScore 13, executionTest PASS — J$5,100 net first batch)

*Commit 98995c8 — Free pack downloads + mobile fix + ADTL:*
- Free packs: "Download Starter Folder" is now a real `<a download>` link to `/media/[slug].zip`
- "Available after purchase" disabled button removed for free packs
- Download button also in CTA section at page bottom
- Mobile: quick stats stack 1-column on mobile
- Mobile: h1 scales 3xl/4xl/5xl; anatomy indent pl-11 on mobile
- ADTL: TIER1/TIER2 pricing constants; Busy Signal promoted to wave 1 with live URL

*Commit 43b7bfa — Homepage funnel fixes + email capture + nav cleanup:*
- Hero: two CTAs — "Browse Free Packs" (primary) + "Start Your Idea" (secondary)
- Hero: specificity line — "20+ business blueprints built for Jamaica. Free to download."
- PhasePacksHighlight restored to homepage (was removed from page.tsx)
- FeaturesSection: rewritten with pack-specific copy and real CTA links per card
- EmailCapture component: replaces CommunityPreview — email input, /api/subscribe, success state
- /api/subscribe: stores to data/subscribers.json, sends Resend owner notification
- FAQs: 3 rewritten as pack-specific (what's inside, free?, rural?)
- NavBar: ADTL removed, Community removed, isComingSoon refs cleaned
- Community stays in footer only

**Schema migration:** none
**VPS backup:** `/var/backups/mw-vps/mw-configs-20260519-1520.tar.gz` + `mindwaveja-src-20260519-1520.tar.gz`

---

## Active Feature Branches

None. All work landed on master and pushed to main.

## Pending Merges

- [ ] ADTL purchase flow + contract (FW-2026-05-19-005) — required before ADTL marketing
- [ ] Email subscriber CRM migration (FW-2026-05-19-004) — after 50+ subscribers

---

## History

| Date | Branch | Action | Notes |
|---|---|---|---|
| 2026-05-02 | main | Initial BRANCH_STATUS.md created | Multiple hotfixes deployed |
| 2026-05-17 | feature/adtl-nav-link | Major ADTL restructure (local only) | Absorbed into master on 2026-05-19 |
| 2026-05-19 | master | 4-commit session — packs, rural switch, funnel, deploy ×3 | See Last Action above |
