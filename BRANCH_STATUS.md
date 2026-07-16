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
| master | 2026-07-09 | ⬜ Local only | Button unification, dynamic pack renderer, price syncs |
| feature/adtl-nav-link | 2026-06-05 | ⬜ Local only | Hero text, PackCard compact, 3-pack grid, product swap |
| main | 2026-05-19 | ✅ Production (stale) | Last deploy pre-LCP fix |

## Last Action (2026-07-09)

**Date:** 2026-07-09
**Branch:** master
**Action:** Button unification + dynamic pack content renderer + price syncs
**What changed:**
- Button.tsx: uniform rounded-xl, wipay variant, fullWidth prop, onClick passthrough to Link
- WiPayButton/ProductCard/ReservationModal: all raw buttons migrated to shared Button
- ReservationModal: WiPay primary payment, bank transfer replaced with email fallback, copy-to-clipboard amount
- Phase pack pages: scrapped hardcoded 10-section anatomy — now dynamically renders canon .md files via react-markdown
- New: lib/pack-content.ts, PackContentRenderer.tsx, PackTOC.tsx (macOS dock-style sidebar)
- phasePacks.json + canon .md files: food handler permit J$2,000-J$4,000 → J$500, BSJ threshold J$100,000 → J$75,000, bootstrap total recalculated
- ADTLPricing removed from home page
- Footer: urgent request email → skygovament11@gmail.com
**Schema migration:** none

## Previous Action (2026-06-05)

**Date:** 2026-06-05
**Branch:** feature/adtl-nav-link

## Previous Action (2026-06-04)
**Branch:** master
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
